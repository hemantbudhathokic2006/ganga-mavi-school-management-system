/* ============================================================
   GANGA SECONDARY SCHOOL
   Multi-Source Auto-Failover Bilingual Language System
   English ↔ नेपाली

   File:
   frontend/assets/js/language.js

   कुनै अर्को page मा change गर्नु पर्दैन — यो एउटै फाइल सबै
   page मा already link भएकोले, यहाँ गरेको सुधार site भरि
   आफैं apply हुन्छ।

   TRANSLATION SOURCES (सबै FREE, कुनै API key चाहिँदैन):
   1. MyMemory           — fast, generous free quota, CORS-friendly
   2. Google (public)    — very fast, occasionally CORS/quota blocked
   3. Lingva Translate   — Google proxy, CORS-friendly, multiple mirrors
   4. LibreTranslate     — open-source, multiple public mirrors
   5. Local Dictionary   — instant, zero-network, guaranteed no-fail
                            for known school role/title words

   FAILOVER LOGIC:
   - हरेक text एउटा source बाट अर्को source मा क्रमशः try हुन्छ,
     timeout वा error भए तुरुन्तै next source मा जान्छ।
   - जुन source ले काम गर्‍यो, त्यो "healthy" source को रूपमा
     याद राखिन्छ (localStorage) र अर्को पटक त्यहीँबाट सुरु हुन्छ
     — यसले सामान्य अवस्थामा एकदम छिटो बनाउँछ।
   - कुनै source ले quota/limit दिन्छ भने, त्यो source लाई
     केही मिनेटको लागि "cooldown" मा राखिन्छ र आफैं अर्को
     source प्रयोग हुन्छ। Cooldown सकिएपछि फेरि auto-retry हुन्छ।
   - सबै network source fail भए पनि, local dictionary र
     translation cache ले known शब्दहरूलाई instant देखाउँछ,
     अनि बाँकी original English मा नै रहन्छ (site कहिल्यै break
     हुँदैन)।

   OPTIMIZATION (अघिकै जस्तै राखिएको):
   ✓ Mark DOM nodes as translated to avoid re-translation
   ✓ Cache entire translation result in localStorage
   ✓ English restoration is instant (no API, no DOM traversal)
   ✓ Second+ Nepali click uses cached state instantly
   ✓ MutationObserver only handles new content
   ✓ Batch translation requests, deduplicated

============================================================ */

(function () {
  "use strict";

  /* ==========================================================
     CONFIGURATION
  ========================================================== */

  const CONFIG = {
    defaultLanguage: "en",
    supportedLanguages: ["en", "ne", "np"],
    storageKey: "school-language",
    cacheKey: "school-translation-cache",
    sourceHealthKey: "school-translation-source-health",
    observeDynamicContent: true,
    mutationDelay: 800,
    requestDelay: 15,
    maxConcurrentTranslations: 4,
    maxTextLength: 5000,
    requestTimeout: 1500,
    maxCacheEntries: 2000,
    sourceCooldownMs: 5 * 60 * 1000, /* 5 min cooldown for a failing source */
    htmlLanguageAttribute: true,
    showLoadingIndicator: true,
    ignoredTags: [
      "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "SVG",
      "CANVAS", "VIDEO", "AUDIO", "IFRAME", "OBJECT", "EMBED", "TEMPLATE",
    ],
    ignoredClasses: [
      "no-translate", "notranslate", "language-switcher", "school-language-loader",
    ],
    ignoredIds: ["school-language-loader"],
  };

  /* ==========================================================
     LOCAL DICTIONARY
     Network पूर्ण असफल भएको बेला पनि यी शब्दहरू instant र
     सधैं सही देखिन्छन्। यहाँ जति शब्द थप्नुभयो, त्यति नै
     ढुक्क हुने ठाउँ बढ्छ। (केस-असंवेदनशील रूपमा match हुन्छ)
  ========================================================== */

  const LOCAL_DICTIONARY = {
    "head teacher": "प्रधानाध्यापक",
    "vice principal": "उप-प्रधानाध्यापक",
    "vice principal / coordinator": "उप-प्रधानाध्यापक / संयोजक",
    "principal": "प्रधानाध्यापक",
    "exam coordinator": "परीक्षा संयोजक",
    "accountant": "लेखापाल",
    "coordinator": "संयोजक",
    "member": "सदस्य",
    "chairperson": "अध्यक्ष",
    "vice chairperson": "उपाध्यक्ष",
    "member secretary": "सदस्य सचिव",
    "teacher representative": "शिक्षक प्रतिनिधि",
    "management": "व्यवस्थापन",
    "leadership": "नेतृत्व",
    "administration": "प्रशासन",
    "academic": "शैक्षिक",
    "coordination": "समन्वय",
    "examination": "परीक्षा",
    "finance": "वित्त",
    "accounts": "लेखा",
    "higher secondary": "उच्च माध्यमिक",
    "secondary": "माध्यमिक",
    "basic level": "आधारभूत तह",
    "primary": "प्राथमिक",
    "school support": "विद्यालय सहयोग",
    "our team": "हाम्रो टिम",
    "our people": "हाम्रा मानिसहरू",
    "school administration": "विद्यालय प्रशासन",
    "school management committee": "विद्यालय व्यवस्थापन समिति",
    "parent teacher association": "अभिभावक शिक्षक संघ",
    "our faculty": "हाम्रो संकाय",
    "governing body": "सञ्चालक निकाय",
    "academic team": "शैक्षिक टिम",
    "parents & teachers": "अभिभावक र शिक्षक",
    "home": "गृहपृष्ठ",
    "about": "बारेमा",
    "academics": "शैक्षिक कार्यक्रम",
    "admissions": "भर्ना",
    "student life": "विद्यार्थी जीवन",
    "resources": "स्रोतहरू",
    "faculty": "संकाय",
    "team": "टिम",
    "contact": "सम्पर्क",
    "news": "समाचार",
    "events": "कार्यक्रमहरू",
    "gallery": "ग्यालरी",
    "downloads": "डाउनलोडहरू",
    "results": "नतिजाहरू",
  };

  function getLocalTranslation(text) {
    const key = text.trim().toLowerCase();
    return LOCAL_DICTIONARY[key] || null;
  }

  /* ==========================================================
     TRANSLATION SOURCES
     प्राथमिकताक्रममा राखिएको — माथिबाट तल क्रमशः try हुन्छ।
  ========================================================== */

  const SOURCES = [
    {
      id: "mymemory",
      name: "MyMemory",
      translate: translateWithMyMemory,
    },
    {
      id: "google",
      name: "Google (public)",
      translate: translateWithGoogle,
    },
    {
      id: "lingva-1",
      name: "Lingva (lingva.ml)",
      translate: (text, source, target) => translateWithLingva(text, source, target, "https://lingva.ml"),
    },
    {
      id: "lingva-2",
      name: "Lingva (translate.plausibility.cloud)",
      translate: (text, source, target) => translateWithLingva(text, source, target, "https://translate.plausibility.cloud"),
    },
    {
      id: "libretranslate-1",
      name: "LibreTranslate (de)",
      translate: (text, source, target) => translateWithLibre(text, source, target, "https://libretranslate.de"),
    },
    {
      id: "libretranslate-2",
      name: "LibreTranslate (argos)",
      translate: (text, source, target) => translateWithLibre(text, source, target, "https://translate.argosopentech.com"),
    },
  ];

  /* ==========================================================
     SOURCE HEALTH TRACKING
     कुन source अहिले काम गर्दैछ भन्ने याद राख्ने, ताकि हरेक
     translation मा सबै source फेरि-फेरि try नगरियोस्।
  ========================================================== */

  function getSourceHealth() {
    try {
      const stored = localStorage.getItem(CONFIG.sourceHealthKey);
      const parsed = stored ? JSON.parse(stored) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function saveSourceHealth(health) {
    try {
      localStorage.setItem(CONFIG.sourceHealthKey, JSON.stringify(health));
    } catch (error) {
      /* storage full or unavailable — ignore, not critical */
    }
  }

  function markSourceCooldown(sourceId) {
    const health = getSourceHealth();
    health[sourceId] = Date.now() + CONFIG.sourceCooldownMs;
    saveSourceHealth(health);
  }

  function isSourceOnCooldown(sourceId) {
    const health = getSourceHealth();
    const until = health[sourceId];
    return typeof until === "number" && Date.now() < until;
  }

  function markSourceHealthy(sourceId) {
    const health = getSourceHealth();
    if (health[sourceId]) {
      delete health[sourceId];
      saveSourceHealth(health);
    }
  }

  /*
   * Ordered list of sources to try right now:
   * cooldown मा नभएका source हरू पहिले, त्यसपछि cooldown
   * भएकाहरू पनि (अन्तिम उपाय — केही भन्दा नहुनु भन्दा राम्रो)।
   */
  function getOrderedSources() {
    return SOURCES.filter((source) => !isSourceOnCooldown(source.id));
  }

  /* ==========================================================
     FETCH WITH TIMEOUT (helper)
  ========================================================== */

  async function fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.requestTimeout);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /* ==========================================================
     SOURCE #1 — MyMemory
     Free, no key, generous anonymous daily quota, CORS-enabled.
  ========================================================== */

  async function translateWithMyMemory(text, source, target) {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", text);
    url.searchParams.set("langpair", `${source}|${target}`);

    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`MyMemory HTTP ${response.status}`);
    }

    const data = await response.json();

    /* Quota exceeded shows up as a 200 with a warning in responseDetails */
    const details = (data && data.responseDetails ? String(data.responseDetails) : "").toUpperCase();
    if (details.includes("QUOTA") || details.includes("LIMIT")) {
      throw new Error("MyMemory quota exceeded");
    }

    const translated = data && data.responseData && typeof data.responseData.translatedText === "string"
      ? data.responseData.translatedText.trim()
      : "";

    if (!translated) {
      throw new Error("MyMemory returned empty text");
    }

    return translated;
  }

  /* ==========================================================
     SOURCE #2 — Google Translate (public endpoint)
     Very fast, unofficial — occasionally CORS/quota blocked
     from some networks, hence used with fallback below it.
  ========================================================== */

  async function translateWithGoogle(text, source, target) {
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", source);
    url.searchParams.set("tl", target);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", text);

    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Google HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error("Google response invalid");
    }

    const translated = data[0]
      .map((entry) => (Array.isArray(entry) && typeof entry[0] === "string" ? entry[0] : ""))
      .join("")
      .trim();

    if (!translated) {
      throw new Error("Google returned empty text");
    }

    return translated;
  }

  /* ==========================================================
     SOURCE #3 — Lingva Translate (Google proxy, CORS-friendly)
  ========================================================== */

  async function translateWithLingva(text, source, target, baseUrl) {
    const encoded = encodeURIComponent(text);
    const url = `${baseUrl}/api/v1/${source}/${target}/${encoded}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Lingva HTTP ${response.status}`);
    }

    const data = await response.json();
    const translated = data && typeof data.translation === "string" ? data.translation.trim() : "";

    if (!translated) {
      throw new Error("Lingva returned empty text");
    }

    return translated;
  }

  /* ==========================================================
     SOURCE #4 — LibreTranslate (open-source public mirrors)
  ========================================================== */

  async function translateWithLibre(text, source, target, baseUrl) {
    const response = await fetchWithTimeout(`${baseUrl}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: source,
        target: target,
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`LibreTranslate HTTP ${response.status}`);
    }

    const data = await response.json();
    const translated = data && typeof data.translatedText === "string" ? data.translatedText.trim() : "";

    if (!translated) {
      throw new Error("LibreTranslate returned empty text");
    }

    return translated;
  }

  /* ==========================================================
     INTERNAL STATE
  ========================================================== */

  let currentLanguage = getLanguage();
  let isTranslating = false;
  let translationVersion = 0;
  let observer = null;
  let mutationTimer = null;
  let nodeCounter = 0;

  /* WeakMap: stores original English text for each node */
  const originalTexts = new WeakMap();

  /* WeakMap: stores original element attributes */
  const originalAttributes = new WeakMap();

  /* WeakMap: stores unique ID for each translatable node */
  const nodeIds = new WeakMap();

  /* Set: tracks which nodes have been translated to Nepali in this session */
  const translatedNodes = new Set();

  /* Map: prevents duplicate simultaneous requests for the same text */
  const activeTranslations = new Map();

  /* ==========================================================
     LANGUAGE
  ========================================================== */

  function normalizeLanguageCode(language) {
    if (!language) {
      return CONFIG.defaultLanguage;
    }

    if (language === "np" || language === "ne") {
      return "ne";
    }

    return "en";
  }

  function getLanguage() {
    const savedLanguage = localStorage.getItem(CONFIG.storageKey);
    const normalized = normalizeLanguageCode(savedLanguage);
    return normalized === "en" || normalized === "ne" ? normalized : CONFIG.defaultLanguage;
  }

  function setLanguage(language) {
    const normalizedLanguage = normalizeLanguageCode(language);

    if (!CONFIG.supportedLanguages.includes(normalizedLanguage)) {
      console.warn(`[SchoolLanguage] Unsupported language: ${language}`);
      return;
    }

    if (normalizedLanguage === currentLanguage && !isTranslating) {
      updateLanguageButtons(normalizedLanguage);
      return;
    }

    currentLanguage = normalizedLanguage;
    localStorage.setItem(CONFIG.storageKey, normalizedLanguage);
    updateLanguageButtons(normalizedLanguage);
    translatePage(normalizedLanguage, ++translationVersion);
  }

  /* ==========================================================
     TRANSLATION CACHE (persists across sessions — instant reuse)
  ========================================================== */

  function getCache() {
    try {
      const stored = localStorage.getItem(CONFIG.cacheKey);
      if (!stored) return {};
      const cache = JSON.parse(stored);
      return cache && typeof cache === "object" ? cache : {};
    } catch (error) {
      console.warn("[SchoolLanguage] Cache read failed:", error);
      return {};
    }
  }

  function saveCache(cache) {
    try {
      const keys = Object.keys(cache);
      if (keys.length > CONFIG.maxCacheEntries) {
        const excess = keys.length - CONFIG.maxCacheEntries;
        keys.slice(0, excess).forEach((key) => delete cache[key]);
      }
      localStorage.setItem(CONFIG.cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.warn("[SchoolLanguage] Cache save failed:", error);
    }
  }

  function createCacheKey(text, source, target) {
    return `${source}:${target}:${text}`;
  }

  function getCachedTranslation(text, source, target) {
    const cache = getCache();
    return cache[createCacheKey(text, source, target)] || null;
  }

  function cacheTranslation(text, source, target, translatedText) {
    const cache = getCache();
    cache[createCacheKey(text, source, target)] = translatedText;
    saveCache(cache);
  }

  /* ==========================================================
     ORIGINAL TEXT / ATTRIBUTES
  ========================================================== */

  function rememberOriginalText(node) {
    if (!originalTexts.has(node)) {
      originalTexts.set(node, node.nodeValue);
    }
  }

  function rememberOriginalAttribute(element, attribute) {
    if (!originalAttributes.has(element)) {
      originalAttributes.set(element, {});
    }
    const data = originalAttributes.get(element);
    if (!Object.prototype.hasOwnProperty.call(data, attribute)) {
      data[attribute] = element.getAttribute(attribute);
    }
  }

  /* ==========================================================
     ELEMENT / TEXT FILTERS
  ========================================================== */

  function shouldIgnoreElement(element) {
    if (!element) return true;

    let current = element;

    while (current && current !== document.body) {
      if (CONFIG.ignoredTags.includes(current.tagName)) return true;
      if (current.id && CONFIG.ignoredIds.includes(current.id)) return true;

      if (current.classList) {
        for (const className of CONFIG.ignoredClasses) {
          if (current.classList.contains(className)) return true;
        }
      }

      current = current.parentElement;
    }

    try {
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return true;
    } catch (error) {
      /* ignore style-check errors */
    }

    return false;
  }

  function shouldTranslateText(text) {
    if (typeof text !== "string") return false;

    const clean = text.trim();

    if (!clean) return false;
    if (clean.length < 2) return false;
    if (/^https?:\/\//i.test(clean)) return false;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return false;
    if (/^[\d\s.,:/+\-%()]+$/.test(clean)) return false;
    if (/^[A-Za-z]:\\/.test(clean)) return false;

    return true;
  }

  function containsNepali(text) {
    return /[\u0900-\u097F]/.test(text);
  }

  function getOrCreateNodeId(node) {
    if (!nodeIds.has(node)) {
      nodeIds.set(node, `node_${++nodeCounter}`);
    }
    return nodeIds.get(node);
  }

  /* ==========================================================
     COLLECT TEXT NODES
  ========================================================== */

  function collectTextNodes(onlyUntranslated = false) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!parent || shouldIgnoreElement(parent)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (!shouldTranslateText(node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (onlyUntranslated) {
          const nodeId = getOrCreateNodeId(node);
          if (translatedNodes.has(nodeId)) {
            return NodeFilter.FILTER_REJECT;
          }
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    return nodes;
  }

  /* ==========================================================
     CORE TRANSLATION — tries every source in order, then the
     local dictionary, before finally giving up and returning
     the original text unchanged (site never breaks).
  ========================================================== */

  async function translateText(text, source, target) {
    const clean = text.trim();

    if (source === target) return clean;

    const cached = getCachedTranslation(clean, source, target);
    if (cached) return cached;

    const localMatch = target === "ne" ? getLocalTranslation(clean) : null;
    if (localMatch) {
      cacheTranslation(clean, source, target, localMatch);
      return localMatch;
    }

    const requestKey = createCacheKey(clean, source, target);

    if (activeTranslations.has(requestKey)) {
      return activeTranslations.get(requestKey);
    }

    const requestPromise = (async function () {
      if (clean.length > CONFIG.maxTextLength) {
        console.warn("[SchoolLanguage] Text too long, skipping:", clean.substring(0, 80));
        return clean;
      }

      const orderedSources = getOrderedSources();

      for (const src of orderedSources) {
        try {
          const translated = await src.translate(clean, source, target);

          markSourceHealthy(src.id);
          cacheTranslation(clean, source, target, translated);

          return translated;
        } catch (error) {
          console.warn(`[SchoolLanguage] Source "${src.name}" failed, trying next source.`, error && error.message ? error.message : error);
          markSourceCooldown(src.id);
          /* continue to next source automatically */
        }
      }

      /* All network sources failed — fall back to local dictionary */
      const localMatch = getLocalTranslation(clean);
      if (localMatch) {
        console.log("[SchoolLanguage] All network sources unavailable — used local dictionary.");
        cacheTranslation(clean, source, target, localMatch);
        return localMatch;
      }

      /* Nothing worked — keep original text so the page never breaks */
      console.warn("[SchoolLanguage] All translation sources unavailable for:", clean.substring(0, 60));
      return clean;
    })();

    activeTranslations.set(requestKey, requestPromise);

    try {
      return await requestPromise;
    } finally {
      activeTranslations.delete(requestKey);
    }
  }

  /* ==========================================================
     TRANSLATE TEXT NODES (batched, deduplicated)
  ========================================================== */

  async function translateNodes(nodes, source, target, requestVersion) {
    if (!nodes || !nodes.length) return;

    console.log(`[SchoolLanguage] Translating ${nodes.length} nodes to ${target}...`);

    const textsToTranslate = [];
    const nodeMap = new Map();

    for (const node of nodes) {
      if (requestVersion !== translationVersion) return;

      if (!node.isConnected) continue;

      const parent = node.parentElement;
      if (!parent || shouldIgnoreElement(parent)) continue;

      rememberOriginalText(node);
      const original = originalTexts.get(node);

      if (typeof original !== "string") continue;

      const clean = original.trim();
      if (!shouldTranslateText(clean)) continue;

      if (target === "ne" && containsNepali(clean)) continue;

      if (target === "en") {
        node.nodeValue = original;
        const nodeId = getOrCreateNodeId(node);
        translatedNodes.delete(nodeId);
        continue;
      }

      if (!nodeMap.has(clean)) {
        nodeMap.set(clean, []);
        textsToTranslate.push(clean);
      }
      nodeMap.get(clean).push(node);
    }

    const translations = new Map();

    let nextTextIndex = 0;
    const workerCount = Math.min(CONFIG.maxConcurrentTranslations, textsToTranslate.length);

    async function translateNext() {
      while (requestVersion === translationVersion) {
        const textIndex = nextTextIndex++;
        if (textIndex >= textsToTranslate.length) return;

        const text = textsToTranslate[textIndex];
        const cached = getCachedTranslation(text, source, target);
        const translated = cached || await translateText(text, source, target);

        if (requestVersion !== translationVersion) return;

        translations.set(text, translated);
        await delay(CONFIG.requestDelay);
      }
    }

    await Promise.all(Array.from({ length: workerCount }, translateNext));

    for (const [originalText, translatedText] of translations) {
      if (requestVersion !== translationVersion) return;

      const nodesForText = nodeMap.get(originalText) || [];

      for (const node of nodesForText) {
        if (target === "ne" && translatedText && translatedText !== originalText) {
          const leading = originalText.match(/^\s*/)?.[0] || "";
          const trailing = originalText.match(/\s*$/)?.[0] || "";
          node.nodeValue = leading + translatedText + trailing;

          const nodeId = getOrCreateNodeId(node);
          translatedNodes.add(nodeId);
        }
      }
    }

    console.log(`[SchoolLanguage] Translation complete. ${translatedNodes.size} nodes marked as translated.`);
  }

  /* ==========================================================
     TRANSLATE ATTRIBUTES
  ========================================================== */

  async function translateAttributes(language, onlyUntranslated = false, requestVersion) {
    const elements = document.querySelectorAll("input, textarea, button, [placeholder], [title], [aria-label]");

    let translated = 0;

    for (const element of elements) {
      if (requestVersion !== translationVersion) return;

      if (shouldIgnoreElement(element)) continue;

      const nodeId = getOrCreateNodeId(element);
      const isElementTranslated = translatedNodes.has(nodeId);

      if (onlyUntranslated && isElementTranslated) continue;

      for (const attribute of ["placeholder", "title", "aria-label"]) {
        if (!element.hasAttribute(attribute)) continue;

        rememberOriginalAttribute(element, attribute);
        const data = originalAttributes.get(element);
        const original = data[attribute];

        if (!original || !shouldTranslateText(original)) continue;

        if (language === "ne") {
          const translatedText = await translateText(original, "en", "ne");

          if (attribute === "aria-label") {
            element.setAttribute("aria-label", translatedText);
          } else {
            element[attribute] = translatedText;
          }

          translatedNodes.add(nodeId);
          translated++;
        } else if (attribute === "aria-label") {
          element.setAttribute("aria-label", original);
        } else {
          element[attribute] = original;
        }
      }

      await delay(CONFIG.requestDelay);
    }

    if (translated > 0) {
      console.log(`[SchoolLanguage] Translated ${translated} element attributes`);
    }
  }

  /* ==========================================================
     MAIN TRANSLATION
  ========================================================== */

  async function translatePage(language, requestVersion = ++translationVersion) {
    isTranslating = true;
    showLoading(language);

    try {
      if (language === "en") {
        console.log("[SchoolLanguage] Switching to English (instant restore)");

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;

        while ((node = walker.nextNode())) {
          if (originalTexts.has(node)) {
            node.nodeValue = originalTexts.get(node);
          }
        }

        translatedNodes.clear();

        document.querySelectorAll("*").forEach((element) => {
          const data = originalAttributes.get(element);
          if (data) {
            Object.keys(data).forEach((attribute) => {
              const originalValue = data[attribute];
              if (originalValue === null) {
                element.removeAttribute(attribute);
              } else {
                element.setAttribute(attribute, originalValue);
              }
            });
          }
        });

        if (CONFIG.htmlLanguageAttribute) {
          document.documentElement.lang = "en";
        }

        updateLanguageButtons("en");
        return;
      }

      if (language === "ne") {
        console.log("[SchoolLanguage] Switching to Nepali");

        const nodes = collectTextNodes(true);

        if (nodes.length === 0) {
          console.log("[SchoolLanguage] All content already translated to Nepali, applying instantly");
        } else {
          console.log(`[SchoolLanguage] Found ${nodes.length} untranslated nodes, translating...`);
          await translateNodes(nodes, "en", "ne", requestVersion);
          await translateAttributes("ne", true, requestVersion);
        }

        if (requestVersion !== translationVersion) return;

        if (CONFIG.htmlLanguageAttribute) {
          document.documentElement.lang = "ne";
        }

        updateLanguageButtons("ne");
      }
    } catch (error) {
      console.error("[SchoolLanguage] Page translation error:", error);
    } finally {
      if (requestVersion === translationVersion) {
        isTranslating = false;
        hideLoading();
        dispatchLanguageEvent(language);
      }
    }
  }

  /* ==========================================================
     DYNAMIC CONTENT (MutationObserver — only new nodes)
  ========================================================== */

  function setupMutationObserver() {
    if (!CONFIG.observeDynamicContent || !window.MutationObserver) return;

    observer = new MutationObserver(function (mutations) {
      if (currentLanguage !== "ne") return;

      let hasNewContent = false;
      const newNodes = [];

      for (const mutation of mutations) {
        if (!mutation.addedNodes || mutation.addedNodes.length === 0) continue;

        for (const addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === Node.TEXT_NODE) {
            if (shouldTranslateText(addedNode.nodeValue)) {
              newNodes.push(addedNode);
              hasNewContent = true;
            }
          } else if (addedNode.nodeType === Node.ELEMENT_NODE) {
            const walker = document.createTreeWalker(addedNode, NodeFilter.SHOW_TEXT, {
              acceptNode(node) {
                if (shouldIgnoreElement(node.parentElement)) return NodeFilter.FILTER_REJECT;
                return shouldTranslateText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
              },
            });

            let node;
            while ((node = walker.nextNode())) {
              newNodes.push(node);
              hasNewContent = true;
            }
          }
        }
      }

      if (!hasNewContent || newNodes.length === 0) return;

      console.log(`[SchoolLanguage] MutationObserver: Found ${newNodes.length} new nodes to translate`);

      clearTimeout(mutationTimer);

      mutationTimer = setTimeout(async function () {
        if (!isTranslating && currentLanguage === "ne") {
          try {
            await translateNodes(newNodes, "en", "ne", translationVersion);
          } catch (error) {
            console.error("[SchoolLanguage] Error translating new content:", error);
          }
        }
      }, CONFIG.mutationDelay);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log("[SchoolLanguage] MutationObserver started");
  }

  /* ==========================================================
     LANGUAGE BUTTONS
  ========================================================== */

  function updateLanguageButtons(language) {
    const normalizedLanguage = normalizeLanguageCode(language);

    document.querySelectorAll("[data-lang]").forEach((button) => {
      const buttonLanguage = normalizeLanguageCode(button.getAttribute("data-lang"));
      const active = buttonLanguage === normalizedLanguage;

      button.classList.toggle("active", active);
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setupLanguageButtons() {
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-lang]");
      if (!button) return;

      setLanguage(button.getAttribute("data-lang"));
    });
  }

  /* ==========================================================
     LOADING INDICATOR
  ========================================================== */

  function showLoading(language) {
    if (!CONFIG.showLoadingIndicator) return;

    let loader = document.getElementById("school-language-loader");

    if (!loader) {
      loader = document.createElement("div");
      loader.id = "school-language-loader";
      loader.className = "school-language-loader no-translate";
      loader.style.position = "fixed";
      loader.style.top = "20px";
      loader.style.right = "20px";
      loader.style.zIndex = "999999";
      loader.style.padding = "10px 16px";
      loader.style.borderRadius = "10px";
      loader.style.background = "rgba(0,0,0,.85)";
      loader.style.color = "#fff";
      loader.style.fontSize = "14px";
      loader.style.fontFamily = "system-ui, sans-serif";
      loader.style.boxShadow = "0 5px 20px rgba(0,0,0,.2)";
      loader.style.transition = "opacity .2s ease";
      document.body.appendChild(loader);
    }

    loader.textContent = language === "ne" ? "नेपालीमा परिवर्तन हुँदैछ..." : "Switching to English...";
    loader.style.display = "block";
  }

  function hideLoading() {
    const loader = document.getElementById("school-language-loader");
    if (loader) loader.style.display = "none";
  }

  function dispatchLanguageEvent(language) {
    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: language } }));
  }

  function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /* ==========================================================
     PUBLIC API
  ========================================================== */

  window.SchoolLanguage = {
    set: setLanguage,
    get: getLanguage,
    refresh: function () {
      translatePage(getLanguage());
    },
    clearCache: function () {
      localStorage.removeItem(CONFIG.cacheKey);
      console.log("[SchoolLanguage] Translation cache cleared.");
    },
    resetSourceHealth: function () {
      localStorage.removeItem(CONFIG.sourceHealthKey);
      console.log("[SchoolLanguage] Source health reset — all sources will be retried from the top.");
    },
    config: CONFIG,
  };

  /* ==========================================================
     INITIALIZATION
  ========================================================== */

  function initLanguageSystem() {
    currentLanguage = getLanguage();

    setupLanguageButtons();

    if (currentLanguage === "en") {
      if (CONFIG.htmlLanguageAttribute) {
        document.documentElement.lang = "en";
      }
      updateLanguageButtons("en");
    }

    if (currentLanguage === "ne") {
      translatePage("ne");
    }

    setupMutationObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageSystem);
  } else {
    initLanguageSystem();
  }
})();
