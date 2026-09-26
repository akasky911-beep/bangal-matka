// Supabase Configuration
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupDropdown();
    setupNavigation();
    setupLuckyWheel();
    setupVoting();
    
    document.getElementById('refreshBtn').addEventListener('click', () => {
        const btn = document.getElementById('refreshBtn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        initApp().then(() => {
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        });
    });
});

async function initApp() {
    updateDate();
    await Promise.all([
        fetchSettings(),
        fetchTodayInfo(),
        fetchTips(),
        fetchUpdates(),
        fetchArchive(),
        fetchPatti()
    ]);
}

// UI Setup
function updateDate() {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-IN', options);
}

function setupDropdown() {
    const dropBtn = document.getElementById('moreBtn');
    const dropdown = document.querySelector('.dropdown');
    
    dropBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    
    window.addEventListener('click', () => {
        if (dropdown.classList.contains('show')) dropdown.classList.remove('show');
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') dropdown.classList.remove('show');
    });
}

function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn:not(.dropbtn), .dropdown-content a, .nav-btn-link, .footer-link');
    const sections = document.querySelectorAll('.page-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            if(!targetId) return;

            // Remove active classes
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active to main nav if it's a top level button
            if(btn.classList.contains('nav-btn')) btn.classList.add('active');
            
            // Show section
            const targetSection = document.getElementById(targetId);
            if(targetSection) targetSection.classList.add('active');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Database Fetching
async function fetchSettings() {
    try {
        const { data } = await supabase.from('settings').select('*');
        let settings = {};
        if (data) data.forEach(row => settings[row.key] = row.value);
        
        // Settings mappings
        if(settings.news_ticker_active === 'true') {
            document.getElementById('newsMarquee').textContent = settings.news_text || 'Welcome to Haryana Bazi';
        } else {
            document.getElementById('newsBarContainer').classList.add('hidden');
        }
        
        if(settings.about_text) document.getElementById('aboutDescription').innerHTML = `<p>${settings.about_text}</p>`;
        
        let contactHtml = '';
        if(settings.contact_email) contactHtml += `<p><strong>Email:</strong> ${settings.contact_email}</p>`;
        if(settings.contact_phone) contactHtml += `<p class="mt-8"><strong>Phone:</strong> ${settings.contact_phone}</p>`;
        document.getElementById('contactContent').innerHTML = contactHtml || '<p>No contact information provided.</p>';
        
    } catch(e) { console.error("Settings load error"); }
}

async function fetchTodayInfo() {
    const container = document.getElementById('todayInfoContent');
    try {
        const { data } = await supabase.from('daily_information').select('*').order('created_at', { ascending: false }).limit(1);
        if (data && data.length > 0 && data[0].status === 'active') {
            container.innerHTML = `<p>${data[0].content}</p>`;
            document.getElementById('todayInfoTitle').textContent = data[0].title;
            
            let date = new Date(data[0].created_at);
            document.getElementById('todayLastUpdated').textContent = `Last updated: ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        } else {
            container.innerHTML = `<div class="empty-state">Today's information has not been updated yet.<br>Please check again later.</div>`;
            document.getElementById('todayLastUpdated').textContent = '';
        }
        container.classList.remove('loading');
    } catch(e) { 
        container.innerHTML = `<div class="empty-state">Unable to load information. Please try again.</div>`; 
    }
}

async function fetchTips() {
    try {
        const { data } = await supabase.from('tips').select('*').eq('active', true).order('created_at', { ascending: false });
        const container = document.getElementById('tipsContainer');
        const preview = document.getElementById('homeTipPreview');
        
        if (data && data.length > 0) {
            let html = data.map(tip => `
                <div class="card">
                    <h3 style="font-size:1.1rem">${tip.title}</h3>
                    <p class="text-muted" style="font-size:0.8rem; margin-bottom:8px;">${new Date(tip.created_at).toLocaleDateString()}</p>
                    <p>${tip.description}</p>
                </div>
            `).join('');
            container.innerHTML = html;
            preview.innerHTML = `<strong>${data[0].title}</strong><br><span class="text-muted">${data[0].description.substring(0, 50)}...</span>`;
        } else {
            container.innerHTML = `<div class="empty-state">No tips available at the moment.</div>`;
            preview.innerHTML = 'No tips available.';
        }
        container.classList.remove('loading');
        preview.classList.remove('loading');
    } catch(e) {}
}

async function fetchUpdates() {
    try {
        const { data } = await supabase.from('updates').select('*').eq('active', true).order('created_at', { ascending: false });
        const container = document.getElementById('updatesContainer');
        if (data && data.length > 0) {
            container.innerHTML = data.map(up => `
                <div class="card">
                    <h3 style="font-size:1.1rem">${up.title}</h3>
                    <p class="text-muted" style="font-size:0.8rem; margin-bottom:8px;">${new Date(up.created_at).toLocaleString()}</p>
                    <p>${up.description}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = `<div class="empty-state">No new updates available.</div>`;
        }
        container.classList.remove('loading');
    } catch(e) {}
}

async function fetchArchive() {
    try {
        const { data } = await supabase.from('old_information').select('*').order('date', { ascending: false });
        const container = document.getElementById('archiveContainer');
        if (data && data.length > 0) {
            container.innerHTML = data.map(item => `
                <div class="card">
                    <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">${item.date}</div>
                    <h3 style="margin-top:4px;">${item.title}</h3>
                    <p class="mt-8">${item.information}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = `<div class="empty-state">No previous information available.</div>`;
        }
        container.classList.remove('loading');
    } catch(e) {}
}

function showPattiTableFallback() {
    document.getElementById('pattiImageWrapper').classList.add('hidden');
    document.getElementById('pattiTableContainer').classList.remove('hidden');
}

async function fetchPatti() {
    try {
        const { data } = await supabase.from('patti').select('*').order('id', { ascending: true });
        const body = document.getElementById('pattiTableBody');
        if (data && data.length > 0) {
            body.innerHTML = data.map(row => `
                <tr>
                    <td><strong>${row.number}</strong></td>
                    <td>${row.information}</td>
                    <td>${row.description || '-'}</td>
                </tr>
            `).join('');
        } else {
            body.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No records available</td></tr>';
        }
    } catch(e) {}
}

// Features Logic
function setupLuckyWheel() {
    const wheel = document.getElementById('spinWheel');
    let deg = 0;
    
    for(let i=0; i<10; i++) {
        let el = document.createElement('div');
        el.className = 'wheel-segment';
        el.style.transform = `rotate(${i*36}deg) skewY(-54deg)`;
        el.innerHTML = `<span style="transform: skewY(54deg) rotate(18deg) translateY(-100px); display:block;">${i}</span>`;
        wheel.appendChild(el);
    }

    document.getElementById('spinBtn').addEventListener('click', function() {
        if(localStorage.getItem('bazi_spin_used')) {
            document.getElementById('spinLimitMsg').classList.remove('hidden');
            return;
        }
        
        this.disabled = true;
        document.getElementById('spinResult').classList.add('hidden');
        
        let randomNum = Math.floor(Math.random() * 10);
        let extraSpins = 5;
        let segmentAngle = 36;
        let targetAngle = (extraSpins * 360) + (360 - (randomNum * segmentAngle)) - (segmentAngle/2);
        
        deg += targetAngle;
        wheel.style.transform = `rotate(${deg}deg)`;
        
        setTimeout(() => {
            document.getElementById('spinResult').classList.remove('hidden');
            document.getElementById('resultNumber').textContent = randomNum;
            localStorage.setItem('bazi_spin_used', 'true');
        }, 4000);
    });
}

function setupVoting() {
    const grid = document.getElementById('votingGrid');
    let selectedNum = null;
    
    grid.innerHTML = '';
    for(let i=0; i<=9; i++) {
        let btn = document.createElement('button');
        btn.className = 'vote-btn';
        btn.textContent = i;
        btn.onclick = () => {
            document.querySelectorAll('.vote-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedNum = i;
            document.getElementById('submitVoteBtn').disabled = false;
            document.getElementById('voteMessage').classList.add('hidden');
        };
        grid.appendChild(btn);
    }

    document.getElementById('submitVoteBtn').onclick = async () => {
        if(selectedNum === null) {
            document.getElementById('voteMessage').textContent = "Please select a number first.";
            document.getElementById('voteMessage').classList.remove('hidden');
            return;
        }
        
        if(localStorage.getItem('bazi_voted_today') === new Date().toDateString()) {
             document.getElementById('voteMessage').textContent = "You have already voted today.";
             document.getElementById('voteMessage').classList.remove('hidden');
             return;
        }

        document.getElementById('submitVoteBtn').disabled = true;
        try {
            await supabase.from('votes').insert([{ number_voted: selectedNum }]);
            document.getElementById('voteMessage').textContent = "Vote recorded. Thank you.";
            document.getElementById('voteMessage').classList.remove('hidden');
            localStorage.setItem('bazi_voted_today', new Date().toDateString());
            fetchVotingStats();
        } catch (e) {
            document.getElementById('submitVoteBtn').disabled = false;
        }
    };
    fetchVotingStats();
}

async function fetchVotingStats() {
    try {
        const { data } = await supabase.from('votes').select('number_voted');
        if(data && data.length > 0) {
            let counts = Array(10).fill(0);
            data.forEach(v => counts[v.number_voted]++);
            let total = data.length;
            
            document.getElementById('votingStats').classList.remove('hidden');
            document.getElementById('statsContainer').innerHTML = counts.map((count, index) => {
                let pct = ((count/total)*100).toFixed(1);
                return count > 0 ? `<div style="display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid var(--border-color);"><span>Number ${index}</span> <strong>${count} (${pct}%)</strong></div>` : '';
            }).join('');
        }
    } catch (e) {}
}
