/*==========================================================
        GANGA MA.VI
        SUBJECT VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE SUBJECT
==========================================================*/

const validateSubject = (subject) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !subject.subject_code ||

        !subject.subject_code.trim()

    ) {

        errors.push("Subject Code Is Required");

    }

    if (

        !subject.subject_name ||

        !subject.subject_name.trim()

    ) {

        errors.push("Subject Name Is Required");

    }

    /*==============================================
            SUBJECT TYPE VALIDATION
    ==============================================*/

    if (

        subject.subject_type &&

        ![

            "Compulsory",

            "Optional",

            "Practical",

            "Extra"

        ].includes(subject.subject_type)

    ) {

        errors.push("Invalid Subject Type");

    }

    /*==============================================
            FULL MARKS VALIDATION
    ==============================================*/

    if (

        subject.full_marks !== undefined &&

        Number(subject.full_marks) <= 0

    ) {

        errors.push("Full Marks Must Be Greater Than Zero");

    }

    /*==============================================
            PASS MARKS VALIDATION
    ==============================================*/

    if (

        subject.pass_marks !== undefined &&

        Number(subject.pass_marks) < 0

    ) {

        errors.push("Invalid Pass Marks");

    }

    if (

        subject.full_marks !== undefined &&

        subject.pass_marks !== undefined &&

        Number(subject.pass_marks) >

        Number(subject.full_marks)

    ) {

        errors.push(

            "Pass Marks Cannot Be Greater Than Full Marks"

        );

    }

    /*==============================================
            CREDIT HOURS VALIDATION
    ==============================================*/

    if (

        subject.credit_hours !== undefined &&

        Number(subject.credit_hours) <= 0

    ) {

        errors.push("Invalid Credit Hours");s

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

    validateSubject

};