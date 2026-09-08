/*==========================================================
        GANGA MA.VI
        PARENT VALIDATOR
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
        VALIDATE PARENT
==========================================================*/

const validateParent = (parent) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !parent.first_name ||

        !parent.first_name.trim()

    ) {

        errors.push("First Name Is Required");

    }

    if (

        !parent.last_name ||

        !parent.last_name.trim()

    ) {

        errors.push("Last Name Is Required");

    }

    if (

        !parent.phone ||

        !parent.phone.trim()

    ) {

        errors.push("Phone Number Is Required");

    }

    if (

        !parent.address ||

        !parent.address.trim()

    ) {

        errors.push("Address Is Required");

    }

    /*==============================================
            EMAIL VALIDATION
    ==============================================*/

    if (

        parent.email &&

        !EMAIL_REGEX.test(

            parent.email

        )

    ) {

        errors.push("Invalid Email Address");

    }

    /*==============================================
            PHONE VALIDATION
    ==============================================*/

    if (

        parent.phone &&

        !PHONE_REGEX.test(

            parent.phone

        )

    ) {

        errors.push("Invalid Phone Number");

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

    validateParent

};