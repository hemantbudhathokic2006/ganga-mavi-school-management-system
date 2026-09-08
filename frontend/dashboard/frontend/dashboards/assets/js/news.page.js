/* ============================================================
   ADMIN DASHBOARD — NEWS & NOTICES PAGE
   File: dashboards/assets/js/news.page.js
   Demo data only — replace store methods with API calls once
   GET/POST/PUT/DELETE /api/news is connected.
   ============================================================ */

"use strict";

const newsSeed = [
  {
    id: 1,
    title: "Dashain vacation notice",
    short: "The school will remain closed for the Dashain festival from Ashwin 20 to Kartik 5.",
    content: "The school will remain closed for the Dashain festival from Ashwin 20 to Kartik 5. Classes resume on Kartik 6. Wishing all students, parents, and staff a happy and safe Dashain.",
    category: "Notice",
    status: "Published",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Inter-school science fair results announced",
    short: "Our students secured 1st place in the district-level science fair held in Ghorahi.",
    content: "Our students secured 1st place in the district-level science fair held in Ghorahi. Congratulations to the Class 9 and 10 teams for their outstanding project on renewable energy.",
    category: "News",
    status: "Published",
    date: "5 days ago",
  },
  {
    id: 3,
    title: "Parent-teacher meeting scheduled",
    short: "A parent-teacher meeting for Class 6-10 will be held this Friday at 10 AM.",
    content: "A parent-teacher meeting for Class 6-10 will be held this Friday at 10 AM in the school hall. Parents are requested to attend to discuss student progress for the first terminal exams.",
    category: "Event",
    status: "Published",
    date: "1 week ago",
  },
  {
    id: 4,
    title: "First terminal exam routine",
    short: "Draft routine for the upcoming first terminal examinations — pending final review.",
    content: "Draft routine for the upcoming first terminal examinations. Subject-wise dates and timings are being finalized with department heads before publishing to students.",
    category: "Notice",
    status: "Draft",
    date: "1 week ago",
  },
];

const newsStore = DataStore.create("news", newsSeed);

function newsCardHtml(row) {
  const catIcon = { Notice: "bi-file-earmark-text", News: "bi-newspaper", Event: "bi-calendar-event", Result: "bi-bar-chart-line" }[row.category] || "bi-file-earmark-text";
  return `
    <div class="d-flex gap-3 align-items-start p-3" data-id="${row.id}" style="border-bottom:1px solid var(--border-softer);">
      <div class="stat-icon navy" style="flex-shrink:0;"><i class="bi ${catIcon}"></i></div>
      <div class="flex-grow-1">
        <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
          <span class="cell-primary" style="font-size:.95rem;">${dashEscape(row.title)}</span>
          <span class="status-pill ${row.status === "Published" ? "success" : "neutral"}">${row.status}</span>
          <span class="status-pill info">${dashEscape(row.category)}</span>
        </div>
        <p class="cell-muted mb-0" style="max-width:640px;">${dashEscape(row.short || row.content.slice(0, 140))}</p>
        <div class="cell-muted mt-1" style="font-size:.72rem;">${dashEscape(row.date)}</div>
      </div>
      <div class="row-actions">
        <button class="icon-btn" data-edit="${row.id}" aria-label="Edit"><i class="bi bi-pencil"></i></button>
        <button class="icon-btn danger" data-delete="${row.id}" aria-label="Delete"><i class="bi bi-trash"></i></button>
      </div>
    </div>`;
}

function renderNews() {
  const list = document.getElementById("newsList");
  const empty = document.getElementById("newsEmpty");
  if (!list) return;

  const search = (document.getElementById("newsSearch")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("newsStatusFilter")?.value || "";

  const rows = newsStore.all().filter((row) => {
    const matchesSearch = row.title.toLowerCase().includes(search);
    const matchesStatus = !statusFilter || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  list.innerHTML = rows.map(newsCardHtml).join("");
  empty.classList.toggle("d-none", rows.length > 0);
}

function openNewsModal(id) {
  const form = document.getElementById("newsForm");
  form.reset();
  document.getElementById("newsId").value = "";
  document.getElementById("newsModalTitle").textContent = "New post";

  if (id) {
    const row = newsStore.find(id);
    if (!row) return;
    document.getElementById("newsModalTitle").textContent = "Edit post";
    document.getElementById("newsId").value = row.id;
    document.getElementById("newsTitle").value = row.title;
    document.getElementById("newsShort").value = row.short;
    document.getElementById("newsContent").value = row.content;
    document.getElementById("newsCategory").value = row.category;
    document.getElementById("newsStatus").value = row.status;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderNews();

  bindSearch(document.getElementById("newsSearch"), renderNews);
  document.getElementById("newsStatusFilter")?.addEventListener("change", renderNews);

  document.getElementById("newsList").addEventListener("click", (event) => {
    const editId = event.target.closest("[data-edit]")?.dataset.edit;
    const deleteId = event.target.closest("[data-delete]")?.dataset.delete;

    if (editId) {
      openNewsModal(editId);
      new bootstrap.Modal(document.getElementById("newsModal")).show();
    }

    if (deleteId) {
      const row = newsStore.find(deleteId);
      if (row && confirm(`Delete "${row.title}"?`)) {
        newsStore.remove(deleteId);
        renderNews();
        DashToast.show("Post deleted.", "warning");
      }
    }
  });

  document.querySelector('[data-bs-target="#newsModal"]').addEventListener("click", () => {
    openNewsModal(null);
  });

  document.getElementById("newsForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("newsId").value;
    const payload = {
      title: document.getElementById("newsTitle").value.trim(),
      short: document.getElementById("newsShort").value.trim(),
      content: document.getElementById("newsContent").value.trim(),
      category: document.getElementById("newsCategory").value,
      status: document.getElementById("newsStatus").value,
      date: "Just now",
    };

    if (id) {
      newsStore.update(id, payload);
      DashToast.show("Post updated.");
    } else {
      newsStore.add(payload);
      DashToast.show(payload.status === "Published" ? "Post published." : "Draft saved.");
    }

    renderNews();
    bootstrap.Modal.getInstance(document.getElementById("newsModal"))?.hide();
  });
});
