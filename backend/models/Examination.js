/*==========================================================
        GANGA MA.VI
        EXAMINATION MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE EXAM
==========================================================*/

const createExam = async (exam) => {

    try {

        const query = `

            INSERT INTO exams (

                exam_name,

                class_id,

                academic_year,

                start_date,

                end_date

            )

            VALUES (

                ?, ?, ?, ?, ?

            )

        `;

        const values = [

            exam.exam_name,

            exam.class_id,

            exam.academic_year,

            exam.start_date,

            exam.end_date

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
        FIND EXAM BY ID
==========================================================*/

const findExamById = async (id) => {

    try {

        const query = `

            SELECT

                exams.*,

                classes.class_name

            FROM exams

            INNER JOIN classes

                ON exams.class_id = classes.id

            WHERE exams.id = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [id]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        FIND EXAM BY NAME
==========================================================*/

const findExamByName = async (

    examName,

    classId,

    academicYear

) => {

    try {

        const query = `

            SELECT *

            FROM exams

            WHERE

                exam_name = ?

                AND class_id = ?

                AND academic_year = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [

                examName,

                classId,

                academicYear

            ]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        GET ALL EXAMS
==========================================================*/

const getAllExams = async () => {

    try {

        const query = `

            SELECT

                exams.*,

                classes.class_name

            FROM exams

            INNER JOIN classes

                ON exams.class_id = classes.id

            ORDER BY

                exams.start_date DESC

        `;

        const [rows] = await database.execute(query);

        return rows;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        UPDATE EXAM
==========================================================*/

const updateExam = async (

    id,

    exam

) => {

    try {

        const query = `

            UPDATE exams

            SET

                exam_name = ?,

                class_id = ?,

                academic_year = ?,

                start_date = ?,

                end_date = ?

            WHERE

                id = ?

        `;

        const values = [

            exam.exam_name,

            exam.class_id,

            exam.academic_year,

            exam.start_date,

            exam.end_date,

            id

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
        DELETE EXAM
==========================================================*/

const deleteExam = async (id) => {

    try {

        const query = `

            DELETE FROM exams

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
        GET EXAM COUNT
==========================================================*/

const getExamCount = async () => {

    try {

        const query = `

            SELECT

                COUNT(*) AS total

            FROM exams

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

    createExam,

    findExamById,

    findExamByName,

    getAllExams,

    updateExam,

    deleteExam,

    getExamCount

};