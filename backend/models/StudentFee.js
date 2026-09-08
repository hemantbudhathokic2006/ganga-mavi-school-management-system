/*==========================================================
        GANGA MA.VI
        STUDENT FEE MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE STUDENT FEE
==========================================================*/

const createStudentFee = async (feeData) => {
  try {
    const query = `

            INSERT INTO student_fees (

                student_id,

                fee_category_id,

                academic_year,

                amount,

                paid_amount,

                due_amount,

                payment_status,

                due_date

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

    const values = [
      feeData.student_id,

      feeData.fee_category_id,

      feeData.academic_year,

      feeData.amount,

      feeData.paid_amount,

      feeData.due_amount,

      feeData.payment_status,

      feeData.due_date,
    ];

    const [result] = await database.execute(
      query,

      values,
    );

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        FIND STUDENT FEE BY ID
==========================================================*/

const findStudentFeeById = async (id) => {
  try {
    const query = `

            SELECT *

            FROM student_fees

            WHERE id = ?

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        GET ALL STUDENT FEES
==========================================================*/

const getAllStudentFees = async () => {
  try {
    const query = `

            SELECT *

            FROM student_fees

            ORDER BY created_at DESC

        `;

    const [rows] = await database.execute(query);

    return rows;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        UPDATE STUDENT FEE
==========================================================*/

const updateStudentFee = async (
  id,

  feeData,
) => {
  try {
    const query = `

            UPDATE student_fees

            SET

                student_id = ?,

                fee_category_id = ?,

                academic_year = ?,

                amount = ?,

                paid_amount = ?,

                due_amount = ?,

                payment_status = ?,

                due_date = ?

            WHERE id = ?

        `;

    const values = [
      feeData.student_id,

      feeData.fee_category_id,

      feeData.academic_year,

      feeData.amount,

      feeData.paid_amount,

      feeData.due_amount,

      feeData.payment_status,

      feeData.due_date,

      id,
    ];

    const [result] = await database.execute(
      query,

      values,
    );

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        DELETE STUDENT FEE
==========================================================*/

const deleteStudentFee = async (id) => {
  try {
    const query = `

            DELETE FROM student_fees

            WHERE id = ?

        `;

    const [result] = await database.execute(
      query,

      [id],
    );

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        GET STUDENT FEE COUNT
==========================================================*/

const getStudentFeeCount = async () => {
  try {
    const query = `

            SELECT

                COUNT(*) AS total

            FROM student_fees

        `;

    const [rows] = await database.execute(query);

    return rows[0].total;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  createStudentFee,

  findStudentFeeById,

  getAllStudentFees,

  updateStudentFee,

  deleteStudentFee,

  getStudentFeeCount,
};
