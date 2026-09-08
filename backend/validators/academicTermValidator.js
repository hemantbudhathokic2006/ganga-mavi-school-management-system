/*==========================================================
        GANGA MA.VI
        ACADEMIC TERM VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE ACADEMIC TERM
==========================================================*/

const validateAcademicTerm = (term) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (!term.academic_year_id) {

        errors.push("Academic Year Is Required");

    }

    if (

        !term.term_name ||

        !term.term_name.trim()

    ) {

        errors.push("Term Name Is Required");

    }

    if (

        !term.term_code ||

        !term.term_code.trim()

    ) {

        errors.push("Term Code Is Required");

    }

    if (

        term.display_order === undefined ||

        term.display_order === null

    ) {

        errors.push("Display Order Is Required");

    }

    /*==============================================
            DATE VALIDATION
    ==============================================*/

    if (

        term.start_date &&

        term.end_date

    ) {

        const start = new Date(term.start_date);

        const end = new Date(term.end_date);

        if (start > end) {

            errors.push(

                "Start Date Cannot Be Greater Than End Date"

            );

        }

    }

    /*==============================================
            DISPLAY ORDER
    ==============================================*/

    if (

        Number(term.display_order) <= 0

    ) {

        errors.push(

            "Invalid Display Order"

        );

    }

    /*==============================================
            RETURN
    ==============================================*/

    return {

        isValid: errors.length === 0,

        errors

    };

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    validateAcademicTerm

};