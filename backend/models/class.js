/*==========================================================
        GANGA MA.VI
        CLASS MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE CLASS
==========================================================*/

const createClass = async (classData) => {
  try {
    const query = `

            INSERT INTO classes (

                class_name,

                description

            )

            VALUES (

                ?, ?

            )

        `;

    const values = [classData.class_name, classData.description];

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
        FIND CLASS BY ID
==========================================================*/

const findClassById = async (id) => {
  try {
    const query = `

            SELECT *

            FROM classes

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
        FIND CLASS BY NAME
==========================================================*/

const findClassByName = async (className) => {
  try {
    const query = `

            SELECT *

            FROM classes

            WHERE class_name = ?

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [className],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        FIND CLASS BY NAME EXCEPT ID
==========================================================*/

const findClassByNameExceptId = async (
  className,

  id,
) => {
  try {
    const query = `

            SELECT *

            FROM classes

            WHERE

                class_name = ?

            AND

                id <> ?

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [className, id],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        GET ALL CLASSES
==========================================================*/

const getAllClasses = async () => {
  try {
    const query = `

            SELECT *

            FROM classes

            ORDER BY class_name ASC

        `;

    const [rows] = await database.execute(query);

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        UPDATE CLASS
==========================================================*/

const updateClass = async (id, classData) => {
  try {
    const query = `

            UPDATE classes

            SET

                class_name = ?,

                description = ?

            WHERE

                id = ?

        `;

    const values = [classData.class_name, classData.description, id];

    const [result] = await database.execute(
      query,

      values,
    );

    return result;
  } catch (error) {
    throw error;
  }
}; /*==========================================================
        DELETE CLASS
==========================================================*/

const deleteClass = async (id) => {
  try {
    const query = `

            DELETE FROM classes

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
        GET CLASS COUNT
==========================================================*/

const getClassCount = async () => {
  try {
    const query = `

            SELECT

                COUNT(*) AS total

            FROM classes

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
  createClass,

  findClassById,

  findClassByName,

  findClassByNameExceptId,

  getAllClasses,

  updateClass,

  deleteClass,

  getClassCount,
};
