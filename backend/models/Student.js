/*==========================================================
        GANGA MA.VI
        STUDENT MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE STUDENT
==========================================================*/

const createStudent = async (student) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            INSERT INTO students (

                user_id,

                class_id,

                section_id,

                admission_number,

                roll_number,

                first_name,

                middle_name,

                last_name,

                gender,

                date_of_birth,

                blood_group,

                nationality,

                religion,

                caste,

                phone,

                email,

                address,

                city,

                district,

                province,

                postal_code,

                profile_photo,

                admission_date,

                academic_status,

                is_active,

                remarks

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

    /*==============================================
                QUERY PARAMETERS
        ==============================================*/

    const values = [
      student.user_id,

      student.class_id,

      student.section_id,

      student.admission_number,

      student.roll_number,

      student.first_name,

      student.middle_name,

      student.last_name,

      student.gender,

      student.date_of_birth,

      student.blood_group,

      student.nationality,

      student.religion,

      student.caste,

      student.phone,

      student.email,

      student.address,

      student.city,

      student.district,

      student.province,

      student.postal_code,

      student.profile_photo,

      student.admission_date,

      student.academic_status,

      student.is_active,

      student.remarks,
    ];

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      values,
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return result;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        FIND STUDENT BY ID
==========================================================*/

const findStudentById = async (id) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT

                students.*,

                classes.class_name,

                sections.section_name,

                users.username,

                users.role_id

            FROM students

            INNER JOIN users

                ON students.user_id = users.id

            INNER JOIN classes

                ON students.class_id = classes.id

            INNER JOIN sections

                ON students.section_id = sections.id

            WHERE students.id = ?

                AND students.deleted_at IS NULL

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [id],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        FIND STUDENT BY ADMISSION NUMBER
==========================================================*/

const findStudentByAdmissionNumber = async (admissionNumber) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT *

            FROM students

            WHERE admission_number = ?

                AND deleted_at IS NULL

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [admissionNumber],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        FIND STUDENT BY EMAIL
==========================================================*/

const findStudentByEmail = async (email) => {
  try {
    /*==============================================
                SQL QUERY
    ==============================================*/

    const query = `

            SELECT *

            FROM students

            WHERE

                email = ?

                AND deleted_at IS NULL

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
    ==============================================*/

    const [rows] = await database.execute(

        query,

        [email]

    );

    /*==============================================
                RETURN RESULT
    ==============================================*/

    return rows.length > 0 ? rows[0] : null;

  } catch (error) {

    throw error;

  }
};
/*==========================================================
        FIND STUDENT BY EMAIL EXCEPT ID
==========================================================*/

const findStudentByEmailExceptId = async (

    email,

    id

) => {

    try {

        const query = `

            SELECT *

            FROM students

            WHERE

                email = ?

                AND id <> ?

                AND deleted_at IS NULL

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [

                email,

                id

            ]

        );

        return rows.length > 0 ? rows[0] : null;

    } catch (error) {

        throw error;

    }

};

/*==========================================================
        GET ALL STUDENTS
==========================================================*/

const getAllStudents = async () => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT

                students.*,

                classes.class_name,

                sections.section_name

            FROM students

            INNER JOIN classes

                ON students.class_id = classes.id

            INNER JOIN sections

                ON students.section_id = sections.id

            WHERE students.deleted_at IS NULL

            ORDER BY students.created_at DESC

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(query);

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        GET STUDENTS BY CLASS
==========================================================*/

const getStudentsByClass = async (classId) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT

                students.*,

                sections.section_name

            FROM students

            INNER JOIN sections

                ON students.section_id = sections.id

            WHERE

                students.class_id = ?

                AND students.deleted_at IS NULL

            ORDER BY

                students.roll_number ASC

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [classId],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        SEARCH STUDENTS
==========================================================*/

const searchStudents = async (keyword) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT

                students.*,

                classes.class_name,

                sections.section_name

            FROM students

            INNER JOIN classes

                ON students.class_id = classes.id

            INNER JOIN sections

                ON students.section_id = sections.id

            WHERE

                (

                    students.first_name LIKE ?

                    OR students.last_name LIKE ?

                    OR students.admission_number LIKE ?

                    OR students.roll_number LIKE ?

                )

                AND students.deleted_at IS NULL

            ORDER BY

                students.created_at DESC

        `;

    /*==============================================
                SEARCH VALUE
        ==============================================*/

    const search = `%${keyword}%`;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [search, search, search, search],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        UPDATE STUDENT
==========================================================*/

const updateStudent = async (id, student) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            UPDATE students

            SET

                class_id = ?,

                section_id = ?,

                roll_number = ?,

                first_name = ?,

                middle_name = ?,

                last_name = ?,

                gender = ?,

                date_of_birth = ?,

                blood_group = ?,

                nationality = ?,

                religion = ?,

                caste = ?,

                phone = ?,

                email = ?,

                address = ?,

                city = ?,

                district = ?,

                province = ?,

                postal_code = ?,

                profile_photo = ?,

                academic_status = ?,

                is_active = ?,

                remarks = ?

            WHERE

                id = ?

                AND deleted_at IS NULL

        `;

    /*==============================================
                QUERY PARAMETERS
        ==============================================*/

    const values = [
      student.class_id,

      student.section_id,

      student.roll_number,

      student.first_name,

      student.middle_name,

      student.last_name,

      student.gender,

      student.date_of_birth,

      student.blood_group,

      student.nationality,

      student.religion,

      student.caste,

      student.phone,

      student.email,

      student.address,

      student.city,

      student.district,

      student.province,

      student.postal_code,

      student.profile_photo,

      student.academic_status,

      student.is_active,

      student.remarks,

      id,
    ];

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      values,
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        UPDATE STUDENT STATUS
==========================================================*/

const updateStudentStatus = async (
  id,

  status,
) => {
  try {
    const query = `

            UPDATE students

            SET

                academic_status = ?

            WHERE

                id = ?

                AND deleted_at IS NULL

        `;

    const [result] = await database.execute(
      query,

      [status, id],
    );

    return result;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        DELETE STUDENT (SOFT DELETE)
==========================================================*/

const deleteStudent = async (id) => {
  try {
    const query = `

            UPDATE students

            SET

                deleted_at = CURRENT_TIMESTAMP,

                is_active = FALSE

            WHERE

                id = ?

                AND deleted_at IS NULL

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
        GET STUDENT COUNT
==========================================================*/

const getStudentCount = async () => {
  try {
    const query = `

            SELECT

                COUNT(*) AS total

            FROM students

            WHERE deleted_at IS NULL

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
  createStudent,

  findStudentById,

  findStudentByAdmissionNumber,

  findStudentByEmail,

  findStudentByEmailExceptId,

  getAllStudents,

  getStudentsByClass,

  searchStudents,

  updateStudent,

  updateStudentStatus,

  deleteStudent,

  getStudentCount,
};
