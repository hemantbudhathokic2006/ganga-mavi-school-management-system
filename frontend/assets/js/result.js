"use strict";

const ResultData = [
  {
    id: "grade-10-2026",
    student: "Aarav Shrestha",
    className: "Grade 10",
    term: "Annual Examination 2026",
    percentage: 92.4,
    division: "Distinction",
    remarks: "Excellent academic progress with strong performance in Mathematics and Science.",
    subjects: [
      { name: "English", score: 94 },
      { name: "Mathematics", score: 96 },
      { name: "Science", score: 95 },
      { name: "Social Studies", score: 91 },
      { name: "Nepali", score: 88 },
    ],
  },
  {
    id: "grade-9-2026",
    student: "Sanish KC",
    className: "Grade 9",
    term: "Quarterly Assessment 2026",
    percentage: 88.6,
    division: "First Division",
    remarks: "Consistent effort and positive classroom participation across all major subjects.",
    subjects: [
      { name: "English", score: 89 },
      { name: "Mathematics", score: 92 },
      { name: "Science", score: 90 },
      { name: "Computer", score: 94 },
      { name: "Nepali", score: 85 },
    ],
  },
  {
    id: "grade-8-2026",
    student: "Puja Thapa",
    className: "Grade 8",
    term: "Mid-Year Evaluation 2026",
    percentage: 86.3,
    division: "First Division",
    remarks: "Strong analytical skills and steady improvement in practical learning activities.",
    subjects: [
      { name: "English", score: 88 },
      { name: "Mathematics", score: 90 },
      { name: "Science", score: 87 },
      { name: "Social Studies", score: 84 },
      { name: "Nepali", score: 86 },
    ],
  },
  {
    id: "grade-7-2026",
    student: "Nabin Gurung",
    className: "Grade 7",
    term: "Annual Examination 2026",
    percentage: 83.1,
    division: "First Division",
    remarks: "Good academic initiative and a strong habit of regular revision.",
    subjects: [
      { name: "English", score: 84 },
      { name: "Mathematics", score: 86 },
      { name: "Science", score: 82 },
      { name: "Social Studies", score: 80 },
      { name: "Nepali", score: 83 },
    ],
  },
];

const formatPercent = (value) => `${Number(value).toFixed(1)}%`;

function renderResultList() {
  const container = document.getElementById("result-list");

  if (!container) {
    return;
  }

  container.innerHTML = ResultData.map((result) => `
    <article class="result-card">
      <span class="result-badge">${result.className}</span>
      <h3>${result.student}</h3>
      <p>${result.term}</p>
      <div class="result-meta">
        <span>Division</span>
        <strong>${result.division}</strong>
      </div>
      <div class="result-actions">
        <span class="result-score">${formatPercent(result.percentage)}</span>
        <a href="result-view.html?id=${result.id}" class="btn btn-primary btn-sm">View Result</a>
      </div>
    </article>
  `).join("");
}

function renderResultDetail() {
  const container = document.getElementById("result-detail");

  if (!container) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const resultId = params.get("id") || ResultData[0].id;
  const result = ResultData.find((item) => item.id === resultId) || ResultData[0];

  container.innerHTML = `
    <span class="page-kicker">${result.className}</span>
    <div class="result-summary mt-3">
      <div>
        <h1 class="mb-1">${result.student}</h1>
        <p class="mb-0 text-muted">${result.term}</p>
      </div>
      <strong>${formatPercent(result.percentage)}</strong>
    </div>

    <div class="result-grades">
      ${result.subjects
        .map(
          (subject) => `
            <div class="grade-box">
              <small>${subject.name}</small>
              <strong>${subject.score}</strong>
            </div>
          `,
        )
        .join("")}
    </div>

    <div class="mt-4 p-4 border rounded-4 bg-light">
      <h3 class="h5 mb-2">Performance Summary</h3>
      <p class="mb-2"><strong>Division:</strong> ${result.division}</p>
      <p class="mb-0">${result.remarks}</p>
    </div>

    <div class="mt-4 d-flex gap-2 flex-wrap">
      <a href="result.html" class="btn btn-primary">Back to Results</a>
      <a href="index.html" class="btn btn-outline-primary">Back Home</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("footer-current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (document.getElementById("result-list")) {
    renderResultList();
  }

  if (document.getElementById("result-detail")) {
    renderResultDetail();
  }
});
