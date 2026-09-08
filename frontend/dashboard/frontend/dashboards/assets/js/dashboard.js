/* ============================================================
   GANGA SECONDARY SCHOOL
   ADMIN DASHBOARD — SHARED BEHAVIOUR
   File: dashboards/assets/js/dashboard.js
   ------------------------------------------------------------
   Responsibilities:
   1. Sidebar collapse / mobile toggle
   2. Active nav-link highlighting
   3. Toast notifications
   4. A tiny in-memory "DataStore" so every dashboard page can
      demo add / edit / delete / search against sample data
      before the backend API is wired in. Each page's own
      script (e.g. students.page.js) supplies the sample rows
      and a render function; this file only provides the
      shared plumbing.

   NOTE: This is a FRONTEND-ONLY preview layer. Nothing here
   calls the backend yet — data resets on page reload. Once
   the API is ready, DataStore.save()/DataStore.remove() are
   the two functions to swap for real fetch() calls.
   ============================================================ */

"use strict";

/* ============================================================
   01. SIDEBAR + LAYOUT
   ============================================================ */

const DashboardLayout = (() => {
  const shell = document.querySelector(".dashboard-shell");

  function init() {
    if (!shell) return;

    const desktopToggle = document.querySelector("[data-sidebar-collapse]");
    const mobileToggle = document.querySelector("[data-sidebar-mobile-toggle]");
    const backdrop = document.querySelector(".sidebar-backdrop");

    const collapsed = localStorage.getItem("ganga-admin-sidebar-collapsed") === "true";
    if (collapsed && window.innerWidth > 991) {
      shell.classList.add("is-collapsed");
    }

    if (desktopToggle) {
      desktopToggle.addEventListener("click", () => {
        shell.classList.toggle("is-collapsed");
        localStorage.setItem(
          "ganga-admin-sidebar-collapsed",
          shell.classList.contains("is-collapsed"),
        );
      });
    }

    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        shell.classList.toggle("is-mobile-open");
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => {
        shell.classList.remove("is-mobile-open");
      });
    }

    highlightActiveLink();
  }

  function highlightActiveLink() {
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".sidebar-link").forEach((link) => {
      const target = (link.getAttribute("href") || "").split("/").pop();
      if (target === currentFile) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  return { init };
})();

/* ============================================================
   02. TOAST NOTIFICATIONS
   ============================================================ */

const DashToast = (() => {
  let stack = null;

  function ensureStack() {
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "dash-toast-stack";
      document.body.appendChild(stack);
    }
    return stack;
  }

  function show(message, type = "success") {
    const container = ensureStack();
    const icons = {
      success: "bi-check-circle-fill",
      danger: "bi-x-circle-fill",
      warning: "bi-exclamation-triangle-fill",
    };

    const toast = document.createElement("div");
    toast.className = `dash-toast ${type === "success" ? "" : type}`;
    toast.innerHTML = `
      <i class="bi ${icons[type] || icons.success}" aria-hidden="true"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.2s ease";
      window.setTimeout(() => toast.remove(), 200);
    }, 2600);
  }

  return { show };
})();

/* ============================================================
   03. DEMO DATA STORE
   ------------------------------------------------------------
   Very small helper so each page can:
     const store = DataStore.create("students", sampleRows);
     store.all() / store.add(row) / store.update(id, row) /
     store.remove(id) / store.find(id)
   Data only lives in memory for this tab session — this is a
   design/UX preview, not persistence. Swap the four methods
   below for real API calls once backend + auth are connected.
   ============================================================ */

const DataStore = (() => {
  function create(key, seedRows) {
    let rows = seedRows.map((row) => ({ ...row }));

    return {
      all() {
        return rows;
      },
      find(id) {
        return rows.find((row) => String(row.id) === String(id));
      },
      add(row) {
        const nextId = rows.length
          ? Math.max(...rows.map((r) => Number(r.id) || 0)) + 1
          : 1;
        const newRow = { id: nextId, ...row };
        rows = [newRow, ...rows];
        return newRow;
      },
      update(id, changes) {
        rows = rows.map((row) =>
          String(row.id) === String(id) ? { ...row, ...changes } : row,
        );
        return this.find(id);
      },
      remove(id) {
        rows = rows.filter((row) => String(row.id) !== String(id));
      },
    };
  }

  return { create };
})();

/* ============================================================
   04. SMALL DOM HELPERS
   ============================================================ */

function dashInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function dashEscape(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

function bindSearch(inputEl, onFilter) {
  if (!inputEl) return;
  let timer = null;
  inputEl.addEventListener("input", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => onFilter(inputEl.value.trim().toLowerCase()), 120);
  });
}

/* ============================================================
   05. INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  DashboardLayout.init();
});
