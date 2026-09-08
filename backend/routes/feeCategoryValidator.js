/*==========================================================
        GANGA MA.VI
        FEE CATEGORY VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const { body } = require("express-validator");

/*==========================================================
        CREATE FEE CATEGORY VALIDATION
==========================================================*/

const createFeeCategoryValidator = [

    body("category_name")

        .trim()

        .notEmpty()

        .withMessage("Category Name Is Required")

        .isLength({

            min: 2,

            max: 100

        })

        .withMessage(

            "Category Name Must Be Between 2 And 100 Characters"

        ),

    body("category_code")

        .trim()

        .notEmpty()

        .withMessage("Category Code Is Required")

        .isLength({

            min: 2,

            max: 30

        })

        .withMessage(

            "Category Code Must Be Between 2 And 30 Characters"

        ),

    body("description")

        .optional()

        .trim()

        .isLength({

            max: 255

        })

        .withMessage(

            "Description Cannot Exceed 255 Characters"

        ),

    body("is_recurring")

        .optional()

        .isBoolean()

        .withMessage(

            "Recurring Value Must Be Boolean"

        ),

    body("is_active")

        .optional()

        .isBoolean()

        .withMessage(

            "Active Value Must Be Boolean"

        )

];

/*==========================================================
        UPDATE FEE CATEGORY VALIDATION
==========================================================*/

const updateFeeCategoryValidator = [

    body("category_name")

        .optional()

        .trim()

        .isLength({

            min: 2,

            max: 100

        })

        .withMessage(

            "Category Name Must Be Between 2 And 100 Characters"

        ),

    body("category_code")

        .optional()

        .trim()

        .isLength({

            min: 2,

            max: 30

        })

        .withMessage(

            "Category Code Must Be Between 2 And 30 Characters"

        ),

    body("description")

        .optional()

        .trim()

        .isLength({

            max: 255

        })

        .withMessage(

            "Description Cannot Exceed 255 Characters"

        ),

    body("is_recurring")

        .optional()

        .isBoolean()

        .withMessage(

            "Recurring Value Must Be Boolean"

        ),

    body("is_active")

        .optional()

        .isBoolean()

        .withMessage(

            "Active Value Must Be Boolean"

        )

];

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    createFeeCategoryValidator,

    updateFeeCategoryValidator

};