/*==========================================================
        GANGA MA.VI
        STUDENT VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        EMAIL REGEX
==========================================================*/

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/*==========================================================
        PHONE REGEX
==========================================================*/

const PHONE_REGEX = /^[0-9]{10}$/;

/*==========================================================
        VALIDATE STUDENT
==========================================================*/

const validateStudent = (student) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !student.student_code ||

        !student.student_code.trim()

    ) {

        errors.push("Student Code Is Required");

    }

    if (

        !student.first_name ||

        !student.first_name.trim()

    ) {

        errors.push("First Name Is Required");

    }

    if (

        !student.last_name ||

        !student.last_name.trim()

    ) {

        errors.push("Last Name Is Required");

    }

    if (

        !student.gender

    ) {

        errors.push("Gender Is Required");

    }

    if (

        !student.date_of_birth

    ) {

        errors.push("Date Of Birth Is Required");

    }

    if (

        !student.class_id

    ) {

        errors.push("Class Is Required");

    }

    if (

        !student.academic_year_id

    ) {

        errors.push("Academic Year Is Required");

    }

    if (

        !student.guardian_name ||

        !student.guardian_name.trim()

    ) {

        errors.push("Guardian Name Is Required");

    }

    if (

        !student.guardian_phone ||

        !student.guardian_phone.trim()

    ) {

        errors.push("Guardian Phone Is Required");

    }

    /*==============================================
            GENDER VALIDATION
    ==============================================*/

    if (

        student.gender &&

        !["Male", "Female", "Other"].includes(

            student.gender

        )

    ) {

        errors.push("Invalid Gender");

    }

    /*==============================================
            EMAIL VALIDATION
    ==============================================*/

    if (

        student.email &&

        !EMAIL_REGEX.test(

            student.email

        )

    ) {

        errors.push("Invalid Email Address");

    }

    /*==============================================
            PHONE VALIDATION
    ==============================================*/

    if (

        student.guardian_phone &&

        !PHONE_REGEX.test(

            student.guardian_phone

        )

    ) {

        errors.push("Invalid Guardian Phone Number");

    }

    /*==============================================
            BLOOD GROUP VALIDATION
    ==============================================*/

    if (

        student.blood_group &&

        ![

            "A+","A-",

            "B+","B-",

            "AB+","AB-",

            "O+","O-"

        ].includes(

            student.blood_group

        )

    ) {

        errors.push("Invalid Blood Group");

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

    validateStudent

};