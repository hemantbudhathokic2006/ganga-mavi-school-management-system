/* ============================================================
   ADMIN DASHBOARD — FEES PAGE
   File: dashboards/assets/js/fees.page.js
   Demo data only — replace store methods with API calls once
   GET/POST /api/student-fees and /api/student-fee-payments
   are connected.
   ============================================================ */

"use strict";

const feesSeed = [
  { id: 1, student: "Sujata Poudel", klass: "Class 10 - A", category: "Tuition fee", due: 18000, paid: 18000 },
  { id: 2, student: "Ramesh Thapa", klass: "Class 9 - B", category: "Tuition fee", due: 16000, paid: 8000 },
  { id: 3, student: "Anita K.C.", klass: "Class 8 - A", category: "Exam fee", due: 2500, paid: 0 },
  { id: 4, student: "Bikash Shrestha", klass: "Class 10 - A", category: "Transport fee", due: 6000, paid: 6000 },
  { id: 5, student: "Puja Chaudhary", klass: "Class 7 - C", category: "Tuition fee", due: 14000, paid: 5000 },
];

const feesStore = DataStore.create("fees", feesSeed);

function feeStatus(row) {
  if (row.paid >= row.due) return "Paid";
  if (row.paid > 0) return "Partial";
  return "Unpaid";
}

function feeRowHtml(row) {
  const status = feeStatus(row);
  const statusClass = { Paid: "success", Partial: "warning", Unpaid: "danger" }[status];
  return `
    <tr data-id="${row.id}">
      <td><span class="table-avatar">${dashInitials(row.student)}</span><span class="cell-primary">${dashEscape(row.student)}</span></td>
      <td class="cell-muted">${dashEscape(row.klass)}</td>
      <td>${dashEscape(row.category)}</td>
      <td>Rs ${row.due.toLocaleString()}</td>
      <td>Rs ${row.paid.toLocaleString()}</td>
      <td><span class="status-pill ${statusClass}">${status}</span></td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${row.id}" aria-label="Edit"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn danger" data-delete="${row.id}" aria-label="Delete"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>`;
}

function renderFees() {
  const tbody = document.getElementById("feesTbody");
  const empty = document.getElementById("feesEmpty");
  if (!tbody) return;

  const search = (document.getElementById("feeSearch")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("feeStatusFilter")?.value || "";

  const rows = feesStore.all().filter((row) => {
    const matchesSearch = row.student.toLowerCase().includes(search);
    const matchesStatus = !statusFilter || feeStatus(row) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  tbody.innerHTML = rows.map(feeRowHtml).join("");
  empty.classList.toggle("d-none", rows.length > 0);

  const all = feesStore.all();
  document.getElementById("feeCollected").textContent = "Rs " + all.reduce((sum, r) => sum + r.paid, 0).toLocaleString();
  document.getElementById("feeDue").textContent = "Rs " + all.reduce((sum, r) => sum + Math.max(r.due - r.paid, 0), 0).toLocaleString();
  document.getElementById("feeCount").textContent = all.length;
}

function openFeeModal(id) {
  const form = document.getElementById("feeForm");
  form.reset();
  document.getElementById("feeId").value = "";
  document.getElementById("feeModalTitle").textContent = "Record payment";

  if (id) {
    const row = feesStore.find(id);
    if (!row) return;
    document.getElementById("feeModalTitle").textContent = "Edit payment record";
    document.getElementById("feeId").value = row.id;
    document.getElementById("feeStudent").value = row.student;
    document.getElementById("feeClass").value = row.klass;
    document.getElementById("feeCategory").value = row.category;
    document.getElementById("feeDueAmt").value = row.due;
    document.getElementById("feePaidAmt").value = row.paid;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFees();

  bindSearch(document.getElementById("feeSearch"), renderFees);
  document.getElementById("feeStatusFilter")?.addEventListener("change", renderFees);

  document.getElementById("feesTbody").addEventListener("click", (event) => {
    const editId = event.target.closest("[data-edit]")?.dataset.edit;
    const deleteId = event.target.closest("[data-delete]")?.dataset.delete;

    if (editId) {
      openFeeModal(editId);
      new bootstrap.Modal(document.getElementById("feeModal")).show();
    }

    if (deleteId) {
      const row = feesStore.find(deleteId);
      if (row && confirm(`Delete the fee record for ${row.student}?`)) {
        feesStore.remove(deleteId);
        renderFees();
        DashToast.show("Record deleted.", "warning");
      }
    }
  });

  document.querySelector('[data-bs-target="#feeModal"]').addEventListener("click", () => {
    openFeeModal(null);
  });

  document.getElementById("feeForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("feeId").value;
    const payload = {
      student: document.getElementById("feeStudent").value.trim(),
      klass: document.getElementById("feeClass").value.trim(),
      category: document.getElementById("feeCategory").value,
      due: Number(document.getElementById("feeDueAmt").value) || 0,
      paid: Number(document.getElementById("feePaidAmt").value) || 0,
    };

    if (id) {
      feesStore.update(id, payload);
      DashToast.show("Fee record updated.");
    } else {
      feesStore.add(payload);
      DashToast.show("Payment recorded.");
    }

    renderFees();
    bootstrap.Modal.getInstance(document.getElementById("feeModal"))?.hide();
  });
});
