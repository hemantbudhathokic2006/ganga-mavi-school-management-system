/* ============================================================
   ADMIN DASHBOARD — STUDENTS PAGE
   File: dashboards/assets/js/students.page.js
   Demo data only — replace store methods with API calls once
   GET/POST/PUT/DELETE /api/students is connected.
   ============================================================ */

"use strict";

const studentsSeed = [
  { id: 1, name: "Sujata Poudel", roll: "10", klass: "Class 10", section: "A", guardian: "Him Bahadur Poudel", contact: "9841022311", status: "Active" },
  { id: 2, name: "Ramesh Thapa", roll: "14", klass: "Class 9", section: "B", guardian: "Kamala Thapa", contact: "9856104477", status: "Active" },
  { id: 3, name: "Anita K.C.", roll: "03", klass: "Class 8", section: "A", guardian: "Suresh K.C.", contact: "9812245566", status: "Active" },
  { id: 4, name: "Bikash Shrestha", roll: "22", klass: "Class 10", section: "A", guardian: "Ganga Shrestha", contact: "9801123344", status: "Active" },
  { id: 5, name: "Puja Chaudhary", roll: "07", klass: "Class 7", section: "C", guardian: "Ram Chaudhary", contact: "9847712233", status: "Inactive" },
  { id: 6, name: "Nabin Bhattarai", roll: "18", klass: "Class 9", section: "A", guardian: "Sita Bhattarai", contact: "9860099887", status: "Active" },
];

const studentsStore = DataStore.create("students", studentsSeed);

function studentRowHtml(row) {
  return `
    <tr data-id="${row.id}">
      <td><span class="table-avatar">${dashInitials(row.name)}</span><span class="cell-primary">${dashEscape(row.name)}</span></td>
      <td>${dashEscape(row.roll)}</td>
      <td>${dashEscape(row.klass)} - ${dashEscape(row.section)}</td>
      <td>${dashEscape(row.guardian)}</td>
      <td class="cell-muted">${dashEscape(row.contact)}</td>
      <td><span class="status-pill ${row.status === "Active" ? "success" : "neutral"}">${row.status}</span></td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${row.id}" aria-label="Edit"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn danger" data-delete="${row.id}" aria-label="Delete"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>`;
}

function renderStudents() {
  const tbody = document.getElementById("studentsTbody");
  const empty = document.getElementById("studentsEmpty");
  if (!tbody) return;

  const search = (document.getElementById("studentSearch")?.value || "").toLowerCase();
  const classFilter = document.getElementById("classFilter")?.value || "";
  const statusFilter = document.getElementById("statusFilter")?.value || "";

  const rows = studentsStore.all().filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(search) || row.roll.toLowerCase().includes(search);
    const matchesClass = !classFilter || row.klass === classFilter;
    const matchesStatus = !statusFilter || row.status === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  tbody.innerHTML = rows.map(studentRowHtml).join("");
  empty.classList.toggle("d-none", rows.length > 0);

  document.getElementById("statTotal").textContent = studentsStore.all().length;
  document.getElementById("statActive").textContent = studentsStore.all().filter((r) => r.status === "Active").length;
  document.getElementById("statInactive").textContent = studentsStore.all().filter((r) => r.status === "Inactive").length;
}

function openStudentModal(id) {
  const form = document.getElementById("studentForm");
  form.reset();
  document.getElementById("studentId").value = "";
  document.getElementById("studentModalTitle").textContent = "Add student";

  if (id) {
    const row = studentsStore.find(id);
    if (!row) return;
    document.getElementById("studentModalTitle").textContent = "Edit student";
    document.getElementById("studentId").value = row.id;
    document.getElementById("studentName").value = row.name;
    document.getElementById("studentClass").value = row.klass;
    document.getElementById("studentSection").value = row.section;
    document.getElementById("studentRoll").value = row.roll;
    document.getElementById("studentStatus").value = row.status;
    document.getElementById("studentGuardian").value = row.guardian;
    document.getElementById("studentContact").value = row.contact;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderStudents();

  bindSearch(document.getElementById("studentSearch"), renderStudents);
  document.getElementById("classFilter")?.addEventListener("change", renderStudents);
  document.getElementById("statusFilter")?.addEventListener("change", renderStudents);

  document.getElementById("studentsTbody").addEventListener("click", (event) => {
    const editId = event.target.closest("[data-edit]")?.dataset.edit;
    const deleteId = event.target.closest("[data-delete]")?.dataset.delete;

    if (editId) {
      openStudentModal(editId);
      new bootstrap.Modal(document.getElementById("studentModal")).show();
    }

    if (deleteId) {
      const row = studentsStore.find(deleteId);
      if (row && confirm(`Remove ${row.name} from the student list?`)) {
        studentsStore.remove(deleteId);
        renderStudents();
        DashToast.show(`${row.name} removed.`, "warning");
      }
    }
  });

  document.querySelector('[data-bs-target="#studentModal"]').addEventListener("click", () => {
    openStudentModal(null);
  });

  document.getElementById("studentForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("studentId").value;
    const payload = {
      name: document.getElementById("studentName").value.trim(),
      klass: document.getElementById("studentClass").value,
      section: document.getElementById("studentSection").value,
      roll: document.getElementById("studentRoll").value.trim(),
      status: document.getElementById("studentStatus").value,
      guardian: document.getElementById("studentGuardian").value.trim(),
      contact: document.getElementById("studentContact").value.trim(),
    };

    if (id) {
      studentsStore.update(id, payload);
      DashToast.show("Student updated.");
    } else {
      studentsStore.add(payload);
      DashToast.show("Student added.");
    }

    renderStudents();
    bootstrap.Modal.getInstance(document.getElementById("studentModal"))?.hide();
  });
});
