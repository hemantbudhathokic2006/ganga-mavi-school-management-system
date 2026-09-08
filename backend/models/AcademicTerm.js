/*==========================================================
        GANGA MA.VI
        ACADEMIC TERM MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE ACADEMIC TERM
==========================================================*/

const createAcademicTerm = async (term) => {

    try {

        const query = `

            INSERT INTO academic_terms (

                academic_year_id,

                term_name,

                term_code,

                display_order,

                start_date,

                end_date,

                is_active

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?

            )

        `;

        const values = [

            term.academic_year_id,

            term.term_name,

            term.term_code,

            term.display_order,

            term.start_date,

            term.end_date,

            term.is_active

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
        FIND TERM BY ID
==========================================================*/

const findAcademicTermById = async (id) => {

    try {

        const query = `

            SELECT

                academic_terms.*,

                academic_years.academic_year_name

            FROM academic_terms

            INNER JOIN academic_years

                ON academic_terms.academic_year_id = academic_years.id

            WHERE

                academic_terms.id = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [id]

        );

        return rows.length > 0

            ? rows[0]

            : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        FIND TERM BY CODE
==========================================================*/

const findAcademicTermByCode = async (termCode) => {

    try {

        const query = `

            SELECT *

            FROM academic_terms

            WHERE term_code = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [termCode]

        );

        return rows.length > 0

            ? rows[0]

            : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        GET ALL TERMS
==========================================================*/

const getAllAcademicTerms = async () => {

    try {

        const query = `

            SELECT

                academic_terms.*,

                academic_years.academic_year_name

            FROM academic_terms

            INNER JOIN academic_years

                ON academic_terms.academic_year_id = academic_years.id

            ORDER BY

                academic_years.start_date DESC,

                academic_terms.display_order ASC

        `;

        const [rows] = await database.execute(

            query

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        UPDATE TERM
==========================================================*/

const updateAcademicTerm = async (

    id,

    term

) => {

    try {

        const query = `

            UPDATE academic_terms

            SET

                academic_year_id = ?,

                term_name = ?,

                term_code = ?,

                display_order = ?,

                start_date = ?,

                end_date = ?,

                is_active = ?

            WHERE id = ?

        `;

        const values = [

            term.academic_year_id,

            term.term_name,

            term.term_code,

            term.display_order,

            term.start_date,

            term.end_date,

            term.is_active,

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
        DELETE TERM
==========================================================*/

const deleteAcademicTerm = async (id) => {

    try {

        const query = `

            DELETE FROM academic_terms

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
        GET TERM COUNT
==========================================================*/

const getAcademicTermCount = async () => {

    try {

        const query = `

            SELECT COUNT(*) AS total

            FROM academic_terms

        `;

        const [rows] = await database.execute(

            query

        );

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

    createAcademicTerm,

    findAcademicTermById,

    findAcademicTermByCode,

    getAllAcademicTerms,

    updateAcademicTerm,

    deleteAcademicTerm,

    getAcademicTermCount

};