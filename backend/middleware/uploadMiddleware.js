/*==========================================================
        GANGA MA.VI
        UPLOAD MIDDLEWARE
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const multer = require("multer");

const path = require("path");

const fs = require("fs");

/*==========================================================
        CREATE UPLOAD DIRECTORY
==========================================================*/

const uploadPath = path.join(
  __dirname,

  "../uploads",
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(
    uploadPath,

    {
      recursive: true,
    },
  );
}

/*==========================================================
        STORAGE CONFIGURATION
==========================================================*/

const storage = multer.diskStorage({
  destination: (
    request,

    file,

    callback,
  ) => {
    callback(
      null,

      uploadPath,
    );
  },

  filename: (
    request,

    file,

    callback,
  ) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 100000) +
      path.extname(file.originalname);

    callback(
      null,

      uniqueName,
    );
  },
});

/*==========================================================
        FILE FILTER
==========================================================*/

const fileFilter = (
  request,

  file,

  callback,
) => {
  const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(extension)) {
    callback(
      null,

      true,
    );
  } else {
    callback(new Error("Only JPG, PNG and PDF files are allowed."));
  }
};

/*==========================================================
        MULTER CONFIGURATION
==========================================================*/

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  upload,
};
