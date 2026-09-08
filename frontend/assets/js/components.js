/* ============================================================
   GANGA SECONDARY SCHOOL
   SHARED COMPONENT SYSTEM
   File: assets/js/components.js

   Responsibilities:
   1. Load shared Navbar
   2. Load shared Footer
   3. Load shared Loader
   4. Resolve component paths from every page
   5. Set active navigation item
   6. Dispatch component-loaded events
   7. Handle component loading errors gracefully

   Technology:
   Vanilla JavaScript
   ============================================================ */

"use strict";

/* ============================================================
   01. COMPONENT CONFIGURATION
   ============================================================ */

const COMPONENT_CONFIG = Object.freeze({
  navbar: {
    selector: "#navbar-container",
    path: "components/navbar.html",
  },

  footer: {
    selector: "#footer-container",
    path: "components/footer.html",
  },

  loader: {
    selector: "#loader-container",
    path: "components/loader.html",
  },
});

/* ============================================================
   02. APPLICATION PATH
   ============================================================ */

/*
 * Pages inside /pages/ need ../
 * index.html needs ./components/
 */

function getComponentBasePath() {
  const currentPath = window.location.pathname;

  const isInsidePages = currentPath.includes("/pages/");

  return isInsidePages ? "../" : "./";
}

/* ============================================================
   03. COMPONENT PATH RESOLVER
   ============================================================ */

function resolveComponentPath(path) {
  return `${getComponentBasePath()}${path}`;
}

/* ============================================================
   04. FETCH COMPONENT
   ============================================================ */

async function fetchComponent(path) {
  const response = await fetch(resolveComponentPath(path), {
    method: "GET",
    headers: {
      Accept: "text/html",
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Unable to load component: ${path}`);
  }

  return response.text();
}

/* ============================================================
   05. INSERT COMPONENT
   ============================================================ */

async function loadComponent(componentName) {
  const config = COMPONENT_CONFIG[componentName];

  if (!config) {
    console.error(`[Components] Unknown component: ${componentName}`);

    return false;
  }

  const container = document.querySelector(config.selector);

  if (!container) {
    return false;
  }

  try {
    const html = await fetchComponent(config.path);

    container.innerHTML = html;
    container.dataset.componentLoaded = "true";

    document.dispatchEvent(
      new CustomEvent("component:loaded", {
        detail: {
          name: componentName,
          element: container,
        },
      }),
    );

    return true;
  } catch (error) {
    console.error(`[Components] ${error.message}`);

    container.innerHTML = "";
    container.dataset.componentError = "true";

    document.dispatchEvent(
      new CustomEvent("component:error", {
        detail: {
          name: componentName,
          error: error,
        },
      }),
    );

    return false;
  }
}

/* ============================================================
   06. LOAD ALL SHARED COMPONENTS
   ============================================================ */

async function loadSharedComponents() {
  const componentNames = Object.keys(COMPONENT_CONFIG);

  /*
   * Components are loaded together
   * for faster page rendering.
   */

  await Promise.all(
    componentNames.map((componentName) => loadComponent(componentName)),
  );

  const loader = document.getElementById("site-loader");

  if (loader) {
    loader.classList.add("is-hidden");
    loader.setAttribute("aria-hidden", "true");
  }

  /*
   * Navbar exists only after
   * asynchronous loading.
   */

  initializeNavigation();

  document.dispatchEvent(new CustomEvent("components:ready"));
}

/* ============================================================
   07. ACTIVE NAVIGATION
   ============================================================ */

function initializeNavigation() {
  const navigationLinks = document.querySelectorAll(
    ".school-navbar a[data-page]",
  );

  if (!navigationLinks.length) {
    return;
  }

  const currentPage = getCurrentPageName();

  navigationLinks.forEach((link) => {
    const targetPage = link.dataset.page;

    if (targetPage && targetPage === currentPage) {
      link.classList.add("active");

      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");

      link.removeAttribute("aria-current");
    }
  });
}

/* ============================================================
   08. CURRENT PAGE DETECTION
   ============================================================ */

function getCurrentPageName() {
  let pathname = window.location.pathname;

  /*
   * Remove trailing slash.
   */

  pathname = pathname.replace(/\/+$/, "");

  /*
   * Extract filename.
   */

  const filename = pathname.split("/").pop();

  /*
   * Root URL should represent index.
   */

  if (!filename || filename === "") {
    return "index";
  }

  /*
   * Remove .html
   */

  return filename.replace(/\.html$/, "").toLowerCase();
}

/* ============================================================
   09. NAVIGATION LINK SAFETY
   ============================================================ */

function initializeNavigationLinks() {
  const links = document.querySelectorAll(".school-navbar a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    /*
     * Prevent empty navigation links.
     */

    if (href.trim() === "") {
      link.setAttribute("aria-disabled", "true");
    }
  });
}

/* ============================================================
   10. MOBILE NAVIGATION
   ============================================================ */

function initializeMobileNavigation() {
  const navbar = document.querySelector(".school-navbar");

  if (!navbar) {
    return;
  }

  const navigationLinks = navbar.querySelectorAll(".navbar-nav .nav-link");

  const navbarCollapse = navbar.querySelector(".navbar-collapse");

  if (!navbarCollapse || !navigationLinks.length) {
    return;
  }

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      /*
       * Bootstrap handles the actual
       * collapse behavior.
       *
       * We only close an open mobile menu.
       */

      if (
        window.innerWidth < 992 &&
        navbarCollapse.classList.contains("show")
      ) {
        const collapseButton = navbar.querySelector(".navbar-toggler");

        if (collapseButton) {
          collapseButton.click();
        }
      }
    });
  });
}

/* ============================================================
   11. COMPONENT READY HANDLER
   ============================================================ */

document.addEventListener("component:loaded", (event) => {
  const componentName = event.detail?.name;

  if (componentName === "navbar") {
    initializeNavigation();

    initializeNavigationLinks();

    initializeMobileNavigation();
  }
});

/* ============================================================
   12. COMPONENT ERROR HANDLER
   ============================================================ */

document.addEventListener("component:error", (event) => {
  const componentName = event.detail?.name;

  console.warn(`[Components] Failed to load ${componentName}.`);
});

/* ============================================================
   13. INITIALIZATION
   ============================================================ */

async function initializeComponents() {
  /*
   * DOM must exist before component containers
   * can be selected.
   */

  if (document.readyState === "loading") {
    await new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", resolve, {
        once: true,
      });
    });
  }

  await loadSharedComponents();
}

/* ============================================================
   14. PUBLIC COMPONENT API
   ============================================================ */

window.GangaComponents = Object.freeze({
  load: loadComponent,

  loadAll: loadSharedComponents,

  getCurrentPage: getCurrentPageName,
});

/* ============================================================
   15. START COMPONENT SYSTEM
   ============================================================ */

initializeComponents();

/* ============================================================
   END OF COMPONENT SYSTEM
   ============================================================ */
