/* =========================================================
   BANGAL MATKA - MAIN SCRIPT
   Home / Tips / Lucky Number / Old / Patti
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BASIC HELPERS
  ========================= */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  function getData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /* =========================
     LIVE CLOCK
  ========================= */

  function updateClock() {
    const clock = document.getElementById("clock");

    if (clock) {
      const now = new Date();

      clock.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }
  }

  updateClock();
  setInterval(updateClock, 1000);


  /* =========================
     LIVE MOVING NEWS
  ========================= */

  let newsText = localStorage.getItem("liveNewsText") ||
    "Welcome • Today's Result Updated • Check Latest Tips • Stay Updated";

  function createNewsBar() {

    if (document.getElementById("liveNewsBar")) return;

    const header = document.querySelector("header");

    if (!header) return;

    const bar = document.createElement("div");

    bar.id = "liveNewsBar";

    bar.innerHTML = `
      <span class="news-dot">●</span>
      <div class="news-track">
        <span>${newsText}</span>
      </div>
    `;

    header.after(bar);

    const style = document.createElement("style");

    style.textContent = `
      #liveNewsBar {
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        align-items: center;
        min-height: 38px;
        font-family: Arial, sans-serif;
      }

      .news-dot {
        color: #e53935;
        font-size: 12px;
        margin: 0 10px;
        animation: newsBlink 1s infinite;
      }

      .news-track {
        overflow: hidden;
        white-space: nowrap;
        flex: 1;
      }

      .news-track span {
        display: inline-block;
        padding-left: 100%;
        animation: newsMove 18s linear infinite;
        color: #222;
        font-size: 14px;
        font-weight: 500;
      }

      @keyframes newsMove {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-100%);
        }
      }

      @keyframes newsBlink {
        0%,100% { opacity: 1; }
        50% { opacity: .25; }
      }
    `;

    document.head.appendChild(style);
  }

  createNewsBar();


  /* =========================
     NAVIGATION
  ========================= */

  function hideAllPages() {

    const pages = [
      "homePage",
      "tipsPage",
      "luckyPage",
      "oldPage",
      "pattiPage"
    ];

    pages.forEach(id => {
      const page = document.getElementById(id);
      if (page) page.style.display = "none";
    });
  }


  window.showHome = function () {
    hideAllPages();

    const page = document.getElementById("homePage");

    if (page) page.style.display = "block";

    updateTipsButton();
  };


  window.showTips = function () {
    hideAllPages();

    const page = document.getElementById("tipsPage");

    if (page) {
      page.style.display = "block";
    } else {
      createTipsPage();
    }
  };


  window.showLucky = function () {
    hideAllPages();

    const page = document.getElementById("luckyPage");

    if (page) {
      page.style.display = "block";
    } else {
      createLuckyPage();
    }
  };


  window.showOld = function () {
    hideAllPages();

    const page = document.getElementById("oldPage");

    if (page) {
      page.style.display = "block";
    } else {
      createOldPage();
    }
  };


  window.showPatti = function () {
    hideAllPages();

    const page = document.getElementById("pattiPage");

    if (page) {
      page.style.display = "block";
    } else {
      createPattiPage();
    }
  };


  /* =========================
     DATE
  ========================= */

  function getToday() {
    const now = new Date();

    return now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }


  /* =========================
     TODAY RESULT
  ========================= */

  function updateTodayDate() {

    const resultHeading =
      document.querySelector("#homePage h2");

    if (!resultHeading) return;

    const resultData = getData("todayResult", null);

    if (resultData && resultData.date) {

      resultHeading.innerHTML =
        `RESULT TODAY <span class="blink-dot">●</span>
         <small>${resultData.date}</small>`;

    } else {

      resultHeading.innerHTML =
        `RESULT TODAY <span class="blink-dot">●</span>
         <small>${getToday()}</small>`;
    }
  }


  /* =========================
     BLINK DOT
  ========================= */

  function addBlinkStyle() {

    if (document.getElementById("blinkDotStyle")) return;

    const style = document.createElement("style");

    style.id = "blinkDotStyle";

    style.textContent = `
      .blink-dot {
        color: #e53935;
        font-size: 11px;
        margin-left: 5px;
        animation: blinkResult 1s infinite;
      }

      @keyframes blinkResult {
        0%,100% {
          opacity: 1;
        }
        50% {
          opacity: .15;
        }
      }
    `;

    document.head.appendChild(style);
  }

  addBlinkStyle();
  updateTodayDate();


  /* =========================
     TIPS SYSTEM
  ========================= */

  function updateTipsButton() {

    const result = getData("todayResult", null);

    const buttons = document.querySelectorAll("nav button");

    buttons.forEach(button => {

      const text = button.textContent.trim().toLowerCase();

      if (
        text.includes("bm home") ||
        text === "home"
      ) {

        if (!result || !result.filled) {

          button.textContent = "TIPS";
          button.onclick = window.showTips;

        } else {

          button.textContent = "HOME";
          button.onclick = window.showHome;
        }
      }

    });
  }


  /* =========================
     CREATE TIPS PAGE
  ========================= */

  function createTipsPage() {

    let page = document.getElementById("tipsPage");

    if (page) {
      page.style.display = "block";
      return;
    }

    page = document.createElement("section");

    page.id = "tipsPage";

    page.innerHTML = `
      <div class="page-box">

        <h2>DAILY TIPS</h2>

        <div class="vote-box">

          <h3>VOTE TABLE</h3>

          <div id="numberButtons" class="number-buttons"></div>

          <button id="confirmVote" class="main-action">
            VOTE CONFIRM
          </button>

          <p id="voteMessage"></p>

        </div>

        <div class="vote-results">

          <h3>VOTE RESULT</h3>

          <div id="voteTable"></div>

        </div>

      </div>
    `;

    document.body.appendChild(page);

    addTipsStyles();

    createVoteNumbers();

    updateVoteTable();
  }


  /* =========================
     VOTE NUMBERS
  ========================= */

  let selectedNumber = null;

  function createVoteNumbers() {

    const container =
      document.getElementById("numberButtons");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i <= 9; i++) {

      const button = document.createElement("button");

      button.className = "round-number";
      button.textContent = i;

      button.onclick = () => {

        selectedNumber = i;

        document
          .querySelectorAll(".round-number")
          .forEach(btn => btn.classList.remove("selected"));

        button.classList.add("selected");
      };

      container.appendChild(button);
    }


    const confirm =
      document.getElementById("confirmVote");

    if (confirm) {

      confirm.onclick = () => {

        if (selectedNumber === null) {

          document.getElementById("voteMessage").textContent =
            "Please select a number first.";

          return;
        }

        const votes = getData("votes", {});

        if (!votes[selectedNumber]) {
          votes[selectedNumber] = 0;
        }

        votes[selectedNumber]++;

        setData("votes", votes);

        localStorage.setItem(
          "lastVote",
          new Date().toISOString()
        );

        document.getElementById("voteMessage").textContent =
          "Vote recorded successfully.";

        updateVoteTable();
      };
    }
  }


  /* =========================
     VOTE TABLE
  ========================= */

  function updateVoteTable() {

    const tableContainer =
      document.getElementById("voteTable");

    if (!tableContainer) return;

    const votes = getData("votes", {});

    let total = 0;

    for (let i = 0; i <= 9; i++) {
      total += Number(votes[i] || 0);
    }

    let html = `
      <table class="vote-result-table">

        <thead>
          <tr>
            <th>Number</th>
            <th>Votes</th>
            <th>Percentage</th>
          </tr>
        </thead>

        <tbody>
    `;

    for (let i = 0; i <= 9; i++) {

      const count = Number(votes[i] || 0);

      const percentage =
        total > 0
          ? ((count / total) * 100).toFixed(1)
          : "0.0";

      html += `
        <tr>
          <td>${i}</td>
          <td>${count}</td>
          <td>${percentage}%</td>
        </tr>
      `;
    }

    html += `
        </tbody>

        <tfoot>
          <tr>
            <th>Total</th>
            <th>${total}</th>
            <th>100%</th>
          </tr>
        </tfoot>

      </table>
    `;

    tableContainer.innerHTML = html;
  }


  /* =========================
     LUCKY NUMBER
  ========================= */

  function createLuckyPage() {

    let page = document.getElementById("luckyPage");

    if (page) {
      page.style.display = "block";
      return;
    }

    page = document.createElement("section");

    page.id = "luckyPage";

    page.innerHTML = `
      <div class="page-box lucky-box">

        <h2>LUCKY NUMBER</h2>

        <div class="wheel-wrapper">

          <div class="wheel-arrow">▼</div>

          <div id="spinWheel" class="spin-wheel">

            <div class="wheel-number n0">0</div>
            <div class="wheel-number n1">1</div>
            <div class="wheel-number n2">2</div>
            <div class="wheel-number n3">3</div>
            <div class="wheel-number n4">4</div>
            <div class="wheel-number n5">5</div>
            <div class="wheel-number n6">6</div>
            <div class="wheel-number n7">7</div>
            <div class="wheel-number n8">8</div>
            <div class="wheel-number n9">9</div>

          </div>

        </div>

        <button id="spinButton" class="main-action">
          SPIN
        </button>

        <div id="luckyResult"></div>

      </div>
    `;

    document.body.appendChild(page);

    addLuckyStyles();

    setupSpin();
  }


  /* =========================
     SPIN SYSTEM
  ========================= */

  function setupSpin() {

    const spinButton =
      document.getElementById("spinButton");

    if (!spinButton) return;

    spinButton.onclick = () => {

      if (localStorage.getItem("luckyAlreadySpun") === "yes") {

        document.getElementById("luckyResult").innerHTML =
          `<p class="already-message">
            You have already used your spin.
          </p>`;

        return;
      }

      const wheel =
        document.getElementById("spinWheel");

      const result =
        Math.floor(Math.random() * 10);

      const extraRotation =
        360 * 6 + result * 36;

      wheel.style.transform =
        `rotate(${extraRotation}deg)`;

      playSpinSound();

      spinButton.disabled = true;

      setTimeout(() => {

        localStorage.setItem(
          "luckyAlreadySpun",
          "yes"
        );

        playWinSound();

        document.getElementById("luckyResult").innerHTML = `
          <div class="big-lucky-result">
            ${result}
          </div>

          <div class="result-text">
            YOUR LUCKY NUMBER
          </div>
        `;

      }, 4500);
    };
  }


  /* =========================
     SIMPLE SOUND
  ========================= */

  function playSpinSound() {

    try {

      const audioContext =
        new (window.AudioContext ||
          window.webkitAudioContext)();

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        300,
        audioContext.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        900,
        audioContext.currentTime + 0.3
      );

      gain.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.3
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.3
      );

    } catch {}
  }


  function playWinSound() {

    try {

      const audioContext =
        new (window.AudioContext ||
          window.webkitAudioContext)();

      const frequencies = [
        523,
        659,
        784
      ];

      frequencies.forEach((frequency, index) => {

        const oscillator =
          audioContext.createOscillator();

        const gain =
          audioContext.createGain();

        oscillator.frequency.value = frequency;

        gain.gain.value = 0.12;

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(
          audioContext.currentTime + index * 0.15
        );

        oscillator.stop(
          audioContext.currentTime +
          0.3 +
          index * 0.15
        );

      });

    } catch {}
  }


  /* =========================
     OLD RESULT
  ========================= */

  function createOldPage() {

    let page = document.getElementById("oldPage");

    if (page) {
      page.style.display = "block";
      return;
    }

    page = document.createElement("section");

    page.id = "oldPage";

    page.innerHTML = `
      <div class="page-box">

        <h2>OLD RESULT</h2>

        <div id="oldResultsContainer">
          Loading old results...
        </div>

      </div>
    `;

    document.body.appendChild(page);

    updateOldResults();
  }


  function updateOldResults() {

    const container =
      document.getElementById("oldResultsContainer");

    if (!container) return;

    const oldResults =
      getData("oldResults", []);

    if (!oldResults.length) {

      container.innerHTML =
        "<p>No old result available.</p>";

      return;
    }

    let html = "";

    oldResults.forEach(month => {

      html += `
        <div class="old-month">

          <h3>${month.month}</h3>

          <p>${month.result || "No result"}</p>

        </div>
      `;
    });

    container.innerHTML = html;
  }


  /* =========================
     PATTI
  ========================= */

  function createPattiPage() {

    let page = document.getElementById("pattiPage");

    if (page) {
      page.style.display = "block";
      return;
    }

    page = document.createElement("section");

    page.id = "pattiPage";

    page.innerHTML = `
      <div class="page-box">

        <h2>PATTI</h2>

        <div class="patti-image-box">

          <img
            src="patti.png"
            alt="Patti"
            onerror="this.style.display='none'"
          >

        </div>

      </div>
    `;

    document.body.appendChild(page);
  }


  /* =========================
     TIPS STYLES
  ========================= */

  function addTipsStyles() {

    if (document.getElementById("tipsStyles")) return;

    const style = document.createElement("style");

    style.id = "tipsStyles";

    style.textContent = `

      .page-box {
        background: #fff;
        padding: 20px;
        margin: 15px auto;
        max-width: 900px;
        border-radius: 12px;
        box-sizing: border-box;
      }

      .page-box h2 {
        text-align: center;
        color: #222;
      }

      .vote-box {
        text-align: center;
      }

      .number-buttons {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
        margin: 20px 0;
      }

      .round-number {
        width: 58px;
        height: 58px;
        margin: auto;
        border-radius: 50%;
        border: 2px solid #ddd;
        background: #fff;
        font-size: 21px;
        font-weight: bold;
        cursor: pointer;
      }

      .round-number.selected {
        background: #222;
        color: #fff;
        border-color: #222;
        transform: scale(1.08);
      }

      .main-action {
        padding: 12px 25px;
        border: none;
        border-radius: 8px;
        background: #222;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
      }

      .vote-result-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
      }

      .vote-result-table th,
      .vote-result-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
      }

      .vote-result-table th {
        background: #f5f5f5;
      }

      .old-month {
        border: 1px solid #ddd;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
      }

      .patti-image-box img {
        width: 100%;
        max-width: 100%;
        display: block;
      }

      @media(max-width:600px) {

        .number-buttons {
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }

        .round-number {
          width: 48px;
          height: 48px;
        }

      }

    `;

    document.head.appendChild(style);
  }


  /* =========================
     LUCKY STYLES
  ========================= */

  function addLuckyStyles() {

    if (document.getElementById("luckyStyles")) return;

    const style = document.createElement("style");

    style.id = "luckyStyles";

    style.textContent = `

      .lucky-box {
        text-align: center;
      }

      .wheel-wrapper {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 30px auto;
      }

      .wheel-arrow {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        font-size: 30px;
      }

      .spin-wheel {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        position: relative;
        border: 8px solid #222;
        background:
          conic-gradient(
            #ffffff 0deg 36deg,
            #eeeeee 36deg 72deg,
            #ffffff 72deg 108deg,
            #eeeeee 108deg 144deg,
            #ffffff 144deg 180deg,
            #eeeeee 180deg 216deg,
            #ffffff 216deg 252deg,
            #eeeeee 252deg 288deg,
            #ffffff 288deg 324deg,
            #eeeeee 324deg 360deg
          );
        transition: transform 4.5s cubic-bezier(.17,.67,.12,.99);
      }

      .wheel-number {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 25px;
        font-weight: bold;
        transform-origin: 0 0;
      }

      .n0 { transform: rotate(0deg) translate(125px) rotate(0deg); }
      .n1 { transform: rotate(36deg) translate(125px) rota
