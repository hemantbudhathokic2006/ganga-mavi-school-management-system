/*==========================================================
        GANGA MA.VI
        RESULT MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE RESULT
==========================================================*/

const createResult = async (result) => {
  try {
    const query = `

            INSERT INTO results (

                student_id,

                exam_type_id,

                total_full_marks,

                total_obtained_marks,

                percentage,

                grade,

                grade_point,

                rank_position,

                remarks,

                result_status,

                published_at

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

    const values = [
      result.student_id,

      result.exam_type_id,

      result.total_full_marks,

      result.total_obtained_marks,

      result.percentage,

      result.grade,

      result.grade_point,

      result.rank_position,

      result.remarks,

      result.result_status,

      result.published_at,
    ];

    const [response] = await database.execute(
      query,

      values,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        FIND RESULT BY ID
==========================================================*/

const findResultById = async (id) => {
  try {
    const query = `

            SELECT

                results.*,

                students.admission_number,

                users.full_name,

                exam_types.exam_name

            FROM results

            INNER JOIN students

                ON results.student_id = students.id

            INNER JOIN users

                ON students.user_id = users.id

            INNER JOIN exam_types

                ON results.exam_type_id = exam_types.id

            WHERE

                results.id = ?

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
        FIND RESULT
==========================================================*/

const findStudentResult = async (
  studentId,

  examTypeId,
) => {
  try {
    const query = `

            SELECT *

            FROM results

            WHERE

                student_id = ?

                AND exam_type_id = ?

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [studentId, examTypeId],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        GET ALL RESULTS
==========================================================*/

const getAllResults = async () => {
  try {
    const query = `

            SELECT

                results.*,

                users.full_name,

                students.admission_number,

                exam_types.exam_name

            FROM results

            INNER JOIN students

                ON results.student_id = students.id

            INNER JOIN users

                ON students.user_id = users.id

            INNER JOIN exam_types

                ON results.exam_type_id = exam_types.id

            ORDER BY

                results.created_at DESC

        `;

    const [rows] = await database.execute(query);

    return rows;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        UPDATE RESULT
==========================================================*/

const updateResult = async (
  id,

  result,
) => {
  try {
    const query = `

            UPDATE results

            SET

                total_full_marks = ?,

                total_obtained_marks = ?,

                percentage = ?,

                grade = ?,

                grade_point = ?,

                rank_position = ?,

                remarks = ?,

                result_status = ?,

                published_at = ?

            WHERE

                id = ?

        `;

    const values = [
      result.total_full_marks,

      result.total_obtained_marks,

      result.percentage,

      result.grade,

      result.grade_point,

      result.rank_position,

      result.remarks,

      result.result_status,

      result.published_at,

      id,
    ];

    const [response] = await database.execute(
      query,

      values,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        DELETE RESULT
==========================================================*/

const deleteResult = async (id) => {
  try {
    const query = `

            DELETE FROM results

            WHERE id = ?

        `;

    const [response] = await database.execute(
      query,

      [id],
    );

    return response;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        GET RESULT COUNT
==========================================================*/

const getResultCount = async () => {
  try {
    const query = `

            SELECT

                COUNT(*) AS total

            FROM results

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
  createResult,

  findResultById,

  findStudentResult,

  getAllResults,

  updateResult,

  deleteResult,

  getResultCount,
};
