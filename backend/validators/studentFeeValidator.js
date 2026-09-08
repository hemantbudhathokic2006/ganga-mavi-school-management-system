/*==========================================================
        GANGA MA.VI
        STUDENT FEE VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const { body } = require("express-validator");

/*==========================================================
        CREATE STUDENT FEE VALIDATION
==========================================================*/

const createStudentFeeValidator = [
  body("student_id")
    .notEmpty()

    .withMessage("Student Is Required")

    .isInt({ min: 1 })

    .withMessage("Invalid Student"),

  body("fee_category_id")
    .notEmpty()

    .withMessage("Fee Category Is Required")

    .isInt({ min: 1 })

    .withMessage("Invalid Fee Category"),

  body("academic_year")
    .trim()

    .notEmpty()

    .withMessage("Academic Year Is Required"),

  body("amount")
    .notEmpty()

    .withMessage("Amount Is Required")

    .isFloat({ min: 0 })

    .withMessage("Invalid Amount"),

  body("paid_amount")
    .optional()

    .isFloat({ min: 0 })

    .withMessage("Invalid Paid Amount"),

  body("due_amount")
    .optional()

    .isFloat({ min: 0 })

    .withMessage("Invalid Due Amount"),

  body("payment_status")
    .optional()

    .isIn(["Pending", "Partial", "Paid"])

    .withMessage("Invalid Payment Status"),

  body("due_date")
    .optional()

    .isDate()

    .withMessage("Invalid Due Date"),
];

/*==========================================================
        UPDATE STUDENT FEE VALIDATION
==========================================================*/

const updateStudentFeeValidator = [
  body("student_id")
    .optional()

    .isInt({ min: 1 })

    .withMessage("Invalid Student"),

  body("fee_category_id")
    .optional()

    .isInt({ min: 1 })

    .withMessage("Invalid Fee Category"),

  body("academic_year")
    .optional()

    .trim()

    .notEmpty()

    .withMessage("Academic Year Cannot Be Empty"),

  body("amount")
    .optional()

    .isFloat({ min: 0 })

    .withMessage("Invalid Amount"),

  body("paid_amount")
    .optional()

    .isFloat({ min: 0 })

    .withMessage("Invalid Paid Amount"),

  body("due_amount")
    .optional()

    .isFloat({ min: 0 })

    .withMessage("Invalid Due Amount"),

  body("payment_status")
    .optional()

    .isIn(["Pending", "Partial", "Paid"])

    .withMessage("Invalid Payment Status"),

  body("due_date")
    .optional()

    .isDate()

    .withMessage("Invalid Due Date"),
];

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  createStudentFeeValidator,

  updateStudentFeeValidator,
};
