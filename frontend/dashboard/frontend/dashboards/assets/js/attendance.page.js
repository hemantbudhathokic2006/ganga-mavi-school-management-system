/* ============================================================
   ADMIN DASHBOARD — ATTENDANCE PAGE
   File: dashboards/assets/js/attendance.page.js
   Demo data only — replace saveAttendance() with a POST to
   /api/attendance once the backend is connected.
   ============================================================ */

"use strict";

const attendanceSeed = [
  { id: 1, name: "Sujata Poudel", roll: "01", status: "Present" },
  { id: 2, name: "Ramesh Thapa", roll: "02", status: "Present" },
  { id: 3, name: "Anita K.C.", roll: "03", status: "Absent" },
  { id: 4, name: "Bikash Shrestha", roll: "04", status: "Present" },
  { id: 5, name: "Puja Chaudhary", roll: "05", status: "Late" },
  { id: 6, name: "Nabin Bhattarai", roll: "06", status: "Present" },
  { id: 7, name: "Sristi Karki", roll: "07", status: "Present" },
  { id: 8, name: "Dipesh Magar", roll: "08", status: "Absent" },
];

const attendanceStore = DataStore.create("attendance", attendanceSeed);

const STATUS_CYCLE = ["Present", "Absent", "Late"];
const STATUS_CLASS = { Present: "success", Absent: "danger", Late: "warning" };

function attendanceRowHtml(row) {
  return `
    <tr data-id="${row.id}">
      <td><span class="table-avatar">${dashInitials(row.name)}</span><span class="cell-primary">${dashEscape(row.name)}</span></td>
      <td class="cell-muted">${dashEscape(row.roll)}</td>
      <td>
        <button class="status-pill ${STATUS_CLASS[row.status]}" data-cycle="${row.id}" style="border:none;cursor:pointer;min-width:90px;justify-content:center;">
          ${row.status}
        </button>
      </td>
    </tr>`;
}

function renderAttendance() {
  const tbody = document.getElementById("attendanceTbody");
  if (!tbody) return;

  const rows = attendanceStore.all();
  tbody.innerHTML = rows.map(attendanceRowHtml).join("");

  document.getElementById("attTotal").textContent = rows.length;
  document.getElementById("attPresent").textContent = rows.filter((r) => r.status === "Present").length;
  document.getElementById("attAbsent").textContent = rows.filter((r) => r.status === "Absent").length;
  document.getElementById("attLate").textContent = rows.filter((r) => r.status === "Late").length;
}

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("attendanceDate");
  if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

  renderAttendance();

  document.getElementById("attendanceTbody").addEventListener("click", (event) => {
    const id = event.target.closest("[data-cycle]")?.dataset.cycle;
    if (!id) return;
    const row = attendanceStore.find(id);
    const nextIndex = (STATUS_CYCLE.indexOf(row.status) + 1) % STATUS_CYCLE.length;
    attendanceStore.update(id, { status: STATUS_CYCLE[nextIndex] });
    renderAttendance();
  });

  document.getElementById("markAllPresent").addEventListener("click", () => {
    attendanceStore.all().forEach((row) => attendanceStore.update(row.id, { status: "Present" }));
    renderAttendance();
    DashToast.show("All students marked present.");
  });

  document.getElementById("saveAttendance").addEventListener("click", () => {
    DashToast.show("Attendance saved for " + (document.getElementById("attendanceClass").value || "class") + ".");
  });

  document.getElementById("attendanceClass")?.addEventListener("change", () => {
    DashToast.show("Loaded attendance sheet — connect the Attendance API to load real class rosters.", "warning");
  });
});
