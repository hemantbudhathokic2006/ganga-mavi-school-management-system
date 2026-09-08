"use strict";

const {
  TranslationServiceClient,
} = require("@google-cloud/translate");

const PROJECT_ID =
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GOOGLE_PROJECT_ID;

async function testTranslation() {
  try {
    if (!PROJECT_ID) {
      throw new Error(
        "Google Cloud Project ID is not configured."
      );
    }

    const client =
      new TranslationServiceClient();

    const request = {
      parent:
        `projects/${PROJECT_ID}/locations/global`,

      contents: [
        "Welcome to Ganga Secondary School",
      ],

      mimeType: "text/plain",

      sourceLanguageCode: "en",

      targetLanguageCode: "ne",
    };

    const [
      response,
    ] = await client.translateText(request);

    console.log(
      "\n✅ Google Cloud Translation is working!\n"
    );

    console.log(
      "Original:",
      request.contents[0]
    );

    console.log(
      "Translated:",
      response.translations[0].translatedText
    );

  } catch (error) {

    console.error(
      "\n❌ Google Translation test failed.\n"
    );

    console.error(
      error.message
    );
  }
}

testTranslation();