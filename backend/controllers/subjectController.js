/*==========================================================
        GANGA MA.VI
        SUBJECT CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createSubject,

    findSubjectById,

    findSubjectByCode,

    getAllSubjects,

    searchSubjects,

    updateSubject,

    deleteSubject,

    getSubjectCount

} = require("../models/Subject");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateSubject

} = require("../validators/subjectValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE SUBJECT
==========================================================*/

const createSubjectController = async (

    request,

    response

) => {

    try {

        const subject = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateSubject(subject);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                CHECK SUBJECT CODE
        ==============================================*/

        const existingSubject = await findSubjectByCode(

            subject.subject_code

        );

        if (existingSubject) {

            return errorResponse(

                response,

                409,

                "Subject Code Already Exists"

            );

        }

        /*==============================================
                CREATE SUBJECT
        ==============================================*/

        const result = await createSubject(subject);

        return successResponse(

            response,

            201,

            "Subject Created Successfully",

            {

                subject_id: result.insertId

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
        GET ALL SUBJECTS
==========================================================*/

const getAllSubjectsController = async (

    request,

    response

) => {

    try {

        const subjects = await getAllSubjects();

        return successResponse(

            response,

            200,

            "Subjects Retrieved Successfully",

            subjects

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
        GET SUBJECT BY ID
==========================================================*/

const getSubjectByIdController = async (

    request,

    response

) => {

    try {

        const subject = await findSubjectById(

            request.params.id

        );

        if (!subject) {

            return errorResponse(

                response,

                404,

                "Subject Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Subject Retrieved Successfully",

            subject

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
        SEARCH SUBJECTS
==========================================================*/

const searchSubjectsController = async (

    request,

    response

) => {

    try {

        const keyword = request.query.keyword || "";

        const subjects = await searchSubjects(keyword);

        return successResponse(

            response,

            200,

            "Subjects Retrieved Successfully",

            subjects

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
        UPDATE SUBJECT
==========================================================*/

const updateSubjectController = async (

    request,

    response

) => {

    try {

        const validation = validateSubject(request.body);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        const subject = await findSubjectById(

            request.params.id

        );

        if (!subject) {

            return errorResponse(

                response,

                404,

                "Subject Not Found"

            );

        }

        await updateSubject(

            request.params.id,

            request.body

        );

        return successResponse(

            response,

            200,

            "Subject Updated Successfully"

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
        DELETE SUBJECT
==========================================================*/

const deleteSubjectController = async (

    request,

    response

) => {

    try {

        const subject = await findSubjectById(

            request.params.id

        );

        if (!subject) {

            return errorResponse(

                response,

                404,

                "Subject Not Found"

            );

        }

        await deleteSubject(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Subject Deleted Successfully"

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
        GET SUBJECT COUNT
==========================================================*/

const getSubjectCountController = async (

    request,

    response

) => {

    try {

        const total = await getSubjectCount();

        return successResponse(

            response,

            200,

            "Subject Count Retrieved Successfully",

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

    createSubjectController,

    getAllSubjectsController,

    getSubjectByIdController,

    searchSubjectsController,

    updateSubjectController,

    deleteSubjectController,

    getSubjectCountController

};