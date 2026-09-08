/*==========================================================
        GANGA MA.VI
        PARENT MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE PARENT
==========================================================*/

const createParent = async (parent) => {
  try {
    const query = `

            INSERT INTO parents (

                user_id,

                parent_code,

                father_name,

                mother_name,

                guardian_name,

                guardian_relation,

                phone_primary,

                phone_secondary,

                email,

                occupation,

                annual_income,

                address,

                city,

                district,

                province,

                postal_code,

                profile_photo,

                is_active,

                remarks

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

    const values = [
      parent.user_id,

      parent.parent_code,

      parent.father_name,

      parent.mother_name,

      parent.guardian_name,

      parent.guardian_relation,

      parent.phone_primary,

      parent.phone_secondary,

      parent.email,

      parent.occupation,

      parent.annual_income,

      parent.address,

      parent.city,

      parent.district,

      parent.province,

      parent.postal_code,

      parent.profile_photo,

      parent.is_active,

      parent.remarks,
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
        FIND PARENT BY ID
==========================================================*/

const findParentById = async (id) => {
  try {
    const query = `

            SELECT *

            FROM parents

            WHERE

                id = ?

                AND deleted_at IS NULL

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
        FIND PARENT BY CODE
==========================================================*/

const findParentByCode = async (parentCode) => {
  try {
    const query = `

            SELECT *

            FROM parents

            WHERE

                parent_code = ?

                AND deleted_at IS NULL

            LIMIT 1

        `;

    const [rows] = await database.execute(
      query,

      [parentCode],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
}; /*==========================================================
        FIND PARENT BY USER ID
==========================================================*/

const findParentByUserId = async (userId) => {
  try {
    const query = `

            SELECT *

            FROM parents

            WHERE

                user_id = ?

                AND deleted_at IS NULL

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
        GET ALL PARENTS
==========================================================*/

const getAllParents = async () => {
  try {
    const query = `

            SELECT *

            FROM parents

            WHERE deleted_at IS NULL

            ORDER BY created_at DESC

        `;

    const [rows] = await database.execute(query);

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        SEARCH PARENTS
==========================================================*/

const searchParents = async (keyword) => {
  try {
    const query = `

            SELECT *

            FROM parents

            WHERE

                deleted_at IS NULL

                AND (

                    parent_code LIKE ?

                    OR father_name LIKE ?

                    OR mother_name LIKE ?

                    OR guardian_name LIKE ?

                    OR phone_primary LIKE ?

                    OR email LIKE ?

                )

            ORDER BY created_at DESC

        `;

    const search = `%${keyword}%`;

    const [rows] = await database.execute(
      query,

      [search, search, search, search, search, search],
    );

    return rows;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        UPDATE PARENT
==========================================================*/

const updateParent = async (
  id,

  parent,
) => {
  try {
    const query = `

            UPDATE parents

            SET

                father_name = ?,

                mother_name = ?,

                guardian_name = ?,

                guardian_relation = ?,

                phone_primary = ?,

                phone_secondary = ?,

                email = ?,

                occupation = ?,

                annual_income = ?,

                address = ?,

                city = ?,

                district = ?,

                province = ?,

                postal_code = ?,

                profile_photo = ?,

                is_active = ?,

                remarks = ?

            WHERE

                id = ?

                AND deleted_at IS NULL

        `;

    const values = [
      parent.father_name,

      parent.mother_name,

      parent.guardian_name,

      parent.guardian_relation,

      parent.phone_primary,

      parent.phone_secondary,

      parent.email,

      parent.occupation,

      parent.annual_income,

      parent.address,

      parent.city,

      parent.district,

      parent.province,

      parent.postal_code,

      parent.profile_photo,

      parent.is_active,

      parent.remarks,

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
        DELETE PARENT (SOFT DELETE)
==========================================================*/

const deleteParent = async (id) => {
  try {
    const query = `

            UPDATE parents

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
        GET PARENT COUNT
==========================================================*/

const getParentCount = async () => {
  try {
    const query = `

            SELECT

                COUNT(*) AS total

            FROM parents

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
  createParent,

  findParentById,

  findParentByCode,

  findParentByUserId,

  getAllParents,

  searchParents,

  updateParent,

  deleteParent,

  getParentCount,
};
