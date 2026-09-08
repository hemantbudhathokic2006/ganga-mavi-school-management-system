/*==========================================================
        GANGA MA.VI
        STUDENT PARENT MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE RELATIONSHIP
==========================================================*/

const createRelationship = async (relation) => {

    try {

        const query = `

            INSERT INTO student_parents (

                student_id,

                parent_id,

                relationship,

                is_primary

            )

            VALUES (

                ?, ?, ?, ?

            )

        `;

        const values = [

            relation.student_id,

            relation.parent_id,

            relation.relationship,

            relation.is_primary

        ];

        const [result] = await database.execute(

            query,

            values

        );

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        GET PARENTS BY STUDENT
==========================================================*/

const getParentsByStudent = async (studentId) => {

    try {

        const query = `

            SELECT

                student_parents.*,

                parents.parent_code,

                parents.father_name,

                parents.mother_name,

                parents.guardian_name,

                parents.phone_primary,

                parents.email

            FROM student_parents

            INNER JOIN parents

                ON student_parents.parent_id = parents.id

            WHERE

                student_parents.student_id = ?

            ORDER BY

                student_parents.is_primary DESC

        `;

        const [rows] = await database.execute(

            query,

            [studentId]

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        GET STUDENTS BY PARENT
==========================================================*/

const getStudentsByParent = async (parentId) => {

    try {

        const query = `

            SELECT

                student_parents.*,

                students.admission_number,

                students.roll_number,

                students.first_name,

                students.middle_name,

                students.last_name

            FROM student_parents

            INNER JOIN students

                ON student_parents.student_id = students.id

            WHERE

                student_parents.parent_id = ?

                AND students.deleted_at IS NULL

            ORDER BY

                students.first_name ASC

        `;

        const [rows] = await database.execute(

            query,

            [parentId]

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        CHECK RELATIONSHIP
==========================================================*/

const checkRelationship = async (

    studentId,

    parentId,

    relationship

) => {

    try {

        const query = `

            SELECT *

            FROM student_parents

            WHERE

                student_id = ?

                AND parent_id = ?

                AND relationship = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [

                studentId,

                parentId,

                relationship

            ]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        DELETE RELATIONSHIP
==========================================================*/

const deleteRelationship = async (id) => {

    try {

        const query = `

            DELETE FROM student_parents

            WHERE id = ?

        `;

        const [result] = await database.execute(

            query,

            [id]

        );

        return result;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    createRelationship,

    getParentsByStudent,

    getStudentsByParent,

    checkRelationship,

    deleteRelationship

};