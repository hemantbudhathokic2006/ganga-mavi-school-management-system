/*==========================================================
        GANGA MA.VI
        CLASS CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createClass,

    findClassById,

    findClassByName,

    getAllClasses,

    updateClass,

    deleteClass,

    getClassCount

} = require("../models/Class");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateClass

} = require("../validators/classValidator");

/*==========================================================
        IMPORT RESPONSE UTILITY
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE CLASS
==========================================================*/

const createClassController = async (

    request,

    response

) => {

    try {

        /*==============================================
                REQUEST BODY
        ==============================================*/

        const classData = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateClass(classData);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                CHECK CLASS NAME
        ==============================================*/

        const existingClass = await findClassByName(

            classData.class_name

        );

        if (existingClass) {

            return errorResponse(

                response,

                409,

                "Class Already Exists"

            );

        }

        /*==============================================
                CREATE CLASS
        ==============================================*/

        const result = await createClass(classData);

        /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

        return successResponse(

            response,

            201,

            "Class Created Successfully",

            {

                class_id: result.insertId

            }

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};

/*==========================================================
        GET ALL CLASSES
==========================================================*/

const getAllClassesController = async (

    request,

    response

) => {

    try {

        const classes = await getAllClasses();

        return successResponse(

            response,

            200,

            "Classes Retrieved Successfully",

            classes

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        GET CLASS BY ID
==========================================================*/

const getClassByIdController = async (

    request,

    response

) => {

    try {

        const classData = await findClassById(

            request.params.id

        );

        if (!classData) {

            return errorResponse(

                response,

                404,

                "Class Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Class Retrieved Successfully",

            classData

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        UPDATE CLASS
==========================================================*/

const updateClassController = async (

    request,

    response

) => {

    try {

        const validation = validateClass(

            request.body

        );

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        const classData = await findClassById(

            request.params.id

        );

        if (!classData) {

            return errorResponse(

                response,

                404,

                "Class Not Found"

            );

        }

        await updateClass(

            request.params.id,

            request.body

        );

        return successResponse(

            response,

            200,

            "Class Updated Successfully"

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};

/*==========================================================
        DELETE CLASS
==========================================================*/

const deleteClassController = async (

    request,

    response

) => {

    try {

        const classData = await findClassById(

            request.params.id

        );

        if (!classData) {

            return errorResponse(

                response,

                404,

                "Class Not Found"

            );

        }

        await deleteClass(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Class Deleted Successfully"

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        GET CLASS COUNT
==========================================================*/

const getClassCountController = async (

    request,

    response

) => {

    try {

        const total = await getClassCount();

        return successResponse(

            response,

            200,

            "Class Count Retrieved Successfully",

            {

                total

            }

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    createClassController,

    getAllClassesController,

    getClassByIdController,

    updateClassController,

    deleteClassController,

    getClassCountController

};