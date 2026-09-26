/* =========================================================
   HARYANA BAZI
   MAIN WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultData = {

  settings: {

    siteName: "Haryana Bazi",

    news:
      "Welcome to Haryana Bazi • Daily Updates • Latest Information",

    footerBio:
      "Simple, clean and mobile-friendly information and entertainment website.",

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


function loadData() {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {

      return structuredClone(defaultData);

    }

    const parsed =
      JSON.parse(saved);

    return {

      ...structuredClone(defaultData),

      ...parsed,

      settings: {

        ...defaultData.settings,

        ...(parsed.settings || {})

      }

    };

  }

  catch (error) {

    console.error(
      "Data loading error:",
      error
    );

    return structuredClone(defaultData);

  }

}


let siteData =
  loadData();


/* =========================================================
   SAVE DATA
   ========================================================= */

function saveData() {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(siteData)

  );

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

const pages =
  document.querySelectorAll(".page");


const navItems =
  document.querySelectorAll("[data-page]");


function showPage(pageName) {

  pages.forEach(page => {

    page.classList.remove("active");

  });


  const target =
    document.getElementById(pageName);


  if (target) {

    target.classList.add("active");

  }


  document
    .querySelectorAll(".nav-item")
    .forEach(button => {

      button.classList.remove("active");

    });


  document
    .querySelectorAll(
      `.nav-item[data-page="${pageName}"]`
    )
    .forEach(button => {

      button.classList.add("active");

    });


  closeDropdown();


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


navItems.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      const page =
        this.dataset.page;

      if (page) {

        showPage(page);

      }

    }
  );

});


/* =========================================================
   DROPDOWN
   ========================================================= */

const moreBtn =
  document.getElementById("moreBtn");


const moreMenu =
  document.getElementById("moreMenu");


if (moreBtn) {

  moreBtn.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      const dropdown =
        this.closest(".dropdown");

      dropdown.classList.toggle("open");

    }
  );

}


function closeDropdown() {

  const dropdown =
    document.querySelector(".dropdown");

  if (dropdown) {

    dropdown.classList.remove("open");

  }

}


document.addEventListener(
  "click",
  function (event) {

    if (
      !event.target.closest(".dropdown")
    ) {

      closeDropdown();

    }

  }
);


/* =========================================================
   DATE
   ========================================================= */

function updateDate() {

  const dateElement =
    document.getElementById("todayDate");


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
   SETTINGS
   ========================================================= */

function renderSettings() {

  const settings =
    siteData.settings;


  document.title =
    settings.siteName;


  const ticker =
    document.getElementById("newsTicker");


  if (ticker) {

    ticker.textContent =
      settings.news;

  }


  const footerBio =
    document.getElementById("footerBio");


  if (footerBio) {

    footerBio.textContent =
      settings.footerBio;

  }


  const aboutTitle =
    document.getElementById("aboutTitle");


  if (aboutTitle) {

    aboutTitle.textContent =
      settings.aboutTitle;

  }


  const aboutContent =
    document.getElementById("aboutContent");


  if (aboutContent) {

    aboutContent.textContent =
      settings.about;

  }


  const contactTitle =
    document.getElementById("contactTitle");


  if (contactTitle) {

    contactTitle.textContent =
      settings.contactTitle;

  }


  const contactContent =
    document.getElementById("contactContent");


  if (contactContent) {

    contactContent.textContent =
      settings.contact;

  }

}


/* =========================================================
   TODAY
   ========================================================= */

function renderToday() {

  const today =
    siteData.today;


  const title =
    document.getElementById("todayTitle");


  const content =
    document.getElementById("todayContent");


  const updated =
    document.getElementById("todayUpdated");


  if (title) {

    title.textContent =
      today.title ||
      siteData.settings.todayTitle;

  }


  if (content) {

    content.textContent =
      today.content ||
      "Today's information has not been updated yet.";

  }


  if (updated) {

    if (today.updated) {

      updated.textContent =
        "Last updated: " +
        today.updated;

    }

    else {

      updated.textContent = "";

    }

  }

}


/* =========================================================
   TIPS
   ========================================================= */

function renderTips() {

  const list =
    document.getElementById("tipsList");


  const preview =
    document.getElementById("tipsPreview");


  if (!list) {

    return;

  }


  const tips =
    Array.isArray(siteData.tips)
      ? siteData.tips
      : [];


  if (tips.length === 0) {

    list.innerHTML =
      emptyMessage(
        "No tips available right now."
      );

    if (preview) {

      preview.innerHTML =
        emptyMessage(
          "No tips available right now."
        );

    }

    return;

  }


  list.innerHTML =
    tips.map(
      (tip, index) => {

        return `

          <article class="item-card">

            <div class="meta">

              ${escapeHTML(
                tip.date || ""
              )}

            </div>

            <h3>

              ${escapeHTML(
                tip.title ||
                `Tip ${index + 1}`
              )}

            </h3>

            <p>

              ${escapeHTML(
                tip.description ||
                ""
              )}

            </p>

          </article>

        `;

      }
    ).join("");


  if (preview) {

    const first =
      tips[0];


    preview.innerHTML = `

      <div class="item-card">

        <div class="meta">

          ${escapeHTML(
            first.date || ""
          )}

        </div>

        <h3>

          ${escapeHTML(
            first.title ||
            "Latest Tip"
          )}

        </h3>

        <p>

          ${escapeHTML(
            first.description ||
            ""
          )}

        </p>

      </div>

    `;

  }

}


/* =========================================================
   UPDATES
   ========================================================= */

function renderUpdates() {

  const list =
    document.getElementById("updatesList");


  const preview =
    document.getElementById(
      "updatesPreview"
    );


  const updates =
    Array.isArray(siteData.updates)
      ? siteData.updates
      : [];


  if (list) {

    if (updates.length === 0) {

      list.innerHTML =
        emptyMessage(
          "No updates available."
        );

    }

    else {

      list.innerHTML =
        updates.map(
          update => {

            return `

              <article class="item-card">

                <div class="meta">

                  ${escapeHTML(
                    formatDateTime(
                      update.date,
                      update.time
                    )
                  )}

                </div>

                <h3>

                  ${escapeHTML(
                    update.title ||
                    "Update"
                  )}

                </h3>

                <p>

                  ${escapeHTML(
                    update.description ||
                    ""
                  )}

                </p>

              </article>

            `;

          }
        ).join("");

    }

  }


  if (preview) {

    if (updates.length === 0) {

      preview.innerHTML =
        emptyMessage(
          "No updates available."
        );

    }

    else {

      const first =
        updates[0];


      preview.innerHTML = `

        <div class="item-card">

          <div class="meta">

            ${escapeHTML(
              formatDateTime(
                first.date,
                first.time
              )
            )}

          </div>

          <h3>

            ${escapeHTML(
              first.title ||
              "Latest Update"
            )}

          </h3>

          <p>

            ${escapeHTML(
              first.description ||
              ""
            )}

          </p>

        </div>

      `;

    }

  }

}


/* =========================================================
   OLD INFORMATION
   ========================================================= */

function renderOld() {

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


  if (old.length === 0) {

    list.innerHTML =
      emptyMessage(
        "No old information available."
      );

    return;

  }


  list.innerHTML =
    old.map(
      item => {

        return `

          <article class="item-card">

            <div class="meta">

              ${escapeHTML(
                item.date || ""
              )}

            </div>

            <h3>

              ${escapeHTML(
                item.title ||
                "Previous Information"
              )}

            </h3>

            <p>

              ${escapeHTML(
                item.description ||
                ""
              )}

            </p>

          </article>

        `;

      }
    ).join("");

}


/* =========================================================
   OLD SEARCH
   ========================================================= */

const oldSearch =
  document.getElementById(
    "oldSearch"
  );


if (oldSearch) {

  oldSearch.addEventListener(
    "input",
    function () {

      const query =
        this.value
          .trim()
          .toLowerCase();


      const items =
        document.querySelectorAll(
          "#oldList .item-card"
        );


      items.forEach(item => {

        const text =
          item.textContent
            .toLowerCase();


        item.style.display =
          !query ||
          text.includes(query)
            ? ""
            : "none";

      });

    }
  );

}


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


  table.innerHTML =
    patti.map(
      item => {

        return `

          <tr>

            <td>

              ${escapeHTML(
                item.number || ""
              )}

            </td>

            <td>

              ${escapeHTML(
                item.information ||
                ""
              )}

            </td>

            <td>

              ${escapeHTML(
                item.description ||
                ""
              )}

            </td>

          </tr>

        `;

      }
    ).join("");

}


/* =========================================================
   VOTING
   ========================================================= */

let selectedVote =
  null;


let votes =
  loadVotes();


function loadVotes() {

  try {

    const saved =
      localStorage.getItem(
        "haryanaBaziVotes"
      );


    if (saved) {

      const parsed =
        JSON.parse(saved);


      if (
        Array.isArray(parsed) &&
        parsed.length === 10
      ) {

        return parsed;

      }

    }

  }

  catch (error) {

    console.error(error);

  }


  return [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ];

}


function saveVotes() {

  localStorage.setItem(

    "haryanaBaziVotes",

    JSON.stringify(votes)

  );

}


/* =========================================================
   CREATE VOTE BUTTONS
   ========================================================= */

function renderVoteButtons() {

  const grid =
    document.getElementById(
      "numberGrid"
    );


  if (!grid) {

    return;

  }


  grid.innerHTML = "";


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
      function () {

        selectVote(
          number,
          this
        );

      }
    );


    grid.appendChild(
      button
    );

  }

}


/* =========================================================
   SELECT VOTE
   ========================================================= */

function selectVote(
  number,
  button
) {

  selectedVote =
    number;


  document
    .querySelectorAll(
      ".number-btn"
    )
    .forEach(
      item => {

        item.classList.remove(
          "selected"
        );

      }
    );


  button.classList.add(
    "selected"
  );


  const notice =
    document.getElementById(
      "voteNotice"
    );


  if (notice) {

    notice.textContent =
      `Selected number: ${number}`;

  }

}


/* =========================================================
   CONFIRM VOTE
   ========================================================= */

const voteBtn =
  document.getElementById(
    "voteBtn"
  );


if (voteBtn) {

  voteBtn.addEventListener(
    "click",
    function () {

      const notice =
        document.getElementById(
          "voteNotice"
        );


      if (
        selectedVote === null
      ) {

        if (notice) {

          notice.textContent =
            "Please select a number first.";

        }

        return;

      }


      votes[selectedVote]++;


      saveVotes();


      if (notice) {

        notice.textContent =
          "Your vote has been recorded.";

      }


      renderVoteResults();

    }
  );

}


/* =========================================================
   VOTE RESULTS
   ========================================================= */

function renderVoteResults() {

  const tbody =
    document.getElementById(
      "voteResults"
    );


  if (!tbody) {

    return;

  }


  const total =
    votes.reduce(
      (sum, value) =>
        sum + value,
      0
    );


  tbody.innerHTML = "";


  for (
    let number = 0;
    number <= 9;
    number++
  ) {

    const count =
      votes[number] || 0;


    const percentage =
      total === 0
        ? 0
        : (
            count /
            total *
            100
          ).toFixed(1);


    const row =
      document.createElement(
        "tr"
      );


    row.innerHTML = `

      <td>
        ${number}
      </td>

      <td>
        ${count}
      </td>

      <td>
        ${percentage}%
      </td>

    `;


    tbody.appendChild(
      row
    );

  }

}


/* =========================================================
   LUCKY WHEEL
   ========================================================= */

let wheelRotation =
  0;


let spinInProgress =
  false;


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


if (spinBtn) {

  spinBtn.addEventListener(
    "click",
    spinWheel
  );

}


function spinWheel() {

  if (
    spinInProgress
  ) {

    return;

  }


  if (
    !wheel
  ) {

    return;

  }


  spinInProgress =
    true;


  spinBtn.disabled =
    true;


  if (spinResult) {

    spinResult.textContent =
      "";

  }


  const result =
    Math.floor(
      Math.random() * 10
    );


  const segment =
    36;


  const extraTurns =
    5 +
    Math.floor(
      Math.random() * 3
    );


  const targetRotation =
    extraTurns * 360 +
    (
      360 -
      result * segment
    );


  wheelRotation +=
    targetRotation;


  wheel.style.transform =
    `rotate(${wheelRotation}deg)`;


  setTimeout(
    function () {

      if (spinResult) {

        spinResult.textContent =
          `Lucky Number: ${result}`;

      }


      spinInProgress =
        false;


      spinBtn.disabled =
        false;

    },
    4300
  );

}


/* =========================================================
   REFRESH
   ========================================================= */

const refreshBtn =
  document.getElementById(
    "refreshBtn"
  );


if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    function () {

      window.location.reload();

    }
  );

}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function escapeHTML(value) {

  if (
    value === null ||
