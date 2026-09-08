/*==========================================================
        GANGA MA.VI
        STUDENT FEE PAYMENT ROUTES
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

const {
  create,

  getAll,

  getById,

  update,

  remove,

  count,
} = require("../controllers/studentFeePaymentController");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {
  createStudentFeePaymentValidator,

  updateStudentFeePaymentValidator,
} = require("../validators/studentFeePaymentValidator");

/*==========================================================
        IMPORT MIDDLEWARE
==========================================================*/

const { authenticate } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

/*==========================================================
        ROUTES
==========================================================*/

router.post(
  "/",

  authenticate,

  authorize("Admin"),

  createStudentFeePaymentValidator,

  create,
);

router.get(
  "/",

  authenticate,

  getAll,
);

router.get(
  "/count",

  authenticate,

  count,
);

router.get(
  "/:id",

  authenticate,

  getById,
);

router.put(
  "/:id",

  authenticate,

  authorize("Admin"),

  updateStudentFeePaymentValidator,

  update,
);

router.delete(
  "/:id",

  authenticate,

  authorize("Admin"),

  remove,
);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;
