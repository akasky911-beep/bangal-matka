const SUPABASE_URL = "https://isblbvsoshxxwoplptor.supabase.co";
const SUPABASE_KEY = "sb_publishable_Bj0alx7zydRokk4Kt50dDQ_6OGdLZAT";
const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function loadResult() {

let { data, error } = await client
.from("result")
.select("*")
.order("id",{ascending:false})
.limit(1);

if(error){
console.log(error);
return;
}

if(data.length > 0){

let row = data[0];

for(let i=1;i<=8;i++){

document.getElementById("r"+i).innerHTML =
row["r"+i] || "-";

document.getElementById("s"+i).innerHTML =
row["s"+i] || "-";

}

}

}

loadResult();

setInterval(() => {
  loadResult();
}, 3000);
function updateClock() {

  let now = new Date();

  let time = now.toLocaleTimeString();

  document.getElementById("clock").innerHTML = time;
}

setInterval(updateClock, 1000);

updateClock();

function showHome() {

  document.getElementById("homePage").style.display = "block";

  document.getElementById("tipsPage").style.display = "none";

  document.getElementById("oldPage").style.display = "none";
}

function showTips() {

  document.getElementById("homePage").style.display = "none";

  document.getElementById("tipsPage").style.display = "block";

  document.getElementById("oldPage").style.display = "none";
}

function showOld() {

  document.getElementById("homePage").style.display = "none";

  document.getElementById("tipsPage").style.display = "none";

  document.getElementById("oldPage").style.display = "block";
}
async function loadTips(){

let { data, error } = await client
.from("tips")
.select("*")
.order("id",{ascending:false})
.limit(1);

if(data.length > 0){

document.getElementById("tipDate").innerHTML = data[0].date;

for(let i=1;i<=8;i++){

document.getElementById("tip"+i).innerHTML =
data[0]["b"+i];

}

}

}

function showHome(){

document.getElementById("homePage").style.display="block";
document.getElementById("tipsPage").style.display="none";
document.getElementById("oldPage").style.display="none";

}

function showTips(){

document.getElementById("homePage").style.display="none";
document.getElementById("tipsPage").style.display="block";
document.getElementById("oldPage").style.display="none";

}

function showOld(){

document.getElementById("homePage").style.display="none";
document.getElementById("tipsPage").style.display="none";
document.getElementById("oldPage").style.display="block";

}

function updateClock(){

let now = new Date();

document.getElementById("clock").innerHTML =
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

loadResult();
loadTips();
updateClock();
loadPreviousResults();
async function loadPreviousResults() {

  let { data, error } = await client
    .from("previous_result")
    .select("*")
    .order("id", { ascending: false })
    .limit(10);

  if (error) {
    console.log(error);
    return;
  }

  let html = "";

  data.forEach(row => {

html += `
<table class="old-table">
      <tr>
        <th colspan="8" class="date-row">
${row.result_date}
</th>""
      </tr>

      <tr>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
      </tr>

      <tr>
        <td>${row.r1 || "-"}</td>
        <td>${row.r2 || "-"}</td>
        <td>${row.r3 || "-"}</td>
        <td>${row.r4 || "-"}</td>
        <td>${row.r5 || "-"}</td>
        <td>${row.r6 || "-"}</td>
        <td>${row.r7 || "-"}</td>
        <td>${row.r8 || "-"}</td>
      </tr>

      <tr>
        <td>${row.s1 || "-"}</td>
        <td>${row.s2 || "-"}</td>
        <td>${row.s3 || "-"}</td>
        <td>${row.s4 || "-"}</td>
        <td>${row.s5 || "-"}</td>
        <td>${row.s6 || "-"}</td>
        <td>${row.s7 || "-"}</td>
        <td>${row.s8 || "-"}</td>
      </tr>

    </table>
`;
  });
  
 document.getElementById("previousResults").innerHTML = html;
}

loadPreviousResults();
async function loadOldResults() {

let { data, error } = await client
.from("old_result")
.select("*")
.order("id",{ascending:false});

if(error){
console.log(error);
return;
}

let months = {};

data.forEach(row => {

let month = row.month || "Unknown";

if(!months[month]){
months[month] = [];
}

months[month].push(row);

});

let select = document.getElementById("monthSelect");

select.innerHTML = "";

Object.keys(months).forEach(month => {

select.innerHTML += `
<option value="${month}">
${month}
</option>
`;

});

function renderMonth(month){

let html = "";

months[month].forEach(row => {

html += `
<table class="old-table">

<tr>
<th colspan="8" class="date-row">
${row.result_date}
</th>
</tr>

<tr>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
</tr>

<tr>
<td>${row.r1 || "-"}</td>
<td>${row.r2 || "-"}</td>
<td>${row.r3 || "-"}</td>
<td>${row.r4 || "-"}</td>
<td>${row.r5 || "-"}</td>
<td>${row.r6 || "-"}</td>
<td>${row.r7 || "-"}</td>
<td>${row.r8 || "-"}</td>
</tr>

<tr>
<td>${row.s1 || "-"}</td>
<td>${row.s2 || "-"}</td>
<td>${row.s3 || "-"}</td>
<td>${row.s4 || "-"}</td>
<td>${row.s5 || "-"}</td>
<td>${row.s6 || "-"}</td>
<td>${row.s7 || "-"}</td>
<td>${row.s8 || "-"}</td>
</tr>

</table>
`;
});

document.getElementById("oldResultsContainer").innerHTML = html;
}

select.onchange = function(){
renderMonth(this.value);
};

let firstMonth = Object.keys(months)[0];

if(firstMonth){
renderMonth(firstMonth);
}

}

loadOldResults();
async function loadDailyBazi() {

let { data, error } = await client
.from("live_text")
.select("*")
.eq("id", 1)
.single();

if(error){
console.log(error);
return;
}

document.getElementById("dailyBazi").innerText =
data.daily_bazi;
}

loadDailyBazi();
