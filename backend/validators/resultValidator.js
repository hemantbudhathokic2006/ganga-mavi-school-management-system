/*==========================================================
        GANGA MA.VI
        RESULT VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE RESULT
==========================================================*/

const validateResult = (result) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (!result.student_id) {

        errors.push("Student Is Required");

    }

    if (!result.exam_type_id) {

        errors.push("Exam Type Is Required");

    }

    if (

        result.total_full_marks === undefined ||

        result.total_full_marks === null

    ) {

        errors.push("Total Full Marks Is Required");

    }

    if (

        result.total_obtained_marks === undefined ||

        result.total_obtained_marks === null

    ) {

        errors.push("Total Obtained Marks Is Required");

    }

    if (

        result.percentage === undefined ||

        result.percentage === null

    ) {

        errors.push("Percentage Is Required");

    }

    /*==============================================
            MARK VALIDATION
    ==============================================*/

    if (

        Number(result.total_full_marks) <= 0

    ) {

        errors.push("Invalid Total Full Marks");

    }

    if (

        Number(result.total_obtained_marks) < 0

    ) {

        errors.push("Invalid Obtained Marks");

    }

    if (

        Number(result.total_obtained_marks) >

        Number(result.total_full_marks)

    ) {

        errors.push(

            "Obtained Marks Cannot Be Greater Than Full Marks"

        );

    }

    /*==============================================
            PERCENTAGE VALIDATION
    ==============================================*/

    if (

        Number(result.percentage) < 0 ||

        Number(result.percentage) > 100

    ) {

        errors.push("Invalid Percentage");

    }

    /*==============================================
            GRADE POINT VALIDATION
    ==============================================*/

    if (

        result.grade_point !== undefined &&

        result.grade_point !== null &&

        Number(result.grade_point) < 0

    ) {

        errors.push("Invalid Grade Point");

    }

    /*==============================================
            RESULT STATUS
    ==============================================*/

    if (

        result.result_status &&

        ![

            "Pass",

            "Fail",

            "Incomplete"

        ].includes(result.result_status)

    ) {

        errors.push("Invalid Result Status");

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

    validateResult

};