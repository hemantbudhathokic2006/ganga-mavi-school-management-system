/*==========================================================
        GANGA MA.VI
        ACADEMIC YEAR MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE ACADEMIC YEAR
==========================================================*/

const createAcademicYear = async (academicYear) => {
  try {
    const query = `

            INSERT INTO academic_years (

                academic_year_name,

                start_date,

                end_date,

                is_current,

                is_active

            )

            VALUES (

                ?, ?, ?, ?, ?

            )

        `;

    const values = [
      academicYear.academic_year_name,

      academicYear.start_date,

      academicYear.end_date,

      academicYear.is_current,

      academicYear.is_active,
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
        FIND BY ID
==========================================================*/

const findAcademicYearById = async (id) => {
  try {
    const query = `

            SELECT *

            FROM academic_years

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
        FIND BY NAME
==========================================================*/

const findAcademicYearByName = async (name) => {
  try {
    const query = `

            SELECT *

            FROM academic_years

            WHERE academic_year_name = ?

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [name],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        FIND BY NAME EXCEPT ID
==========================================================*/

const findAcademicYearByNameExceptId = async (
  academicYearName,

  id,
) => {
  try {
    const query = `

            SELECT *

            FROM academic_years

            WHERE

                academic_year_name = ?

                AND id <> ?

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [academicYearName, id],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        GET ALL
==========================================================*/

const getAllAcademicYears = async () => {
  try {
    const query = `

            SELECT *

            FROM academic_years

            ORDER BY

                start_date DESC

        `;

    const [rows] = await database.execute(query);

    return rows;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        UPDATE
==========================================================*/

const updateAcademicYear = async (
  id,

  academicYear,
) => {
  try {
    const query = `

            UPDATE academic_years

            SET

                academic_year_name = ?,

                start_date = ?,

                end_date = ?,

                is_current = ?,

                is_active = ?

            WHERE id = ?

        `;

    const values = [
      academicYear.academic_year_name,

      academicYear.start_date,

      academicYear.end_date,

      academicYear.is_current,

      academicYear.is_active,

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
        DELETE
==========================================================*/

const deleteAcademicYear = async (id) => {
  try {
    const query = `

            DELETE FROM academic_years

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
        COUNT
==========================================================*/

const getAcademicYearCount = async () => {
  try {
    const query = `

            SELECT

                COUNT(*) AS total

            FROM academic_years

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

    createAcademicYear,

    findAcademicYearById,

    findAcademicYearByName,

    findAcademicYearByNameExceptId,

    getAllAcademicYears,

    updateAcademicYear,

    deleteAcademicYear,

    getAcademicYearCount

};