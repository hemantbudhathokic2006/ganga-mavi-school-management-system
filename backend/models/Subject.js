/*==========================================================
        GANGA MA.VI
        SUBJECT MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE SUBJECT
==========================================================*/

const createSubject = async (subject) => {

    try {

        const query = `

            INSERT INTO subjects (

                subject_code,

                subject_name,

                short_name,

                subject_type,

                full_marks,

                pass_marks,

                credit_hours,

                description,

                is_active

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

        const values = [

            subject.subject_code,

            subject.subject_name,

            subject.short_name,

            subject.subject_type,

            subject.full_marks,

            subject.pass_marks,

            subject.credit_hours,

            subject.description,

            subject.is_active

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
        FIND SUBJECT BY ID
==========================================================*/

const findSubjectById = async (id) => {

    try {

        const query = `

            SELECT *

            FROM subjects

            WHERE id = ?

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
        FIND SUBJECT BY CODE
==========================================================*/

const findSubjectByCode = async (subjectCode) => {

    try {

        const query = `

            SELECT *

            FROM subjects

            WHERE subject_code = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [subjectCode]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        GET ALL SUBJECTS
==========================================================*/

const getAllSubjects = async () => {

    try {

        const query = `

            SELECT *

            FROM subjects

            ORDER BY subject_name ASC

        `;

        const [rows] = await database.execute(query);

        return rows;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        SEARCH SUBJECTS
==========================================================*/

const searchSubjects = async (keyword) => {

    try {

        const query = `

            SELECT *

            FROM subjects

            WHERE

                subject_name LIKE ?

                OR subject_code LIKE ?

                OR short_name LIKE ?

            ORDER BY subject_name ASC

        `;

        const search = `%${keyword}%`;

        const [rows] = await database.execute(

            query,

            [

                search,

                search,

                search

            ]

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        UPDATE SUBJECT
==========================================================*/

const updateSubject = async (

    id,

    subject

) => {

    try {

        const query = `

            UPDATE subjects

            SET

                subject_code = ?,

                subject_name = ?,

                short_name = ?,

                subject_type = ?,

                full_marks = ?,

                pass_marks = ?,

                credit_hours = ?,

                description = ?,

                is_active = ?

            WHERE

                id = ?

        `;

        const values = [

            subject.subject_code,

            subject.subject_name,

            subject.short_name,

            subject.subject_type,

            subject.full_marks,

            subject.pass_marks,

            subject.credit_hours,

            subject.description,

            subject.is_active,

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
        DELETE SUBJECT
==========================================================*/

const deleteSubject = async (id) => {

    try {

        const query = `

            DELETE FROM subjects

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
        GET SUBJECT COUNT
==========================================================*/

const getSubjectCount = async () => {

    try {

        const query = `

            SELECT

                COUNT(*) AS total

            FROM subjects

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

    createSubject,

    findSubjectById,

    findSubjectByCode,

    getAllSubjects,

    searchSubjects,

    updateSubject,

    deleteSubject,

    getSubjectCount

};