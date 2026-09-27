/* =========================================================
   HARYANA BAZI
   MAIN WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {

  settings: {

    siteName:
      "Haryana Bazi",

    news:
      "Welcome to Haryana Bazi • Daily Information • Latest Updates",

    footerBio:
      "Simple, clean and mobile-friendly information website.",

    aboutTitle:
      "About Haryana Bazi",

    about:
      "Haryana Bazi is a simple and mobile-friendly website created to provide information, updates and entertainment features in one place.",

    contactTitle:
      "Contact Us",

    contact:
      "For general enquiries, please add your contact information from the admin panel.",

    todayTitle:
      "Today's Information"

  },


  today: {

    title:
      "Today's Information",

    content:
      "Today's information has not been updated yet.",

    updated:
      ""

  },


  tips: [

    {

      title:
        "Welcome Tip",

      description:
        "Tips content can be updated from the admin panel.",

      date:
        ""

    }

  ],


  updates: [

    {

      title:
        "Welcome to Haryana Bazi",

      description:
        "Latest updates will appear here.",

      date:
        "",

      time:
        ""

    }

  ],


  old: [],


  patti: [

    {
      number: "0",
      information: "Reference",
      description: ""
    },

    {
      number: "1",
      information: "Reference",
      description: ""
    },

    {
      number: "2",
      information: "Reference",
      description: ""
    },

    {
      number: "3",
      information: "Reference",
      description: ""
    },

    {
      number: "4",
      information: "Reference",
      description: ""
    },

    {
      number: "5",
      information: "Reference",
      description: ""
    },

    {
      number: "6",
      information: "Reference",
      description: ""
    },

    {
      number: "7",
      information: "Reference",
      description: ""
    },

    {
      number: "8",
      information: "Reference",
      description: ""
    },

    {
      number: "9",
      information: "Reference",
      description: ""
    }

  ]

};


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY =
  "haryanaBaziWebsiteData";


function cloneDefaultData() {

  return JSON.parse(
    JSON.stringify(defaultData)
  );

}


function loadData() {

  try {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (!saved) {

      return cloneDefaultData();

    }


    const parsed =
      JSON.parse(saved);


    return {

      ...cloneDefaultData(),

      ...parsed,

      settings: {

        ...defaultData.settings,

        ...(parsed.settings || {})

      },

      today: {

        ...defaultData.today,

        ...(parsed.today || {})

      }

    };

  }

  catch (error) {

    console.error(
      "Data loading error:",
      error
    );

    return cloneDefaultData();

  }

}


let siteData =
  loadData();


function saveData() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(siteData)
    );

  }

  catch (error) {

    console.error(
      "Data saving error:",
      error
    );

  }

}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pages =
  document.querySelectorAll(
    ".page"
  );


const navItems =
  document.querySelectorAll(
    "[data-page]"
  );


function showPage(pageName) {

  pages.forEach(
    function(page) {

      page.classList.remove(
        "active"
      );

    }
  );


  const target =
    document.getElementById(
      pageName
    );


  if (!target) {

    return;

  }


  target.classList.add(
    "active"
  );


  document
    .querySelectorAll(
      ".nav-item"
    )
    .forEach(
      function(item) {

        item.classList.remove(
          "active"
        );

      }
    );


  const matchingNav =
    document.querySelector(
      `.nav-item[data-page="${pageName}"]`
    );


  if (matchingNav) {

    matchingNav.classList.add(
      "active"
    );

  }


  const moreDropdown =
    document.getElementById(
      "moreDropdown"
    );


  if (moreDropdown) {

    moreDropdown.classList.remove(
      "open"
    );

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =========================================================
   ALL PAGE BUTTONS
========================================================= */

navItems.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        const page =
          this.dataset.page;

        if (page) {

          showPage(page);

        }

      }
    );

  }
);


/* =========================================================
   MORE DROPDOWN
========================================================= */

const moreBtn =
  document.getElementById(
    "moreBtn"
  );


const moreDropdown =
  document.getElementById(
    "moreDropdown"
  );


if (moreBtn && moreDropdown) {

  moreBtn.addEventListener(
    "click",
    function(event) {

      event.stopPropagation();

      moreDropdown.classList.toggle(
        "open"
      );

    }
  );

}


document.addEventListener(
  "click",
  function(event) {

    if (
      moreDropdown &&
      !moreDropdown.contains(event.target)
    ) {

      moreDropdown.classList.remove(
        "open"
      );

    }

  }
);


/* =========================================================
   DATE
========================================================= */

function updateDate() {

  const dateElement =
    document.getElementById(
      "todayDate"
    );


  if (!dateElement) {

    return;

  }


  const now =
    new Date();


  dateElement.textContent =
    now.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

}


updateDate();


/* =========================================================
   SITE SETTINGS
========================================================= */

function renderSettings() {

  const settings =
    siteData.settings;


  const brandName =
    document.getElementById(
      "brandName"
    );


  if (brandName) {

    brandName.textContent =
      settings.siteName;

  }


  const ticker =
    document.getElementById(
      "newsTicker"
    );


  if (ticker) {

    ticker.textContent =
      settings.news;

  }


  const footerBio =
    document.getElementById(
      "footerBio"
    );


  if (footerBio) {

    footerBio.textContent =
      settings.footerBio;

  }


  const aboutTitle =
    document.getElementById(
      "aboutTitle"
    );


  if (aboutTitle) {

    aboutTitle.textContent =
      settings.aboutTitle;

  }


  const contactTitle =
    document.getElementById(
      "contactTitle"
    );


  if (contactTitle) {

    contactTitle.textContent =
      settings.contactTitle;

  }


  const copyright =
    document.getElementById(
      "copyright"
    );


  if (copyright) {

    copyright.textContent =
      "© " +
      new Date().getFullYear() +
      " " +
      settings.siteName;

  }

}


renderSettings();


/* =========================================================
   TODAY
========================================================= */

function renderToday() {

  const title =
    document.getElementById(
      "todayTitle"
    );


  const content =
    document.getElementById(
      "todayContent"
    );


  const updated =
    document.getElementById(
      "todayUpdated"
    );


  if (title) {

    title.textContent =
      siteData.today.title ||
      siteData.settings.todayTitle;

  }


  if (content) {

    content.textContent =
      siteData.today.content ||
      "Today's information has not been updated yet.";

  }


  if (updated) {

    if (siteData.today.updated) {

      updated.textContent =
        "Updated: " +
        siteData.today.updated;

    }

    else {

      updated.textContent =
        "";

    }

  }

}


renderToday();


/* =========================================================
   TIPS
========================================================= */

function renderTips() {

  const preview =
    document.getElementById(
      "tipsPreview"
    );


  const list =
    document.getElementById(
      "tipsList"
    );


  const tips =
    Array.isArray(siteData.tips)
      ? siteData.tips
      : [];


  if (preview) {

    if (tips.length === 0) {

      preview.innerHTML =
        `<div class="item-card">
          <p>No tips available.</p>
        </div>`;

    }

    else {

      const tip =
        tips[0];


      preview.innerHTML = `

        <div class="item-card">

          <div class="meta">
            ${escapeHTML(tip.date || "")}
          </div>

          <h3>
            ${escapeHTML(tip.title || "Information")}
          </h3>

          <p>
            ${escapeHTML(tip.description || "")}
          </p>

        </div>

      `;

    }

  }


  if (list) {

    list.innerHTML = "";


    if (tips.length === 0) {

      list.innerHTML =
        `<div class="card">
          No tips available.
        </div>`;

      return;

    }


    tips.forEach(
      function(tip) {

        list.innerHTML += `

          <article class="item-card">

            <div class="meta">
              ${escapeHTML(tip.date || "")}
            </div>

            <h3>
              ${escapeHTML(tip.title || "Information")}
            </h3>

            <p>
              ${escapeHTML(tip.description || "")}
            </p>

          </article>

        `;

      }
    );

  }

}


renderTips();


/* =========================================================
   UPDATES
========================================================= */

function renderUpdates() {

  const preview =
    document.getElementById(
      "updatesPreview"
    );


  const list =
    document.getElementById(
      "updatesList"
    );


  const updates =
    Array.isArray(siteData.updates)
      ? siteData.updates
      : [];


  if (preview) {

    if (updates.length === 0) {

      preview.innerHTML =
        `<div class="item-card">
          <p>No updates available.</p>
        </div>`;

    }

    else {

      const update =
        updates[0];


      preview.innerHTML = `

        <div class="item-card">

          <div class="meta">
            ${escapeHTML(update.date || "")}
            ${update.time ? " • " + escapeHTML(update.time) : ""}
          </div>

          <h3>
            ${escapeHTML(update.title || "Update")}
          </h3>

          <p>
            ${escapeHTML(update.description || "")}
          </p>

        </div>

      `;

    }

  }


  if (list) {

    list.innerHTML = "";


    if (updates.length === 0) {

      list.innerHTML =
        `<div class="card">
          No updates available.
        </div>`;

      return;

    }


    updates.forEach(
      function(update) {

        list.innerHTML += `

          <article class="item-card">

            <div class="meta">

              ${escapeHTML(update.date || "")}

              ${
                update.time
                ? " • " + escapeHTML(update.time)
                : ""
              }

            </div>

            <h3>
              ${escapeHTML(update.title || "Update")}
            </h3>

            <p>
              ${escapeHTML(update.description || "")}
            </p>

          </article>

        `;

      }
    );

  }

}


renderUpdates();


/* =========================================================
   ABOUT
========================================================= */

function renderAbout() {

  const content =
    document.getElementById(
      "aboutContent"
    );


  if (!content) {

    return;

  }


  content.textContent =
    siteData.settings.about ||
    "";

}


renderAbout();


/* =========================================================
   CONTACT
========================================================= */

function renderContact() {

  const content =
    document.getElementById(
      "contactContent"
    );


  if (!content) {

    return;

  }


  content.textContent =
    siteData.settings.contact ||
    "";

}


renderContact();


/* =========================================================
   PATTI
========================================================= */

function renderPatti() {

  const table =
    document.getElementById(
      "pattiTable"
    );


  if (!table) {

    return;

  }


  const patti =
    Array.isArray(siteData.patti)
      ? siteData.patti
      : [];


  table.innerHTML = "";


  if (patti.length === 0) {

    table.innerHTML = `

      <tr>

        <td colspan="3">
          No reference information available.
        </td>

      </tr>

    `;

    return;

  }


  patti.forEach(
    function(item) {

      table.innerHTML += `

        <tr>

          <td>
            ${escapeHTML(item.number)}
          </td>

          <td>
            ${escapeHTML(item.information)}
          </td>

          <td>
            ${escapeHTML(item.description)}
          </td>

        </tr>

      `;

    }
  );

}


renderPatti();


/* =========================================================
   OLD INFORMATION
========================================================= */

function renderOld(searchText = "") {

  const list =
    document.getElementById(
      "oldList"
    );


  if (!list) {

    return;

  }


  const old =
    Array.isArray(siteData.old)
      ? siteData.old
      : [];


  const query =
    searchText
      .trim()
      .toLowerCase();


  const filtered =
    old.filter(
      function(item) {

        const text =
          [
            item.date,
            item.title,
            item.description
          ]
          .join(" ")
          .toLowerCase();


        return text.includes(query);

      }
    );


  list.innerHTML = "";


  if (filtered.length === 0) {

    list.innerHTML = `

      <div class="item-card">

        <p>
          No old information available.
        </p>

      </div>

    `;

    return;

  }


  filtered.forEach(
    function(item) {

      list.innerHTML += `

        <article class="item-card">

          <div class="meta">
            ${escapeHTML(item.date || "")}
          </div>

          <h3>
            ${escapeHTML(item.title || "Information")}
          </h3>

          <p>
            ${escapeHTML(item.description || "")}
          </p>

        </article>

      `;

    }
  );

}


renderOld();


const oldSearch =
  document.getElementById(
    "oldSearch"
  );


if (oldSearch) {

  oldSearch.addEventListener(
    "input",
    function() {

      renderOld(
        this.value
      );

    }
  );

}


/* =========================================================
   LUCKY NUMBER WHEEL
========================================================= */

let wheelRotation = 0;

let spinning = false;


const wheel =
  document.getElementById(
    "wheel"
  );


const spinBtn =
  document.getElementById(
    "spinBtn"
  );


const spinResult =
  document.getElementById(
    "spinResult"
  );


const spinNotice =
  document.getElementById(
    "spinNotice"
  );


function spinWheel() {

  if (
    !wheel ||
    !spinBtn ||
    spinning
  ) {

    return;

  }


  spinning = true;


  spinBtn.disabled =
    true;


  if (spinResult) {

    spinResult.textContent =
      "";

    spinResult.classList.remove(
      "show"
    );

  }


  if (spinNotice) {

    spinNotice.textContent =
      "Spinning...";

  }


  const result =
    Math.floor(
      Math.random() * 10
    );


  const extraTurns =
    5 +
    Math.floor(
      Math.random() * 4
    );


  const resultRotation =
    result * 36;


  wheelRotation +=
    extraTurns * 360 +
    resultRotation;


  wheel.style.transform =
    `rotate(${wheelRotation}deg)`;


  setTimeout(
    function() {

      if (spinResult) {

        spinResult.textContent =
          result;

        spinResult.classList.add(
          "show"
        );

      }


      if (spinNotice) {

        spinNotice.textContent =
          "Spin completed.";

      }


      spinning = false;

      spinBtn.disabled =
        false;

    },
    4300
  );

}


if (spinBtn) {

  spinBtn.addEventListener(
    "click",
    spinWheel
  );

}


/* =========================================================
   VOTING
========================================================= */

const numberGrid =
  document.getElementById(
    "numberGrid"
  );


const voteBtn =
  document.getElementById(
    "voteBtn"
  );


const voteNotice =
  document.getElementById(
    "voteNotice"
  );


const voteResults =
  document.getElementById(
    "voteResults"
  );


let selectedVote =
  null;


let votes;


try {

  votes =
    JSON.parse(
      localStorage.getItem(
        "haryanaBaziVotes"
      ) ||
      "[0,0,0,0,0,0,0,0,0,0]"
    );

}
catch {

  votes =
    [0,0,0,0,0,0,0,0,0,0];

}


if (
  !Array.isArray(votes) ||
  votes.length !== 10
) {

  votes =
    [0,0,0,0,0,0,0,0,0,0];

}


/* CREATE NUMBER BUTTONS */

function createNumberButtons() {

  if (!numberGrid) {

    return;

  }


  numberGrid.innerHTML = "";


  for (
    let number = 0;
    number <= 9;
    number++
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "number-btn";


    button.textContent =
      number;


    button.dataset.number =
      number;


    button.addEventListener(
      "click",
      function() {

        document
          .querySelectorAll(
            ".number-btn"
          )
          .forEach(
            function(item) {

              item.classList.remove(
                "selected"
              );

            }
          );


        this.classList.add(
          "selected"
        );


        selectedVote =
          Number(
            this.dataset.number
          );


        if (voteNotice) {

          voteNotice.textContent =
            "Number " +
            selectedVote +
            " selected.";

        }

      }
    );


    numberGrid.appendChild(
      button
    );

  }

}


createNumberButtons();


/* RENDER VOTE RESULTS */

function renderVoteResults() {

  if (!voteResults) {

    return;

  }


  const total =
    votes.reduce(
      function(sum, value) {

        return sum + value;

      },
      0
    );


  voteResults.innerHTML =
    "";


  for (
    let number = 0;
    number <= 9;
    number++
  ) {

    const percentage =
      total === 0
        ? "0.0"
        : (
            votes[number] /
            total *
            100
          ).toFixed(1);


    voteResults.innerHTML += `

      <tr>

        <td>
          ${number}
        </td>

        <td>
          ${votes[number]}
        </td>

        <td>
          ${percentage}%
        </td>

      </tr>

    `;

  }

}


renderVoteResults();


/* CONFIRM VOTE */

if (voteBtn) {

  voteBtn.addEventListener(
    "click",
    function() {

      if (
        selectedVote === null
      ) {

        if (voteNotice) {

          voteNotice.textContent =
            "Please select a number first.";

        }

        return;

      }
      votes[selectedVote]++;

      localStorage.setItem(
        "haryanaBaziVotes",
        JSON.stringify(votes)
      );

      if (voteNotice) {

        voteNotice.textContent =
          "Vote recorded successfully.";

      }

      document
        .querySelectorAll(".number-btn")
        .forEach(function(item) {

          item.classList.remove("selected");

        });

      selectedVote = null;

      renderVoteResults();

    }
  );

}


/* =========================================================
   REFRESH BUTTON
========================================================= */

const refreshBtn =
  document.getElementById("refreshBtn");

if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    function() {

      window.location.reload();

    }
  );

}


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

renderSettings();
renderToday();
renderTips();
renderUpdates();
renderAbout();
renderContact();
renderPatti();
renderOld();
renderVoteResults();

 
