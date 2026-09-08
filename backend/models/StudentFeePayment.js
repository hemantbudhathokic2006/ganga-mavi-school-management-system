/*==========================================================
        GANGA MA.VI
        STUDENT FEE PAYMENT MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE STUDENT FEE PAYMENT
==========================================================*/

const createStudentFeePayment = async (paymentData) => {

    try {

        const query = `

            INSERT INTO student_fee_payments (

                receipt_number,

                student_id,

                class_fee_id,

                payment_date,

                payment_month,

                payment_year,

                total_amount,

                discount_amount,

                fine_amount,

                paid_amount,

                due_amount,

                payment_method,

                transaction_reference,

                payment_status,

                remarks,

                received_by

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

        const values = [

            paymentData.receipt_number,

            paymentData.student_id,

            paymentData.class_fee_id,

            paymentData.payment_date,

            paymentData.payment_month,

            paymentData.payment_year,

            paymentData.total_amount,

            paymentData.discount_amount,

            paymentData.fine_amount,

            paymentData.paid_amount,

            paymentData.due_amount,

            paymentData.payment_method,

            paymentData.transaction_reference,

            paymentData.payment_status,

            paymentData.remarks,

            paymentData.received_by

        ];

        const [result] = await database.execute(query, values);

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        FIND PAYMENT BY ID
==========================================================*/

const findStudentFeePaymentById = async (id) => {

    try {

        const query = `

            SELECT *

            FROM student_fee_payments

            WHERE id = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(query, [id]);

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        GET ALL PAYMENTS
==========================================================*/

const getAllStudentFeePayments = async () => {

    try {

        const query = `

            SELECT *

            FROM student_fee_payments

            ORDER BY payment_date DESC

        `;

        const [rows] = await database.execute(query);

        return rows;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        UPDATE PAYMENT
==========================================================*/

const updateStudentFeePayment = async (id, paymentData) => {

    try {

        const query = `

            UPDATE student_fee_payments

            SET

                payment_date = ?,

                payment_month = ?,

                payment_year = ?,

                total_amount = ?,

                discount_amount = ?,

                fine_amount = ?,

                paid_amount = ?,

                due_amount = ?,

                payment_method = ?,

                transaction_reference = ?,

                payment_status = ?,

                remarks = ?

            WHERE id = ?

        `;

        const values = [

            paymentData.payment_date,

            paymentData.payment_month,

            paymentData.payment_year,

            paymentData.total_amount,

            paymentData.discount_amount,

            paymentData.fine_amount,

            paymentData.paid_amount,

            paymentData.due_amount,

            paymentData.payment_method,

            paymentData.transaction_reference,

            paymentData.payment_status,

            paymentData.remarks,

            id

        ];

        const [result] = await database.execute(query, values);

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        DELETE PAYMENT
==========================================================*/

const deleteStudentFeePayment = async (id) => {

    try {

        const query = `

            DELETE FROM student_fee_payments

            WHERE id = ?

        `;

        const [result] = await database.execute(query, [id]);

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        GET PAYMENT COUNT
==========================================================*/

const getStudentFeePaymentCount = async () => {

    try {

        const query = `

            SELECT COUNT(*) AS total

            FROM student_fee_payments

        `;

        const [rows] = await database.execute(query);

        return rows[0].total;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    createStudentFeePayment,

    findStudentFeePaymentById,

    getAllStudentFeePayments,

    updateStudentFeePayment,

    deleteStudentFeePayment,

    getStudentFeePaymentCount

};