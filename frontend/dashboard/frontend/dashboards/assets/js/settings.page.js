/* ============================================================
   ADMIN DASHBOARD — SETTINGS PAGE
   File: dashboards/assets/js/settings.page.js
   Demo only — wire each form's submit handler to the matching
   backend endpoint once available (school profile, academic
   year/term, and password change all have models already).
   ============================================================ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("schoolProfileForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    DashToast.show("School profile saved.");
  });

  document.getElementById("academicYearForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    DashToast.show("Academic year & term updated.");
  });

  document.getElementById("passwordForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    DashToast.show("Password updated.");
    event.target.reset();
  });
});
