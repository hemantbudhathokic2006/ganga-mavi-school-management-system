/*==========================================================
        GANGA MA.VI
        STUDENT FEE PAYMENT VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const { body } = require("express-validator");

/*==========================================================
        CREATE PAYMENT VALIDATOR
==========================================================*/

const createStudentFeePaymentValidator = [

    body("receipt_number")
        .notEmpty()
        .withMessage("Receipt Number is Required"),

    body("student_id")
        .isInt({ min: 1 })
        .withMessage("Valid Student ID is Required"),

    body("class_fee_id")
        .isInt({ min: 1 })
        .withMessage("Valid Class Fee ID is Required"),

    body("payment_date")
        .notEmpty()
        .withMessage("Payment Date is Required")
        .isDate()
        .withMessage("Invalid Payment Date"),

    body("total_amount")
        .isFloat({ min: 0 })
        .withMessage("Total Amount Must Be Valid"),

    body("paid_amount")
        .isFloat({ min: 0 })
        .withMessage("Paid Amount Must Be Valid"),

    body("due_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Due Amount Must Be Valid"),

    body("discount_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount Amount Must Be Valid"),

    body("fine_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Fine Amount Must Be Valid"),

    body("payment_method")
        .isIn([
            "Cash",
            "Bank",
            "Cheque",
            "eSewa",
            "Khalti",
            "IME Pay"
        ])
        .withMessage("Invalid Payment Method"),

    body("payment_status")
        .optional()
        .isIn([
            "Pending",
            "Partial",
            "Paid",
            "Cancelled"
        ])
        .withMessage("Invalid Payment Status")

];

/*==========================================================
        UPDATE PAYMENT VALIDATOR
==========================================================*/

const updateStudentFeePaymentValidator = [

    body("payment_date")
        .optional()
        .isDate()
        .withMessage("Invalid Payment Date"),

    body("total_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Total Amount Must Be Valid"),

    body("paid_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Paid Amount Must Be Valid"),

    body("due_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Due Amount Must Be Valid"),

    body("discount_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount Amount Must Be Valid"),

    body("fine_amount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Fine Amount Must Be Valid"),

    body("payment_method")
        .optional()
        .isIn([
            "Cash",
            "Bank",
            "Cheque",
            "eSewa",
            "Khalti",
            "IME Pay"
        ])
        .withMessage("Invalid Payment Method"),

    body("payment_status")
        .optional()
        .isIn([
            "Pending",
            "Partial",
            "Paid",
            "Cancelled"
        ])
        .withMessage("Invalid Payment Status")

];

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    createStudentFeePaymentValidator,

    updateStudentFeePaymentValidator

};
