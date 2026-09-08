/* =========================================================
   PADMODAYA SECONDARY SCHOOL
   NEWS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       MOBILE NAVIGATION
       
       Same IDs as index.html
    ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  /* =====================================================
       NEWS ELEMENTS
    ===================================================== */

  const newsGrid = document.getElementById("newsGrid");

  const newsCards = newsGrid
    ? Array.from(newsGrid.querySelectorAll(".news-page-card"))
    : [];

  const searchInput = document.getElementById("newsSearch");

  const clearSearch = document.getElementById("clearNewsSearch");

  const filterButtons = document.querySelectorAll(".news-filter-btn");

  const loadMoreButton = document.getElementById("loadMoreNews");

  const noResult = document.getElementById("newsNoResult");

  const newsCount = document.getElementById("newsCount");

  const newsResultText = document.getElementById("newsResultText");

  /* =====================================================
       SETTINGS
    ===================================================== */

  let currentFilter = "all";

  let searchText = "";

  let visibleLimit = 6;

  /* =====================================================
       FILTER NEWS
    ===================================================== */

  function updateNews() {
    let matchingCards = [];

    newsCards.forEach(function (card) {
      const category = card.dataset.category || "";

      const text = card.innerText.toLowerCase();

      const matchesCategory =
        currentFilter === "all" || category === currentFilter;

      const matchesSearch = text.includes(searchText);

      if (matchesCategory && matchesSearch) {
        matchingCards.push(card);
      }
    });

    /* =================================================
           DISPLAY CARDS
        ================================================= */

    newsCards.forEach(function (card) {
      card.classList.add("news-hidden");
    });

    matchingCards.forEach(function (card, index) {
      if (index < visibleLimit) {
        card.classList.remove("news-hidden");
      }
    });

    /* =================================================
           UPDATE COUNT
        ================================================= */

    if (newsCount) {
      newsCount.textContent = matchingCards.length;
    }

    /* =================================================
           RESULT TEXT
        ================================================= */

    if (newsResultText) {
      if (searchText) {
        newsResultText.textContent = `Search results for "${searchText}"`;
      } else if (currentFilter !== "all") {
        const activeButton = document.querySelector(".news-filter-btn.active");

        const categoryName = activeButton
          ? activeButton.textContent.trim()
          : "News";

        newsResultText.textContent = `${categoryName} updates`;
      } else {
        newsResultText.textContent = "Showing latest school updates";
      }
    }

    /* =================================================
           NO RESULT MESSAGE
        ================================================= */

    if (noResult) {
      noResult.hidden = matchingCards.length !== 0;
    }

    /* =================================================
           LOAD MORE BUTTON
        ================================================= */

    if (loadMoreButton) {
      const moreAvailable = matchingCards.length > visibleLimit;

      loadMoreButton.classList.toggle("hidden", !moreAvailable);
    }
  }

  /* =====================================================
       CATEGORY FILTER BUTTONS
    ===================================================== */

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      currentFilter = button.dataset.filter || "all";

      visibleLimit = 6;

      updateNews();
    });
  });

  /* =====================================================
       SEARCH
    ===================================================== */

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchText = searchInput.value.trim().toLowerCase();

      visibleLimit = 6;

      if (clearSearch) {
        clearSearch.classList.toggle("visible", searchText.length > 0);
      }

      updateNews();
    });
  }

  /* =====================================================
       CLEAR SEARCH
    ===================================================== */

  if (clearSearch) {
    clearSearch.addEventListener("click", function () {
      if (!searchInput) return;

      searchInput.value = "";

      searchText = "";

      clearSearch.classList.remove("visible");

      visibleLimit = 6;

      updateNews();

      searchInput.focus();
    });
  }

  /* =====================================================
       LOAD MORE
       
       6 cards initially.
       Every click reveals 3 more.
    ===================================================== */

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", function () {
      visibleLimit += 3;

      updateNews();
    });
  }

  /* =====================================================
       ESC KEY
       
       Clear search using Escape.
    ===================================================== */

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      searchInput &&
      document.activeElement === searchInput
    ) {
      searchInput.value = "";

      searchText = "";

      if (clearSearch) {
        clearSearch.classList.remove("visible");
      }

      visibleLimit = 6;

      updateNews();
    }
  });

  /* =====================================================
       INITIAL LOAD
    ===================================================== */

  updateNews();
});
