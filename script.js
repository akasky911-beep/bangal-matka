/* =========================================================
   HARYANA BAZI
   MAIN WEBSITE JAVASCRIPT
   CLEAN VERSION
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
  "https://zzzqgnttrjjfjzmsbsul.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_hosPx5qOPoAjgCxG6y-XDQ_WIukGMVX";


const client =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================================
   HELPERS
========================================================= */

function byId(id) {

  return document.getElementById(id);

}


function safeText(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "-";

  }

  return String(value);

}


function setText(id, value) {

  const element =
    byId(id);

  if (element) {

    element.textContent =
      safeText(value);

  }

}


/* =========================================================
   LIVE CLOCK + DATE
========================================================= */

function updateClock() {

  const now =
    new Date();


  const timeElement =
    byId("clock");


  const dateElement =
    byId("todayDate");


  const time =
    now.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }
    );


  const day =
    now.toLocaleDateString(
      "en-IN",
      {
        weekday: "long"
      }
    );


  const date =
    now.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );


  if (timeElement) {

    timeElement.textContent =
      time;

  }


  if (dateElement) {

    dateElement.textContent =
      `${time} • ${day} • ${date}`;

  }

}


updateClock();

setInterval(
  updateClock,
  1000
);


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function hideAllPages() {

  document
    .querySelectorAll(".page")
    .forEach(
      function(page) {

        page.classList.remove(
          "active"
        );

        page.style.display =
          "none";

      }
    );

}


function showPage(pageName) {

  hideAllPages();


  const page =
    byId(pageName);


  if (!page) {

    console.warn(
      "Page not found:",
      pageName
    );

    return;

  }


  page.classList.add(
    "active"
  );

  page.style.display =
    "block";


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


  const activeNav =
    document.querySelector(
      `[data-page="${pageName}"]`
    );


  if (activeNav) {

    activeNav.classList.add(
      "active"
    );

  }


  const dropdown =
    byId(
      "moreDropdown"
    );


  if (dropdown) {

    dropdown.classList.remove(
      "open"
    );

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

document
  .querySelectorAll(
    "[data-page]"
  )
  .forEach(
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
  byId("moreBtn");

const moreDropdown =
  byId("moreDropdown");


if (
  moreBtn &&
  moreDropdown
) {

  moreBtn.addEventListener(
    "click",
    function(event) {

      event.stopPropagation();

      moreDropdown.classList.toggle(
        "open"
      );

    }
  );


  document.addEventListener(
    "click",
    function(event) {

      if (
        !moreDropdown.contains(
          event.target
        )
      ) {

        moreDropdown.classList.remove(
          "open"
        );

      }

    }
  );

}


/* =========================================================
   LIVE RESULT
========================================================= */

async function loadResult() {

  try {

    const {
      data,
      error
    } =
      await client
        .from("result")
        .select("*")
        .order(
          "id",
          {
            ascending: false
          }
        )
        .limit(1);


    if (error) {

      console.error(
        "Result loading error:",
        error
      );

      return;

    }


    if (
      !data ||
      data.length === 0
    ) {

      return;

    }


    const row =
      data[0];


    for (
      let i = 1;
      i <= 8;
      i++
    ) {

      const resultCell =
        byId(
          "r" + i
        );


      const secondaryCell =
        byId(
          "s" + i
        );


      if (resultCell) {

        resultCell.textContent =
          safeText(
            row["r" + i]
          );

      }


      if (secondaryCell) {

        secondaryCell.textContent =
          safeText(
            row["s" + i]
          );

      }

    }


    /* OPTIONAL DATE */

    if (
      byId("resultDate")
    ) {

      setText(
        "resultDate",
        row.result_date ||
        row.date ||
        ""
      );

    }

  }

  catch (error) {

    console.error(
      "Live result exception:",
      error
    );

  }

}


loadResult();


/*
   Refresh live result every 5 seconds.
*/

setInterval(
  loadResult,
  5000
);


/* =========================================================
   TIPS
========================================================= */

async function loadTips() {

  try {

    const {
      data,
      error
    } =
      await client
        .from("tips")
        .select("*")
        .order(
          "id",
          {
            ascending: false
          }
        )
        .limit(1);


    if (error) {

      console.error(
        "Tips loading error:",
        error
      );

      return;

    }


    if (
      !data ||
      data.length === 0
    ) {

      return;

    }


    const row =
      data[0];


    setText(
      "tipDate",
      row.date || ""
    );


    for (
      let i = 1;
      i <= 8;
      i++
    ) {

      setText(
        "tip" + i,
        row["b" + i] || "-"
      );

    }

  }

  catch (error) {

    console.error(
      "Tips exception:",
      error
    );

  }

}


loadTips();


setInterval(
  loadTips,
  10000
);


/* =========================================================
   PREVIOUS RESULTS
========================================================= */

async function loadPreviousResults() {

  try {

    const {
      data,
      error
    } =
      await client
        .from("previous_result")
        .select("*")
        .order(
          "id",
          {
            ascending: false
          }
        )
        .limit(10);


    if (error) {

      console.error(
        "Previous result error:",
        error
      );

      return;

    }


    const container =
      byId(
        "previousResults"
      );


    if (!container) {

      return;

    }


    if (
      !data ||
      data.length === 0
    ) {

      container.innerHTML =
        `
        <div class="empty-state">
          No previous results available.
        </div>
        `;

      return;

    }


    let html =
      "";


    data.forEach(
      function(row) {

        html += `

          <div class="result-card">

            <div class="result-date">

              ${escapeHTML(
                row.result_date ||
                row.date ||
                ""
              )}

            </div>


            <div class="result-table-wrap">

              <table class="old-table">

                <thead>

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

                </thead>


                <tbody>

                  <tr>

                    <td>${escapeHTML(row.r1)}</td>
                    <td>${escapeHTML(row.r2)}</td>
                    <td>${escapeHTML(row.r3)}</td>
                    <td>${escapeHTML(row.r4)}</td>
                    <td>${escapeHTML(row.r5)}</td>
                    <td>${escapeHTML(row.r6)}</td>
                    <td>${escapeHTML(row.r7)}</td>
                    <td>${escapeHTML(row.r8)}</td>

                  </tr>


                  <tr>

                    <td>${escapeHTML(row.s1)}</td>
                    <td>${escapeHTML(row.s2)}</td>
                    <td>${escapeHTML(row.s3)}</td>
                    <td>${escapeHTML(row.s4)}</td>
                    <td>${escapeHTML(row.s5)}</td>
                    <td>${escapeHTML(row.s6)}</td>
                    <td>${escapeHTML(row.s7)}</td>
                    <td>${escapeHTML(row.s8)}</td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        `;

      }
    );


    container.innerHTML =
      html;

  }

  catch (error) {

    console.error(
      "Previous result exception:",
      error
    );

  }

}


function escapeHTML(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "-";

  }


  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


loadPreviousResults();


setInterval(
  loadPreviousResults,
  15000
);


/* =========================================================
   OLD RESULTS
========================================================= */

async function loadOldResults() {

  try {

    const {
      data,
      error
    } =
      await client
        .from("old_result")
        .select("*")
        .order(
          "id",
          {
            ascending: false
          }
        );


    if (error) {

      console.error(
        "Old result error:",
        error
      );

      return;

    }


    const select =
      byId(
        "monthSelect"
      );


    const container =
      byId(
        "oldResultsContainer"
      );


    if (
      !select ||
      !container
    ) {

      return;

    }


    if (
      !data ||
      data.length === 0
    ) {

      select.innerHTML =
        `
        <option>
          No results
        </option>
        `;

      container.innerHTML =
        `
        <div class="empty-state">
          No old results available.
        </div>
        `;

      return;

    }


    const months = {};


    data.forEach(
      function(row) {

        const month =
          row.month ||
          "Unknown";


        if (
          !months[month]
        ) {

          months[month] =
            [];

        }


        months[month].push(
          row
        );

      }
    );


    select.innerHTML =
      "";


    Object.keys(
      months
    ).forEach(
      function(month) {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          month;


        option.textContent =
          month;


        select.appendChild(
          option
        );

      }
    );


    function renderMonth(
      month
    ) {

      if (
        !months[month]
      ) {

        container.innerHTML =
          "";

        return;

      }


      let html =
        "";


      months[month].forEach(
        function(row) {

          html += `

            <div class="result-card">

              <div class="result-date">

                ${escapeHTML(
                  row.result_date ||
                  row.date ||
                  ""
                )}

              </div>


              <div class="result-table-wrap">

                <table class="old-table">

                  <thead>

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

                  </thead>


                  <tbody>

                    <tr>

                      <td>${escapeHTML(row.r1)}</td>
                      <td>${escapeHTML(row.r2)}</td>
                      <td>${escapeHTML(row.r3)}</td>
                      <td>${escapeHTML(row.r4)}</td>
                      <td>${escapeHTML(row.r5)}</td>
                      <td>${escapeHTML(row.r6)}</td>
                      <td>${escapeHTML(row.r7)}</td>
                      <td>${escapeHTML(row.r8)}</td>

                    </tr>


                    <tr>

                      <td>${escapeHTML(row.s1)}</td>
                      <td>${escapeHTML(row.s2)}</td>
                      <td>${escapeHTML(row.s3)}</td>
                      <td>${escapeHTML(row.s4)}</td>
                      <td>${escapeHTML(row.s5)}</td>
                      <td>${escapeHTML(row.s6)}</td>
                      <td>${escapeHTML(row.s7)}</td>
                      <td>${escapeHTML(row.s8)}</td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          `;

        }
      );


      container.innerHTML =
        html;

    }


    select.addEventListener(
      "change",
      function() {

        renderMonth(
          this.value
        );

      }
    );


    const firstMonth =
      Object.keys(
        months
      )[0];


    if (firstMonth) {

      renderMonth(
        firstMonth
      );

    }

  }

  catch (error) {

    console.error(
      "Old result exception:",
      error
    );

  }

}


loadOldResults();


setInterval(
  loadOldResults,
  30000
);


/* =========================================================
   DAILY BAZI / HOME TEXT
========================================================= */

async function loadDailyBazi() {

  try {

    const {
      data,
      error
    } =
      await client
        .from("live_text")
        .select("*")
        .eq(
          "id",
          1
        )
        .single();


    if (error) {

      console.error(
        "Daily Bazi error:",
        error
      );

      return;

    }


    if (
      data &&
      data.daily_bazi !== undefined
    ) {

      setText(
        "dailyBazi",
        data.daily_bazi
      );

    }

  }

  catch (error) {

    console.error(
      "Daily Bazi exception:",
      error
    );

  }

}


loadDailyBazi();


setInterval(
  loadDailyBazi,
  10000
);


/* =========================================================
   REFRESH BUTTON
========================================================= */

const refreshBtn =
  byId(
    "refreshBtn"
  );


if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    async function() {

      refreshBtn.disabled =
        true;


      refreshBtn.textContent =
        "Refreshing...";


      await Promise.all([
        loadResult(),
        loadTips(),
        loadPreviousResults(),
        loadOldResults(),
        loadDailyBazi()
      ]);


      refreshBtn.disabled =
        false;


      refreshBtn.textContent =
        "Refresh";

    }
  );

}


/* =========================================================
   INITIAL PAGE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const pages =
      document.querySelectorAll(
        ".page"
      );


    if (
      pages.length > 0
    ) {

      const active =
        document.querySelector(
          ".page.active"
        );


      if (!active) {

        showPage(
          "home"
        );

      }

    }

  }
);


/* =========================================================
   VISIBILITY REFRESH
========================================================= */

document.addEventListener(
  "visibilitychange",
  function() {

    if (
      document.visibilityState ===
      "visible"
    ) {

      loadResult();
      loadTips();
      loadPreviousResults();
      loadOldResults();
      loadDailyBazi();

    }

  }
);


/* =========================================================
   END
========================================================= */
