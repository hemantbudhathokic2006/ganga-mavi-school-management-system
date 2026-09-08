/* ============================================================
   ADMIN DASHBOARD — RESULTS PAGE
   File: dashboards/assets/js/results.page.js
   Demo data only — replace store methods with API calls once
   GET/POST/PUT/DELETE /api/results is connected. "Published"
   toggle maps to the backend's `published_at` field.
   ============================================================ */

"use strict";

const resultsSeed = [
  { id: 1, student: "Sujata Poudel", klass: "Class 10 - A", exam: "First Terminal 2082", fullMarks: 500, obtained: 457, grade: "A", passStatus: "Pass", visibility: "Published", remarks: "" },
  { id: 2, student: "Ramesh Thapa", klass: "Class 9 - B", exam: "First Terminal 2082", fullMarks: 500, obtained: 384, grade: "B+", passStatus: "Pass", visibility: "Published", remarks: "" },
  { id: 3, student: "Anita K.C.", klass: "Class 8 - A", exam: "First Terminal 2082", fullMarks: 500, obtained: 191, grade: "D", passStatus: "Fail", visibility: "Draft", remarks: "Needs improvement in Math and Science" },
  { id: 4, student: "Bikash Shrestha", klass: "Class 10 - A", exam: "First Terminal 2082", fullMarks: 500, obtained: 420, grade: "A", passStatus: "Pass", visibility: "Published", remarks: "" },
  { id: 5, student: "Nabin Bhattarai", klass: "Class 9 - A", exam: "Second Terminal 2082", fullMarks: 500, obtained: 349, grade: "B", passStatus: "Pass", visibility: "Draft", remarks: "" },
];

const resultsStore = DataStore.create("results", resultsSeed);

function percentOf(row) {
  return row.fullMarks ? ((row.obtained / row.fullMarks) * 100).toFixed(1) : "0.0";
}

function resultRowHtml(row) {
  const pct = percentOf(row);
  const passClass = row.passStatus === "Pass" ? "success" : row.passStatus === "Fail" ? "danger" : "warning";
  return `
    <tr data-id="${row.id}">
      <td><span class="table-avatar">${dashInitials(row.student)}</span><span class="cell-primary">${dashEscape(row.student)}</span></td>
      <td>${dashEscape(row.klass)}</td>
      <td class="cell-muted">${dashEscape(row.exam)}</td>
      <td>${row.obtained} / ${row.fullMarks}</td>
      <td class="cell-primary">${pct}%</td>
      <td>${dashEscape(row.grade || "-")}</td>
      <td><span class="status-pill ${passClass}">${row.passStatus}</span></td>
      <td>
        <button class="status-pill ${row.visibility === "Published" ? "info" : "neutral"}" data-toggle-publish="${row.id}" style="border:none;cursor:pointer;">
          <i class="bi ${row.visibility === "Published" ? "bi-eye" : "bi-eye-slash"}"></i> ${row.visibility}
        </button>
      </td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${row.id}" aria-label="Edit"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn danger" data-delete="${row.id}" aria-label="Delete"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>`;
}

function renderResults() {
  const tbody = document.getElementById("resultsTbody");
  const empty = document.getElementById("resultsEmpty");
  if (!tbody) return;

  const search = (document.getElementById("resultSearch")?.value || "").toLowerCase();
  const examFilter = document.getElementById("examFilter")?.value || "";
  const statusFilter = document.getElementById("resultStatusFilter")?.value || "";

  const rows = resultsStore.all().filter((row) => {
    const matchesSearch = row.student.toLowerCase().includes(search);
    const matchesExam = !examFilter || row.exam === examFilter;
    const matchesStatus = !statusFilter || row.visibility === statusFilter;
    return matchesSearch && matchesExam && matchesStatus;
  });

  tbody.innerHTML = rows.map(resultRowHtml).join("");
  empty.classList.toggle("d-none", rows.length > 0);
}

function openResultModal(id) {
  const form = document.getElementById("resultForm");
  form.reset();
  document.getElementById("resultId").value = "";
  document.getElementById("resultModalTitle").textContent = "Add result";
  document.getElementById("resultFullMarks").value = 500;

  if (id) {
    const row = resultsStore.find(id);
    if (!row) return;
    document.getElementById("resultModalTitle").textContent = "Edit result";
    document.getElementById("resultId").value = row.id;
    document.getElementById("resultStudent").value = row.student;
    document.getElementById("resultClass").value = row.klass;
    document.getElementById("resultExam").value = row.exam;
    document.getElementById("resultFullMarks").value = row.fullMarks;
    document.getElementById("resultObtained").value = row.obtained;
    document.getElementById("resultGrade").value = row.grade;
    document.getElementById("resultPassStatus").value = row.passStatus;
    document.getElementById("resultVisibility").value = row.visibility;
    document.getElementById("resultRemarks").value = row.remarks;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderResults();

  bindSearch(document.getElementById("resultSearch"), renderResults);
  document.getElementById("examFilter")?.addEventListener("change", renderResults);
  document.getElementById("resultStatusFilter")?.addEventListener("change", renderResults);

  document.getElementById("resultsTbody").addEventListener("click", (event) => {
    const editId = event.target.closest("[data-edit]")?.dataset.edit;
    const deleteId = event.target.closest("[data-delete]")?.dataset.delete;
    const toggleId = event.target.closest("[data-toggle-publish]")?.dataset.togglePublish;

    if (editId) {
      openResultModal(editId);
      new bootstrap.Modal(document.getElementById("resultModal")).show();
    }

    if (deleteId) {
      const row = resultsStore.find(deleteId);
      if (row && confirm(`Delete the result for ${row.student}?`)) {
        resultsStore.remove(deleteId);
        renderResults();
        DashToast.show("Result deleted.", "warning");
      }
    }

    if (toggleId) {
      const row = resultsStore.find(toggleId);
      const next = row.visibility === "Published" ? "Draft" : "Published";
      resultsStore.update(toggleId, { visibility: next });
      renderResults();
      DashToast.show(
        next === "Published" ? `${row.student}'s result is now visible to students.` : `${row.student}'s result was unpublished.`,
        next === "Published" ? "success" : "warning",
      );
    }
  });

  document.querySelector('[data-bs-target="#resultModal"]').addEventListener("click", () => {
    openResultModal(null);
  });

  document.getElementById("resultForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("resultId").value;
    const payload = {
      student: document.getElementById("resultStudent").value.trim(),
      klass: document.getElementById("resultClass").value.trim(),
      exam: document.getElementById("resultExam").value,
      fullMarks: Number(document.getElementById("resultFullMarks").value) || 0,
      obtained: Number(document.getElementById("resultObtained").value) || 0,
      grade: document.getElementById("resultGrade").value.trim(),
      passStatus: document.getElementById("resultPassStatus").value,
      visibility: document.getElementById("resultVisibility").value,
      remarks: document.getElementById("resultRemarks").value.trim(),
    };

    if (id) {
      resultsStore.update(id, payload);
      DashToast.show("Result updated.");
    } else {
      resultsStore.add(payload);
      DashToast.show("Result added.");
    }

    renderResults();
    bootstrap.Modal.getInstance(document.getElementById("resultModal"))?.hide();
  });
});
