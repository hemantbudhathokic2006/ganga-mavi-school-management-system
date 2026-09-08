/**
 * ============================================================
 * GANGA SECONDARY SCHOOL
 * Shared HTML Component Include System
 * File: assets/js/include.js
 * ============================================================
 *
 * RESPONSIBILITY
 * ------------------------------------------------------------
 * This file is responsible ONLY for loading shared HTML
 * components into pages.
 *
 * Components:
 * - navbar.html
 * - footer.html
 * - loader.html
 * - chatbot.html (when requested by the page)
 *
 * UI behavior is handled separately by:
 * - components.js
 * - main.js
 *
 * ============================================================
 */

"use strict";

const INCLUDE_CONFIG = Object.freeze({
  componentDirectory: "components",
  components: Object.freeze({
    navbar: "navbar.html",
    footer: "footer.html",
    loader: "loader.html",
    chatbot: "chatbot.html",
  }),
});

function getFrontendRoot() {
  const currentScript = document.currentScript;

  if (!currentScript || !currentScript.src) {
    return new URL("../../", window.location.href);
  }

  const scriptURL = new URL(currentScript.src, window.location.href);
  return new URL("../../", scriptURL);
}

function getComponentURL(componentFile) {
  const frontendRoot = getFrontendRoot();
  return new URL(
    `${INCLUDE_CONFIG.componentDirectory}/${componentFile}`,
    frontendRoot,
  ).href;
}

async function fetchComponent(componentFile) {
  if (!componentFile) {
    throw new Error("[Include] Component filename is missing.");
  }

  const componentURL = getComponentURL(componentFile);
  const response = await fetch(componentURL, {
    method: "GET",
    headers: { Accept: "text/html" },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(
      `[Include] Failed to load ${componentFile}: ${response.status} ${response.statusText}`,
    );
  }

  const content = await response.text();

  if (!content.trim()) {
    throw new Error(`[Include] ${componentFile} returned empty content.`);
  }

  return content;
}

async function injectComponent(container, componentFile, componentName) {
  if (!container) {
    return false;
  }

  container.setAttribute("data-component-state", "loading");

  try {
    const content = await fetchComponent(componentFile);
    container.innerHTML = content;
    container.setAttribute("data-component-state", "loaded");
    container.setAttribute("data-component-loaded", "true");
    container.removeAttribute("data-component-error");

    document.dispatchEvent(
      new CustomEvent("component:loaded", {
        detail: { name: componentName, element: container },
      }),
    );

    return true;
  } catch (error) {
    console.error(`[Include] ${componentName} component error:`, error);
    container.setAttribute("data-component-state", "error");
    container.setAttribute("data-component-error", "true");
    renderComponentError(container, componentName);
    return false;
  }
}

function renderComponentError(container, componentName) {
  const readableName = componentName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  container.innerHTML = `
        <div class="component-error" role="alert" aria-label="${readableName} component error">
            <span class="component-error-icon" aria-hidden="true">
                <i class="bi bi-exclamation-circle"></i>
            </span>
            <span class="component-error-text">
                ${readableName} could not be loaded.
            </span>
        </div>
    `;
}

function getComponentContainers() {
  return document.querySelectorAll("[data-component]");
}

function getComponentFile(componentName) {
  return INCLUDE_CONFIG.components[componentName] || null;
}

async function loadComponents() {
  const containers = getComponentContainers();

  await Promise.all(
    Array.from(containers).map((container) => {
      const componentName = container.dataset.component;
      const componentFile = getComponentFile(componentName);

      if (!componentFile) {
        return false;
      }

      return injectComponent(container, componentFile, componentName);
    }),
  );
}

window.GangaComponents = {
  load: loadComponents,
  loadComponent: injectComponent,
  getComponentURL,
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadComponents, { once: true });
} else {
  loadComponents();
}
