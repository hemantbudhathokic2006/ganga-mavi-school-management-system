/*==========================================================
        GANGA MA.VI
        CLASS VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE CLASS
==========================================================*/

const validateClass = (classData) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (

        !classData.class_name ||

        !classData.class_name.trim()

    ) {

        errors.push("Class Name Is Required");

    }

    /*==============================================
            LENGTH VALIDATION
    ==============================================*/

    if (

        classData.class_name &&

        classData.class_name.length > 50

    ) {

        errors.push("Class Name Must Be Less Than 50 Characters");

    }

    if (

        classData.description &&

        classData.description.length > 255

    ) {

        errors.push("Description Must Be Less Than 255 Characters");

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

    validateClass

};