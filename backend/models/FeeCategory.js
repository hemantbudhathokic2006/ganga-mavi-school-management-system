/*==========================================================
        GANGA MA.VI
        FEE CATEGORY MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        CREATE FEE CATEGORY
==========================================================*/

const createFeeCategory = async (feeCategory) => {

    try {

        const query = `

            INSERT INTO fee_categories (

                category_name,

                category_code,

                description,

                is_recurring,

                display_order,

                is_active

            )

            VALUES (

                ?, ?, ?, ?, ?, ?

            )

        `;

        const values = [

            feeCategory.category_name,

            feeCategory.category_code,

            feeCategory.description,

            feeCategory.is_recurring,

            feeCategory.display_order,

            feeCategory.is_active

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
        FIND BY ID
==========================================================*/

const findFeeCategoryById = async (id) => {

    try {

        const query = `

            SELECT *

            FROM fee_categories

            WHERE id = ?

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
        FIND BY CODE
==========================================================*/

const findFeeCategoryByCode = async (code) => {

    try {

        const query = `

            SELECT *

            FROM fee_categories

            WHERE category_code = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [code]

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
        FIND BY CODE EXCEPT ID
==========================================================*/

const findFeeCategoryByCodeExceptId = async (

    code,

    id

) => {

    try {

        const query = `

            SELECT *

            FROM fee_categories

            WHERE

                category_code = ?

            AND

                id <> ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [

                code,

                id

            ]

        );

        return rows.length > 0

            ? rows[0]

            : null;

    }

    catch (error) {

        throw error;

    }

};