/*==========================================================
        GANGA MA.VI
        SECTION MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE SECTION
==========================================================*/

const createSection = async (section) => {

    try {

        const query = `

            INSERT INTO sections (

                class_id,

                section_name,

                class_teacher_id

            )

            VALUES (

                ?, ?, ?

            )

        `;

        const values = [

            section.class_id,

            section.section_name,

            section.class_teacher_id

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
        FIND SECTION BY ID
==========================================================*/

const findSectionById = async (id) => {

    try {

        const query = `

            SELECT

                sections.*,

                classes.class_name

            FROM sections

            INNER JOIN classes

                ON sections.class_id = classes.id

            WHERE sections.id = ?

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
        FIND SECTION
==========================================================*/

const findSection = async (

    classId,

    sectionName

) => {

    try {

        const query = `

            SELECT *

            FROM sections

            WHERE

                class_id = ?

                AND section_name = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [

                classId,

                sectionName

            ]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        GET ALL SECTIONS
==========================================================*/

const getAllSections = async () => {

    try {

        const query = `

            SELECT

                sections.*,

                classes.class_name

            FROM sections

            INNER JOIN classes

                ON sections.class_id = classes.id

            ORDER BY

                classes.class_name,

                sections.section_name

        `;

        const [rows] = await database.execute(query);

        return rows;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        GET SECTIONS BY CLASS
==========================================================*/

const getSectionsByClass = async (classId) => {

    try {

        const query = `

            SELECT *

            FROM sections

            WHERE class_id = ?

            ORDER BY section_name

        `;

        const [rows] = await database.execute(

            query,

            [classId]

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        UPDATE SECTION
==========================================================*/

const updateSection = async (

    id,

    section

) => {

    try {

        const query = `

            UPDATE sections

            SET

                class_id = ?,

                section_name = ?,

                class_teacher_id = ?

            WHERE

                id = ?

        `;

        const values = [

            section.class_id,

            section.section_name,

            section.class_teacher_id,

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
        DELETE SECTION
==========================================================*/

const deleteSection = async (id) => {

    try {

        const query = `

            DELETE FROM sections

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
        GET SECTION COUNT
==========================================================*/

const getSectionCount = async () => {

    try {

        const query = `

            SELECT

                COUNT(*) AS total

            FROM sections

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

    createSection,

    findSectionById,

    findSection,

    getAllSections,

    getSectionsByClass,

    updateSection,

    deleteSection,

    getSectionCount

};