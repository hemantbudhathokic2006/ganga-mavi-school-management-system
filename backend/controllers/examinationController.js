/*==========================================================
        GANGA MA.VI
        EXAMINATION CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createExam,

    findExamById,

    findExamByName,

    getAllExams,

    updateExam,

    deleteExam,

    getExamCount

} = require("../models/Examination");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateExam

} = require("../validators/examinationValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE EXAM
==========================================================*/

const createExamController = async (

    request,

    response

) => {

    try {

        const exam = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateExam(exam);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                CHECK DUPLICATE
        ==============================================*/

        const existingExam = await findExamByName(

            exam.exam_name,

            exam.class_id,

            exam.academic_year

        );

        if (existingExam) {

            return errorResponse(

                response,

                409,

                "Exam Already Exists"

            );

        }

        /*==============================================
                CREATE EXAM
        ==============================================*/

        const result = await createExam(exam);

        return successResponse(

            response,

            201,

            "Exam Created Successfully",

            {

                exam_id: result.insertId

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
        GET ALL EXAMS
==========================================================*/

const getAllExamsController = async (

    request,

    response

) => {

    try {

        const exams = await getAllExams();

        return successResponse(

            response,

            200,

            "Exam List Retrieved Successfully",

            exams

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
        GET EXAM BY ID
==========================================================*/

const getExamByIdController = async (

    request,

    response

) => {

    try {

        const exam = await findExamById(

            request.params.id

        );

        if (!exam) {

            return errorResponse(

                response,

                404,

                "Exam Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Exam Retrieved Successfully",

            exam

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
        UPDATE EXAM
==========================================================*/

const updateExamController = async (

    request,

    response

) => {

    try {

        const examId = request.params.id;

        const exam = request.body;

        /*==============================================
                CHECK EXAM
        ==============================================*/

        const existingExam = await findExamById(

            examId

        );

        if (!existingExam) {

            return errorResponse(

                response,

                404,

                "Exam Not Found"

            );

        }

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateExam(exam);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                UPDATE EXAM
        ==============================================*/

        await updateExam(

            examId,

            exam

        );

        return successResponse(

            response,

            200,

            "Exam Updated Successfully"

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
        DELETE EXAM
==========================================================*/

const deleteExamController = async (

    request,

    response

) => {

    try {

        const examId = request.params.id;

        /*==============================================
                CHECK EXAM
        ==============================================*/

        const existingExam = await findExamById(

            examId

        );

        if (!existingExam) {

            return errorResponse(

                response,

                404,

                "Exam Not Found"

            );

        }

        /*==============================================
                DELETE EXAM
        ==============================================*/

        await deleteExam(

            examId

        );

        return successResponse(

            response,

            200,

            "Exam Deleted Successfully"

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
        GET EXAM COUNT
==========================================================*/

const getExamCountController = async (

    request,

    response

) => {

    try {

        const total = await getExamCount();

        return successResponse(

            response,

            200,

            "Exam Count Retrieved Successfully",

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

    createExamController,

    getAllExamsController,

    getExamByIdController,

    updateExamController,

    deleteExamController,

    getExamCountController

};