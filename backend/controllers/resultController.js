/*==========================================================
        GANGA MA.VI
        RESULT CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createResult,

    findResultById,

    findStudentResult,

    getAllResults,

    updateResult,

    deleteResult,

    getResultCount

} = require("../models/Result");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateResult

} = require("../validators/resultValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE RESULT
==========================================================*/

const createResultController = async (

    request,

    response

) => {

    try {

        const result = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateResult(result);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                CHECK DUPLICATE RESULT
        ==============================================*/

        const existingResult = await findStudentResult(

            result.student_id,

            result.exam_type_id

        );

        if (existingResult) {

            return errorResponse(

                response,

                409,

                "Result Already Exists"

            );

        }

        /*==============================================
                CREATE RESULT
        ==============================================*/

        const createdResult = await createResult(result);

        return successResponse(

            response,

            201,

            "Result Created Successfully",

            {

                result_id: createdResult.insertId

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
        GET ALL RESULTS
==========================================================*/

const getAllResultsController = async (

    request,

    response

) => {

    try {

        const results = await getAllResults();

        return successResponse(

            response,

            200,

            "Results Retrieved Successfully",

            results

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
        GET RESULT BY ID
==========================================================*/

const getResultByIdController = async (

    request,

    response

) => {

    try {

        const result = await findResultById(

            request.params.id

        );

        if (!result) {

            return errorResponse(

                response,

                404,

                "Result Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Result Retrieved Successfully",

            result

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
        UPDATE RESULT
==========================================================*/

const updateResultController = async (

    request,

    response

) => {

    try {

        const resultId = request.params.id;

        const resultData = request.body;

        /*==============================================
                CHECK RESULT
        ==============================================*/

        const existingResult = await findResultById(

            resultId

        );

        if (!existingResult) {

            return errorResponse(

                response,

                404,

                "Result Not Found"

            );

        }

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateResult(

            resultData

        );

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                UPDATE RESULT
        ==============================================*/

        await updateResult(

            resultId,

            resultData

        );

        return successResponse(

            response,

            200,

            "Result Updated Successfully"

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
        DELETE RESULT
==========================================================*/

const deleteResultController = async (

    request,

    response

) => {

    try {

        const resultId = request.params.id;

        /*==============================================
                CHECK RESULT
        ==============================================*/

        const existingResult = await findResultById(

            resultId

        );

        if (!existingResult) {

            return errorResponse(

                response,

                404,

                "Result Not Found"

            );

        }

        /*==============================================
                DELETE RESULT
        ==============================================*/

        await deleteResult(

            resultId

        );

        return successResponse(

            response,

            200,

            "Result Deleted Successfully"

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
        GET RESULT COUNT
==========================================================*/

const getResultCountController = async (

    request,

    response

) => {

    try {

        const total = await getResultCount();

        return successResponse(

            response,

            200,

            "Result Count Retrieved Successfully",

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

    createResultController,

    getAllResultsController,

    getResultByIdController,

    updateResultController,

    deleteResultController,

    getResultCountController

};