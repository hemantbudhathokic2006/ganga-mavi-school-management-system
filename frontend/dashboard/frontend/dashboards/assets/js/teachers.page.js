/* ============================================================
   ADMIN DASHBOARD — TEACHERS PAGE
   File: dashboards/assets/js/teachers.page.js
   Demo data only — replace store methods with API calls once
   GET/POST/PUT/DELETE /api/teachers is connected.
   ============================================================ */

"use strict";

const teachersSeed = [
  { id: 1, name: "Kabita Sharma", subject: "Mathematics", classes: "Class 9, Class 10", contact: "9841556677", email: "kabita.sharma@gangasec.edu.np", status: "Active" },
  { id: 2, name: "Deepak Basnet", subject: "Science", classes: "Class 8, Class 9", contact: "9856612233", email: "deepak.basnet@gangasec.edu.np", status: "Active" },
  { id: 3, name: "Sarita Gurung", subject: "English", classes: "Class 6, Class 7, Class 8", contact: "9812098765", email: "sarita.gurung@gangasec.edu.np", status: "On leave" },
  { id: 4, name: "Nirmal Rai", subject: "Computer Science", classes: "Class 9, Class 10", contact: "9801245678", email: "nirmal.rai@gangasec.edu.np", status: "Active" },
  { id: 5, name: "Mina Adhikari", subject: "Nepali", classes: "Class 6, Class 7", contact: "9847098123", email: "mina.adhikari@gangasec.edu.np", status: "Active" },
];

const teachersStore = DataStore.create("teachers", teachersSeed);

function teacherRowHtml(row) {
  return `
    <tr data-id="${row.id}">
      <td><span class="table-avatar">${dashInitials(row.name)}</span><span class="cell-primary">${dashEscape(row.name)}</span></td>
      <td>${dashEscape(row.subject)}</td>
      <td class="cell-muted">${dashEscape(row.classes)}</td>
      <td class="cell-muted">${dashEscape(row.contact)}</td>
      <td><span class="status-pill ${row.status === "Active" ? "success" : "warning"}">${row.status}</span></td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${row.id}" aria-label="Edit"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn danger" data-delete="${row.id}" aria-label="Delete"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>`;
}

function renderTeachers() {
  const tbody = document.getElementById("teachersTbody");
  const empty = document.getElementById("teachersEmpty");
  if (!tbody) return;

  const search = (document.getElementById("teacherSearch")?.value || "").toLowerCase();
  const subjectFilter = document.getElementById("subjectFilter")?.value || "";

  const rows = teachersStore.all().filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(search) || row.subject.toLowerCase().includes(search);
    const matchesSubject = !subjectFilter || row.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  tbody.innerHTML = rows.map(teacherRowHtml).join("");
  empty.classList.toggle("d-none", rows.length > 0);
}

function openTeacherModal(id) {
  const form = document.getElementById("teacherForm");
  form.reset();
  document.getElementById("teacherId").value = "";
  document.getElementById("teacherModalTitle").textContent = "Add teacher";

  if (id) {
    const row = teachersStore.find(id);
    if (!row) return;
    document.getElementById("teacherModalTitle").textContent = "Edit teacher";
    document.getElementById("teacherId").value = row.id;
    document.getElementById("teacherName").value = row.name;
    document.getElementById("teacherSubject").value = row.subject;
    document.getElementById("teacherStatus").value = row.status;
    document.getElementById("teacherClasses").value = row.classes;
    document.getElementById("teacherContact").value = row.contact;
    document.getElementById("teacherEmail").value = row.email;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeachers();

  bindSearch(document.getElementById("teacherSearch"), renderTeachers);
  document.getElementById("subjectFilter")?.addEventListener("change", renderTeachers);

  document.getElementById("teachersTbody").addEventListener("click", (event) => {
    const editId = event.target.closest("[data-edit]")?.dataset.edit;
    const deleteId = event.target.closest("[data-delete]")?.dataset.delete;

    if (editId) {
      openTeacherModal(editId);
      new bootstrap.Modal(document.getElementById("teacherModal")).show();
    }

    if (deleteId) {
      const row = teachersStore.find(deleteId);
      if (row && confirm(`Remove ${row.name} from the staff list?`)) {
        teachersStore.remove(deleteId);
        renderTeachers();
        DashToast.show(`${row.name} removed.`, "warning");
      }
    }
  });

  document.querySelector('[data-bs-target="#teacherModal"]').addEventListener("click", () => {
    openTeacherModal(null);
  });

  document.getElementById("teacherForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("teacherId").value;
    const payload = {
      name: document.getElementById("teacherName").value.trim(),
      subject: document.getElementById("teacherSubject").value,
      status: document.getElementById("teacherStatus").value,
      classes: document.getElementById("teacherClasses").value.trim(),
      contact: document.getElementById("teacherContact").value.trim(),
      email: document.getElementById("teacherEmail").value.trim(),
    };

    if (id) {
      teachersStore.update(id, payload);
      DashToast.show("Teacher updated.");
    } else {
      teachersStore.add(payload);
      DashToast.show("Teacher added.");
    }

    renderTeachers();
    bootstrap.Modal.getInstance(document.getElementById("teacherModal"))?.hide();
  });
});
