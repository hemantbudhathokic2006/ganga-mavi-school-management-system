/*==========================================================
        GANGA MA.VI
        TEACHER MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE TEACHER
==========================================================*/

const createTeacher = async (teacher) => {
  try {
    /*==============================================
                SQL QUERY
    ==============================================*/

    const query = `

        INSERT INTO teachers (

            user_id,

            teacher_code,

            department,

            qualification,

            specialization,

            joining_date,

            salary,

            experience_years

        )

        VALUES (

            ?, ?, ?, ?, ?, ?, ?, ?

        )

    `;

    /*==============================================
                QUERY PARAMETERS
    ==============================================*/

    const values = [
      teacher.user_id,

      teacher.teacher_code,

      teacher.department,

      teacher.qualification,

      teacher.specialization,

      teacher.joining_date,

      teacher.salary,

      teacher.experience_years,
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
        FIND TEACHER BY ID
==========================================================*/

const findTeacherById = async (id) => {
  try {
    /*==============================================
                SQL QUERY
    ==============================================*/

    const query = `
    
      SELECT

        teachers.*,

        users.full_name,

        users.username,

        users.email,

        users.phone,

        users.profile_image,

        users.is_active
      

        FROM teachers

        INNER JOIN users

            ON teachers.user_id = users.id

        WHERE

            teachers.id = ?

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
        FIND TEACHER BY TEACHER CODE
==========================================================*/

const findTeacherByTeacherCode = async (teacherCode) => {
  try {
    /*==============================================
                SQL QUERY
    ==============================================*/

    const query = `

        SELECT *

        FROM teachers

        WHERE teacher_code = ?

        LIMIT 1

    `;

    /*==============================================
                EXECUTE QUERY
    ==============================================*/

    const [rows] = await database.execute(
      query,

      [teacherCode],
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
        FIND TEACHER BY USER ID
==========================================================*/

const findTeacherByUserId = async (userId) => {
  try {
    const query = `

        SELECT *

        FROM teachers

        WHERE user_id = ?

        LIMIT 1

    `;

    const [rows] = await database.execute(
      query,

      [userId],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        GET ALL TEACHERS
==========================================================*/

const getAllTeachers = async () => {
  try {
    const query = `

        SELECT

            teachers.*,

            users.full_name,

            users.email,

            users.phone,

            users.is_active

        FROM teachers

        INNER JOIN users

            ON teachers.user_id = users.id

        ORDER BY teachers.created_at DESC

    `;

    const [rows] = await database.execute(query);

    return rows;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        SEARCH TEACHERS
==========================================================*/

const searchTeachers = async (keyword) => {
  try {
    const query = `

        SELECT

            teachers.*,

            users.full_name,

            users.email,

            users.phone

        FROM teachers

        INNER JOIN users

            ON teachers.user_id = users.id

        WHERE

            users.full_name LIKE ?

            OR teachers.teacher_code LIKE ?

            OR users.email LIKE ?

            OR teachers.department LIKE ?

        ORDER BY teachers.created_at DESC

    `;

    const search = `%${keyword}%`;

    const [rows] = await database.execute(
      query,

      [search, search, search, search],
    );

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        UPDATE TEACHER
==========================================================*/

const updateTeacher = async (id, teacher) => {
  try {
    /*==============================================
                SQL QUERY
    ==============================================*/

    const query = `

        UPDATE teachers

        SET

            department = ?,

            qualification = ?,

            specialization = ?,

            joining_date = ?,

            salary = ?,

            experience_years = ?

        WHERE

            id = ?

    `;

    /*==============================================
                QUERY PARAMETERS
    ==============================================*/

    const values = [
      teacher.department,

      teacher.qualification,

      teacher.specialization,

      teacher.joining_date,

      teacher.salary,

      teacher.experience_years,

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
        DELETE TEACHER
==========================================================*/

const deleteTeacher = async (id) => {
  try {
    const query = `

        DELETE FROM teachers

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
        GET TEACHER COUNT
==========================================================*/

const getTeacherCount = async () => {
  try {
    const query = `

        SELECT

            COUNT(*) AS total

        FROM teachers

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
  createTeacher,

  findTeacherById,

  findTeacherByTeacherCode,

  findTeacherByUserId,

  getAllTeachers,

  searchTeachers,

  updateTeacher,

  deleteTeacher,

  getTeacherCount,
};
