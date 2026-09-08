/*==========================================================
        GANGA MA.VI
        EXAMINATION VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE EXAM
==========================================================*/

const validateExam = (exam) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !exam.exam_name ||

        !exam.exam_name.trim()

    ) {

        errors.push("Exam Name Is Required");

    }

    if (!exam.class_id) {

        errors.push("Class Is Required");

    }

    if (

        !exam.academic_year ||

        !exam.academic_year.trim()

    ) {

        errors.push("Academic Year Is Required");

    }

    /*==============================================
            DATE VALIDATION
    ==============================================*/

    if (

        exam.start_date &&

        exam.end_date

    ) {

        const startDate = new Date(exam.start_date);

        const endDate = new Date(exam.end_date);

        if (startDate > endDate) {

            errors.push(

                "Start Date Cannot Be Greater Than End Date"

            );

        }

    }

    /*==============================================
            RETURN RESULT
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

    validateExam

};