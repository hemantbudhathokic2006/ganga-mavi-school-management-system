javascript
/* ============================================================
   GANGA SECONDARY SCHOOL
   Hybrid Translation API

   Priority:
   1. Google Cloud Translation
   2. LibreTranslate fallback

   File:
   backend/routes/translate.js
============================================================ */

"use strict";

const express = require("express");

const router = express.Router();

const MAX_TEXT_LENGTH = 5000;

const SUPPORTED_LANGUAGES = ["en", "ne", "np"];

function normalizeLanguageCode(language) {
  if (!language) {
    return "en";
  }

  if (language === "np") {
    return "ne";
  }

  if (language === "ne") {
    return "ne";
  }

  return "en";
}

async function translateWithPublicGoogle(text, source, target) {
  const sourceCode = normalizeLanguageCode(source);
  const targetCode = normalizeLanguageCode(target);

  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
    "&sl=" + encodeURIComponent(sourceCode) +
    "&tl=" + encodeURIComponent(targetCode) +
    "&dt=t" +
    "&q=" + encodeURIComponent(text);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Google public translation request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
    throw new Error("Google public translation response was invalid.");
  }

  const translatedText = data[0]
    .map((item) => (Array.isArray(item) && item[0] ? item[0] : ""))
    .join("");

  if (!translatedText.trim()) {
    throw new Error("Google public translation returned empty text.");
  }

  return {
    text: translatedText,
    provider: "google-public",
  };
}

async function translateText(text, source, target) {
  const safeSource = normalizeLanguageCode(source);
  const safeTarget = normalizeLanguageCode(target);

  if (safeSource === safeTarget) {
    return {
      text,
      provider: "none",
    };
  }

  try {
    console.log("[Translation] Trying public Google Translate...");
    const result = await translateWithPublicGoogle(text, safeSource, safeTarget);
    console.log("[Translation] Public Google Translate success.");
    return result;
  } catch (error) {
    console.error("[Translation] Public translation failed.", error);
    throw new Error("Translation service is temporarily unavailable.");
========================================================== */

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        text,
        source,
        target,
      } = req.body;


      /* -----------------------------------------------
         Validate text
      ------------------------------------------------ */

      if (
        typeof text !==
          "string" ||
        !text.trim()
      ) {

        return res
          .status(400)
          .json({

            error:
              "Translation text is required.",
          });
      }


      if (
        text.length >
        MAX_TEXT_LENGTH
      ) {

        return res
          .status(400)
          .json({

            error:
              "Text is too long for translation.",
          });
      }


      /* -----------------------------------------------
         Validate languages
      ------------------------------------------------ */

      const normalizedSource = normalizeLanguageCode(source);
      const normalizedTarget = normalizeLanguageCode(target);

      if (
        !SUPPORTED_LANGUAGES.includes(
          normalizedSource
        )
      ) {

        return res
          .status(400)
          .json({

            error:
              "Unsupported source language.",
          });
      }


      if (
        !SUPPORTED_LANGUAGES.includes(
          normalizedTarget
        )
      ) {

        return res
          .status(400)
          .json({

            error:
              "Unsupported target language.",
          });
      }


      /* -----------------------------------------------
         Same language
      ------------------------------------------------ */

      if (
        normalizedSource === normalizedTarget
      ) {

        return res.json({

          translatedText:
            text,

          provider:
            "none",
        });
      }


      /* -----------------------------------------------
         Translate
      ------------------------------------------------ */

      const result =
        await translateText(
          text,
          normalizedSource,
          normalizedTarget
        );


      /* -----------------------------------------------
         Success
      ------------------------------------------------ */

      return res.json({

        translatedText:
          result.text,

        provider:
          result.provider,
      });


    } catch (error) {

      console.error(
        "[Translation Route]",
        error
      );


      return res
        .status(503)
        .json({

          error:
            "Translation service is temporarily unavailable.",
        });
    }
  }
);


/* ==========================================================
   EXPORT
========================================================== */

module.exports =
  router;

