/*==========================================================
        GANGA MA.VI
        STUDENT FEE CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGES
==========================================================*/

const { validationResult } = require("express-validator");

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createStudentFee,

    findStudentFeeById,

    getAllStudentFees,

    updateStudentFee,

    deleteStudentFee,

    getStudentFeeCount

} = require("../models/StudentFee");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE STUDENT FEE
==========================================================*/

const create = async (

    request,

    response

) => {

    try {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {

            return errorResponse(

                response,

                422,

                "Validation Failed",

                errors.array()

            );

        }

        const result = await createStudentFee(

            request.body

        );

        return successResponse(

            response,

            201,

            "Student Fee Created Successfully",

            result

        );

    }

    catch (error) {

        return errorResponse(

            response,

            500,

            error.message

        );

    }

};

/*==========================================================
        GET ALL STUDENT FEES
==========================================================*/

const getAll = async (

    request,

    response

) => {

    try {

        const rows = await getAllStudentFees();

        return successResponse(

            response,

            200,

            "Student Fee List",

            rows

        );

    }

    catch (error) {

        return errorResponse(

            response,

            500,

            error.message

        );

    }

};

/*==========================================================
        GET STUDENT FEE BY ID
==========================================================*/

const getById = async (

    request,

    response

) => {

    try {

        const fee = await findStudentFeeById(

            request.params.id

        );

        if (!fee) {

            return errorResponse(

                response,

                404,

                "Student Fee Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Student Fee Found",

            fee

        );

    }

    catch (error) {

        return errorResponse(

            response,

            500,

            error.message

        );

    }

};

/*==========================================================
        UPDATE STUDENT FEE
==========================================================*/

const update = async (

    request,

    response

) => {

    try {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {

            return errorResponse(

                response,

                422,

                "Validation Failed",

                errors.array()

            );

        }

        const fee = await findStudentFeeById(

            request.params.id

        );

        if (!fee) {

            return errorResponse(

                response,

                404,

                "Student Fee Not Found"

            );

        }

        await updateStudentFee(

            request.params.id,

            request.body

        );

        return successResponse(

            response,

            200,

            "Student Fee Updated Successfully"

        );

    }

    catch (error) {

        return errorResponse(

            response,

            500,

            error.message

        );

    }

};

/*==========================================================
        DELETE STUDENT FEE
==========================================================*/

const remove = async (

    request,

    response

) => {

    try {

        const fee = await findStudentFeeById(

            request.params.id

        );

        if (!fee) {

            return errorResponse(

                response,

                404,

                "Student Fee Not Found"

            );

        }

        await deleteStudentFee(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Student Fee Deleted Successfully"

        );

    }

    catch (error) {

        return errorResponse(

            response,

            500,

            error.message

        );

    }

};

/*==========================================================
        GET STUDENT FEE COUNT
==========================================================*/

const count = async (

    request,

    response

) => {

    try {

        const total = await getStudentFeeCount();

        return successResponse(

            response,

            200,

            "Student Fee Count",

            total

        );

    }

    catch (error) {

        return errorResponse(

            response,

            500,

            error.message

        );

    }

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    create,

    getAll,

    getById,

    update,

    remove,

    count

};