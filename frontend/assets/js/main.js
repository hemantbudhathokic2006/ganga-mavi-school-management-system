/* =========================================================
   GANGA SECONDARY SCHOOL
   MAIN JAVASCRIPT
   ---------------------------------------------------------
   Current Module:
   01. Navbar
   ========================================================= */

"use strict";

/* =========================================================
   01. NAVBAR MODULE
   ========================================================= */

const SchoolNavbar = (() => {
  /* -----------------------------------------------------
       Private selectors
       ----------------------------------------------------- */

  const SELECTORS = {
    navbar: ".school-navbar",
    navLinks: ".school-nav-link",
    collapse: "#schoolMainNavigation",
    searchButton: ".school-search-button",
  };

  /* -----------------------------------------------------
       Get current page name
       ----------------------------------------------------- */

  const getCurrentPage = () => {
    const path = window.location.pathname;

    const fileName = path.split("/").pop();

    return fileName || "index.html";
  };

  /* -----------------------------------------------------
       Set active navigation item
       ----------------------------------------------------- */

  const setActiveNavigation = () => {
    const currentPage = getCurrentPage();

    const navLinks = document.querySelectorAll(SELECTORS.navLinks);

    if (!navLinks.length) {
      return;
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const linkPage = href.split("/").pop().split("#")[0];

      /*
       * Remove default active state first.
       */

      if (!link.classList.contains("dropdown-toggle")) {
        link.classList.remove("active");

        link.removeAttribute("aria-current");
      }

      /*
       * Match current page.
       */

      if (linkPage === currentPage) {
        link.classList.add("active");

        link.setAttribute("aria-current", "page");

        /*
         * If the active link belongs to a dropdown,
         * activate its parent dropdown toggle.
         */

        const dropdownMenu = link.closest(".dropdown-menu");

        if (dropdownMenu) {
          const dropdownToggle =
            dropdownMenu.parentElement?.querySelector(".dropdown-toggle");

          if (dropdownToggle) {
            dropdownToggle.classList.add("active");
          }
        }
      }
    });
  };

  /* -----------------------------------------------------
       Mobile navigation
       ----------------------------------------------------- */

  const initializeMobileNavigation = () => {
    const collapseElement = document.querySelector(SELECTORS.collapse);

    if (!collapseElement) {
      return;
    }

    const navigationLinks = collapseElement.querySelectorAll(
      "a:not(.dropdown-toggle)",
    );

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        /*
         * Bootstrap handles the collapse state.
         * We only close an already-open mobile menu.
         */

        if (
          window.innerWidth < 992 &&
          collapseElement.classList.contains("show")
        ) {
          const bootstrapCollapse =
            bootstrap.Collapse.getOrCreateInstance(collapseElement);

          bootstrapCollapse.hide();
        }
      });
    });
  };

  /* -----------------------------------------------------
       Navbar scroll state
       ----------------------------------------------------- */

  const initializeScrollEffect = () => {
    const navbar = document.querySelector(SELECTORS.navbar);

    if (!navbar) {
      return;
    }

    const updateNavbarState = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    };

    /*
     * Initial state.
     */

    updateNavbarState();

    /*
     * Passive scroll listener improves performance.
     */

    window.addEventListener("scroll", updateNavbarState, {
      passive: true,
    });
  };

  /* -----------------------------------------------------
       Search button
       ----------------------------------------------------- */

  const initializeSearch = () => {
    const searchButton = document.querySelector(SELECTORS.searchButton);

    if (!searchButton) {
      return;
    }

    searchButton.addEventListener("click", () => {
      /*
       * Search interface will be connected
       * when the dedicated search component
       * is created.
       *
       * For now, keep the button accessible
       * without creating unnecessary markup.
       */

      searchButton.classList.toggle("is-active");
    });
  };

  /* -----------------------------------------------------
       Public initializer
       ----------------------------------------------------- */

  const init = () => {
    setActiveNavigation();

    initializeMobileNavigation();

    initializeScrollEffect();

    initializeSearch();
  };

  /* -----------------------------------------------------
       Public API
       ----------------------------------------------------- */

  return {
    init,
  };
})();

/* =========================================================
   DOCUMENT INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  SchoolNavbar.init();
  SchoolSearch.init();
  DynamicHeroHeadline.init();
});

const DynamicHeroHeadline = (() => {
  const MESSAGES = [
    ["Inspiring Minds.", "Building Futures."],
    ["Shaping Character.", "Creating Leaders."],
    ["Learning Today.", "Leading Tomorrow."],
    ["Dream Big.", "Achieve More."],
    ["Knowledge with Purpose.", "Success with Values."],
    ["Empowering Students.", "Transforming Communities."],
  ];

  const ROTATION_DELAY = 6000;
  const FADE_DURATION = 600;

  let headlineIndex = 0;
  let rotationTimer = null;
  let fadeTimer = null;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getHeadlineElement = () => document.querySelector(".hero-title");

  const renderMessage = (index) => {
    const headline = getHeadlineElement();

    if (!headline) {
      return;
    }

    const [lineOne, lineTwo] = MESSAGES[index] || MESSAGES[0];

    headline.classList.add("hero-title-rotating");
    headline.innerHTML = `
      <span class="hero-rotating-line">${lineOne}</span>
      <span class="hero-rotating-line">${lineTwo}</span>
    `;
  };

  const rotateHeadline = () => {
    const headline = getHeadlineElement();

    if (!headline) {
      return;
    }

    headline.classList.add("is-transitioning");

    if (fadeTimer) {
      clearTimeout(fadeTimer);
    }

    fadeTimer = setTimeout(() => {
      headlineIndex = (headlineIndex + 1) % MESSAGES.length;
      renderMessage(headlineIndex);

      requestAnimationFrame(() => {
        headline.classList.remove("is-transitioning");
      });
    }, prefersReducedMotion() ? 0 : FADE_DURATION);
  };

  const scheduleRotation = () => {
    if (rotationTimer) {
      clearTimeout(rotationTimer);
    }

    const delay = prefersReducedMotion() ? 4000 : ROTATION_DELAY;

    rotationTimer = setTimeout(() => {
      if (document.hidden) {
        scheduleRotation();
        return;
      }

      rotateHeadline();
      scheduleRotation();
    }, delay);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (rotationTimer) {
        clearTimeout(rotationTimer);
        rotationTimer = null;
      }

      return;
    }

    scheduleRotation();
  };

  const init = () => {
    const headline = getHeadlineElement();

    if (!headline) {
      return;
    }

    renderMessage(headlineIndex);

    if (prefersReducedMotion()) {
      headline.classList.add("is-reduced-motion");
      return;
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleRotation();
  };

  return { init };
})();

/* =========================================================
   02. SITE SEARCH MODULE
   ========================================================= */

const SchoolSearch = (() => {
  const SEARCH_INDEX = [
    {
      title: "Home",
      path: "index.html",
      category: "Overview",
      description: "School overview, highlights, news, events and contact information.",
      keywords: ["home", "welcome", "school", "about"],
    },
    {
      title: "About School",
      path: "about.html",
      category: "About",
      description: "Learn about the school mission, values, curriculum and campus culture.",
      keywords: ["about", "school", "mission", "vision"],
    },
    {
      title: "Principal's Message",
      path: "principal.html",
      category: "About",
      description: "Read the principal's vision and leadership message.",
      keywords: ["principal", "message", "head teacher", "leadership"],
    },
    {
      title: "Administration",
      path: "administration.html",
      category: "About",
      description: "Meet the school management and administrative leadership team.",
      keywords: ["administration", "management", "staff", "team"],
    },
    {
      title: "Academic Programs",
      path: "academics.html",
      category: "Academics",
      description: "Explore the academic structure, learning areas and student development pathways.",
      keywords: ["academics", "programs", "courses", "curriculum"],
    },
    {
      title: "Faculty & Staff",
      path: "faculty.html",
      category: "Academics",
      description: "Meet the teachers, mentors and support staff of the school.",
      keywords: ["faculty", "teacher", "staff", "people"],
    },
    {
      title: "Results",
      path: "result.html",
      category: "Academics",
      description: "Check academic results, performance summaries and result details.",
      keywords: ["results", "exam", "marks", "performance"],
    },
    {
      title: "Admissions",
      path: "admissions.html",
      category: "Admissions",
      description: "Find admission information, procedures and enrollment guidance.",
      keywords: ["admission", "enroll", "apply", "student"],
    },
    {
      title: "Student Life",
      path: "student-life.html",
      category: "Student Life",
      description: "Explore co-curricular activities, clubs and student experiences.",
      keywords: ["student life", "activities", "clubs", "campus"],
    },
    {
      title: "News & Notices",
      path: "news.html",
      category: "Updates",
      description: "Read the latest announcements, notices and updates from school.",
      keywords: ["news", "notice", "announcement", "updates"],
    },
    {
      title: "Events",
      path: "events.html",
      category: "Updates",
      description: "Follow upcoming school events, celebrations and programs.",
      keywords: ["events", "programs", "calendar", "functions"],
    },
    {
      title: "Downloads",
      path: "downloads.html",
      category: "Resources",
      description: "Access school forms, documents and download-friendly resources.",
      keywords: ["downloads", "documents", "forms", "resources"],
    },
    {
      title: "Gallery",
      path: "gallery.html",
      category: "Resources",
      description: "Browse the school gallery and highlight moments from campus life.",
      keywords: ["gallery", "photos", "images", "campus"],
    },
    {
      title: "Contact",
      path: "contact.html",
      category: "Contact",
      description: "Reach the school office, get directions and connect with staff.",
      keywords: ["contact", "phone", "email", "location"],
    },
  ];

  const normalize = (value) => value.toLowerCase().trim();

  const matchScore = (item, query) => {
    const haystack = [
      item.title,
      item.category,
      item.description,
      ...item.keywords,
    ]
      .join(" ")
      .toLowerCase();

    if (!query) {
      return 0;
    }

    if (haystack.includes(query)) {
      return 100;
    }

    const words = query.split(/\s+/).filter(Boolean);
    const score = words.reduce((total, word) => {
      if (word.length < 2) {
        return total;
      }

      return total + (haystack.includes(word) ? 10 : 0);
    }, 0);

    return score;
  };

  const renderResults = (query) => {
    const resultsContainer = document.getElementById("search-results");

    if (!resultsContainer) {
      return;
    }

    const safeQuery = normalize(query);

    if (!safeQuery) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          <p>Popular pages</p>
          <div class="search-suggestions">
            ${SEARCH_INDEX.slice(0, 6)
              .map(
                (item) =>
                  `<a href="${item.path}" class="search-suggestion-link">${item.title}</a>`,
              )
              .join("")}
          </div>
        </div>
      `;
      return;
    }

    const matches = SEARCH_INDEX.map((item) => ({
      ...item,
      score: matchScore(item, safeQuery),
    }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    if (!matches.length) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          <p>No results match “${query}”.</p>
          <small>Try a school, subject, event, result, or contact keyword.</small>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches
      .map(
        (item) => `
          <a href="${item.path}" class="search-result-item">
            <span class="search-result-category">${item.category}</span>
            <strong>${item.title}</strong>
            <small>${item.description}</small>
          </a>
        `,
      )
      .join("");
  };

  const ensureSearchModal = () => {
    if (document.getElementById("siteSearchModal")) {
      return document.getElementById("siteSearchModal");
    }

    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "siteSearchModal";
    modal.tabIndex = "-1";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content search-modal-content">
          <div class="modal-header border-0">
            <h2 class="modal-title h5" id="siteSearchModalLabel">Search Ganga Secondary School</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close search"></button>
          </div>
          <div class="modal-body pt-0">
            <form class="site-search-form" id="site-search-form" role="search">
              <label for="site-search-input" class="visually-hidden">Search website</label>
              <div class="search-input-group">
                <i class="bi bi-search" aria-hidden="true"></i>
                <input type="search" id="site-search-input" class="form-control" name="q" placeholder="Search news, events, academics..." autocomplete="off" />
                <button type="submit" class="btn btn-primary">Search</button>
              </div>
            </form>
            <div class="search-results mt-4" id="search-results" aria-live="polite"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  };

  const attachSearchHandlers = () => {
    ensureSearchModal();

    const form = document.getElementById("site-search-form");
    const input = document.getElementById("site-search-input");
    const buttons = document.querySelectorAll(
      ".school-search-button, .nav-search-btn",
    );

    if (form && input) {
      input.addEventListener("input", (event) => {
        renderResults(event.target.value);
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = input.value.trim();
        renderResults(query);

        if (!query) {
          input.focus();
          return;
        }

        const firstResult = document.querySelector(".search-result-item");
        if (firstResult) {
          window.location.href = firstResult.getAttribute("href");
        }
      });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = document.getElementById("siteSearchModal");

        if (!modal) {
          return;
        }

        const instance = bootstrap.Modal.getOrCreateInstance(modal);
        instance.show();

        setTimeout(() => {
          const inputField = document.getElementById("site-search-input");
          if (inputField) {
            inputField.focus();
            renderResults(inputField.value);
          }
        }, 200);
      });
    });
  };

  const init = () => {
    ensureSearchModal();
    renderResults("");
    attachSearchHandlers();
  };

  return { init };
})();

/* =========================================================
   SCHOOL HIGHLIGHTS
   Animated Statistics Counter
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Initializes all statistic counters.
   *
   * Each counter must contain:
   * data-count="1000"
   *
   * Example:
   * <span data-count="1000">0+</span>
   */
  function initializeStatisticCounters() {
    const counters = document.querySelectorAll(
      ".highlight-card-number[data-count]",
    );

    if (!counters.length) {
      return;
    }

    const animateCounter = (counter) => {
      const target = Number(counter.dataset.count);

      if (!Number.isFinite(target)) {
        return;
      }

      const duration = 1600;

      const startTime = performance.now();

      /**
       * Updates the counter during animation.
       */
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        /*
         * Ease-out effect:
         * Starts quickly and finishes smoothly.
         */
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(target * easedProgress);

        counter.textContent = `${currentValue.toLocaleString()}+`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${target.toLocaleString()}+`;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    /**
     * Observe counters only when they enter
     * the user's viewport.
     */
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.35,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  /* =====================================================
       INITIALIZE STATISTIC COUNTERS
       ===================================================== */

  initializeStatisticCounters();
});
