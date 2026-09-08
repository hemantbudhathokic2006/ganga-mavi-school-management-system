/* ============================================================
   ADMIN DASHBOARD — ADMISSIONS PAGE
   File: dashboards/assets/js/admissions.page.js
   Demo data only — replace approve/reject with PUT requests to
   /api/admissions/:id once the backend is connected.
   ============================================================ */

"use strict";

const admissionsSeed = [
  { id: 1, name: "Aayush Karki", forClass: "Class 6", contact: "9841223344", submitted: "Today", status: "Pending" },
  { id: 2, name: "Kritika Basnet", forClass: "Class 9", contact: "9856098765", submitted: "Today", status: "Pending" },
  { id: 3, name: "Suman Rana", forClass: "Class 1", contact: "9812345098", submitted: "Yesterday", status: "Pending" },
  { id: 4, name: "Diya Shrestha", forClass: "Class 3", contact: "9847011223", submitted: "2 days ago", status: "Approved" },
  { id: 5, name: "Rohan Gurung", forClass: "Class 7", contact: "9801987654", submitted: "3 days ago", status: "Pending" },
  { id: 6, name: "Sabina Lama", forClass: "Class 2", contact: "9860223311", submitted: "4 days ago", status: "Rejected" },
];

const admissionsStore = DataStore.create("admissions", admissionsSeed);

function admissionRowHtml(row) {
  const statusClass = { Pending: "warning", Approved: "success", Rejected: "danger" }[row.status];
  const actions =
    row.status === "Pending"
      ? `<button class="btn-dash btn-dash-outline btn-dash-sm" data-approve="${row.id}"><i class="bi bi-check-lg"></i> Approve</button>
         <button class="btn-dash btn-dash-danger-outline btn-dash-sm" data-reject="${row.id}"><i class="bi bi-x-lg"></i> Reject</button>`
      : `<span class="cell-muted">Reviewed</span>`;

  return `
    <tr data-id="${row.id}">
      <td><span class="table-avatar">${dashInitials(row.name)}</span><span class="cell-primary">${dashEscape(row.name)}</span></td>
      <td>${dashEscape(row.forClass)}</td>
      <td class="cell-muted">${dashEscape(row.contact)}</td>
      <td class="cell-muted">${dashEscape(row.submitted)}</td>
      <td><span class="status-pill ${statusClass}">${row.status}</span></td>
      <td><div class="row-actions">${actions}</div></td>
    </tr>`;
}

function renderAdmissions() {
  const tbody = document.getElementById("admissionsTbody");
  const empty = document.getElementById("admissionsEmpty");
  if (!tbody) return;

  const search = (document.getElementById("admissionSearch")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("admissionStatusFilter")?.value || "";

  const rows = admissionsStore.all().filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(search);
    const matchesStatus = !statusFilter || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  tbody.innerHTML = rows.map(admissionRowHtml).join("");
  empty.classList.toggle("d-none", rows.length > 0);
}

document.addEventListener("DOMContentLoaded", () => {
  renderAdmissions();

  bindSearch(document.getElementById("admissionSearch"), renderAdmissions);
  document.getElementById("admissionStatusFilter")?.addEventListener("change", renderAdmissions);

  document.getElementById("admissionsTbody").addEventListener("click", (event) => {
    const approveId = event.target.closest("[data-approve]")?.dataset.approve;
    const rejectId = event.target.closest("[data-reject]")?.dataset.reject;

    if (approveId) {
      const row = admissionsStore.find(approveId);
      admissionsStore.update(approveId, { status: "Approved" });
      renderAdmissions();
      DashToast.show(`${row.name}'s application approved.`);
    }

    if (rejectId) {
      const row = admissionsStore.find(rejectId);
      admissionsStore.update(rejectId, { status: "Rejected" });
      renderAdmissions();
      DashToast.show(`${row.name}'s application rejected.`, "danger");
    }
  });
});
