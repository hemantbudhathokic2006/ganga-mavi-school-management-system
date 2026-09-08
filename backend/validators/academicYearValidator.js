/*==========================================================
        GANGA MA.VI
        ACADEMIC YEAR VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE ACADEMIC YEAR
==========================================================*/

const validateAcademicYear = (academicYear) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !academicYear.academic_year_name ||

        !academicYear.academic_year_name.trim()

    ) {

        errors.push("Academic Year Name Is Required");

    }

    if (

        !academicYear.start_date

    ) {

        errors.push("Start Date Is Required");

    }

    if (

        !academicYear.end_date

    ) {

        errors.push("End Date Is Required");

    }

    /*==============================================
            DATE VALIDATION
    ==============================================*/

    if (

        academicYear.start_date &&

        academicYear.end_date

    ) {

        const startDate = new Date(

            academicYear.start_date

        );

        const endDate = new Date(

            academicYear.end_date

        );

        if (

            startDate > endDate

        ) {

            errors.push(

                "Start Date Cannot Be Greater Than End Date"

            );

        }

    }

    /*==============================================
            BOOLEAN VALIDATION
    ==============================================*/

    if (

        academicYear.is_current !== undefined &&

        typeof academicYear.is_current !== "boolean"

    ) {

        errors.push(

            "Invalid Current Status"

        );

    }

    if (

        academicYear.is_active !== undefined &&

        typeof academicYear.is_active !== "boolean"

    ) {

        errors.push(

            "Invalid Active Status"

        );

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

    validateAcademicYear

};