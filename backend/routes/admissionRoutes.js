/*==========================================================
        GANGA MA.VI
        ADMISSION ROUTES
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const express = require("express");

const router = express.Router();

/*==========================================================
        IMPORT CONTROLLER
==========================================================*/

const AdmissionController = require("../controllers/admissionController");

/*==========================================================
        IMPORT MIDDLEWARE
==========================================================*/

const { authenticate } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const { upload } = require("../middleware/uploadMiddleware");

/*==========================================================
        PUBLIC ROUTES
==========================================================*/

router.post(
  "/",

  upload.fields([
    {
      name: "profile_photo",

      maxCount: 1,
    },

    {
      name: "birth_certificate",

      maxCount: 1,
    },

    {
      name: "transfer_certificate",

      maxCount: 1,
    },

    {
      name: "marksheet",

      maxCount: 1,
    },
  ]),

  AdmissionController.createAdmission,
);

/*==========================================================
        PROTECTED ROUTES
==========================================================*/

router.get(
  "/",

  authenticate,

  authorize(
    "Admin",

    "Principal",
  ),

  AdmissionController.getAllAdmissions,
);

router.get(
  "/:id",

  authenticate,

  authorize(
    "Admin",

    "Principal",
  ),

  AdmissionController.getAdmissionById,
);

router.put(
  "/:id",

  authenticate,

  authorize("Admin"),

  AdmissionController.updateAdmission,
);

router.patch(
  "/:id/approve",

  authenticate,

  authorize(
    "Admin",

    "Principal",
  ),

  AdmissionController.approveAdmission,
);

router.patch(
  "/:id/reject",

  authenticate,

  authorize(
    "Admin",

    "Principal",
  ),

  AdmissionController.rejectAdmission,
);

router.delete(
  "/:id",

  authenticate,

  authorize("Admin"),

  AdmissionController.deleteAdmission,
);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;
