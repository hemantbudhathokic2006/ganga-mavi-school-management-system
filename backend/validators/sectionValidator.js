/*==========================================================
        GANGA MA.VI
        SECTION VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE SECTION
==========================================================*/

const validateSection = (section) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !section.class_id

    ) {

        errors.push("Class Is Required");

    }

    if (

        !section.section_name ||

        !section.section_name.trim()

    ) {

        errors.push("Section Name Is Required");

    }

    /*==============================================
            LENGTH VALIDATION
    ==============================================*/

    if (

        section.section_name &&

        section.section_name.length > 20

    ) {

        errors.push("Section Name Must Be Less Than 20 Characters");

    }

    /*==============================================
            RETURN RESULT
    ==============================================*/

    return {

        isValid:

            errors.length === 0,

        errors

    };

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    validateSection

};

