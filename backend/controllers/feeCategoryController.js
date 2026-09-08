/*==========================================================
        GANGA MA.VI
        FEE CATEGORY CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const { validationResult } = require("express-validator");

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createFeeCategory,

    findFeeCategoryById,

    findFeeCategoryByCode,

    getAllFeeCategories,

    updateFeeCategory,

    deleteFeeCategory,

    getFeeCategoryCount

} = require("../models/FeeCategory");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE FEE CATEGORY
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

        const exists = await findFeeCategoryByCode(

            request.body.category_code

        );

        if (exists) {

            return errorResponse(

                response,

                409,

                "Fee Category Code Already Exists"

            );

        }

        const result = await createFeeCategory(

            request.body

        );

        return successResponse(

            response,

            201,

            "Fee Category Created Successfully",

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
        GET ALL FEE CATEGORIES
==========================================================*/

const getAll = async (

    request,

    response

) => {

    try {

        const rows = await getAllFeeCategories();

        return successResponse(

            response,

            200,

            "Fee Category List",

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
        GET FEE CATEGORY BY ID
==========================================================*/

const getById = async (

    request,

    response

) => {

    try {

        const row = await findFeeCategoryById(

            request.params.id

        );

        if (!row) {

            return errorResponse(

                response,

                404,

                "Fee Category Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Fee Category Found",

            row

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
        UPDATE FEE CATEGORY
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

        const row = await findFeeCategoryById(

            request.params.id

        );

        if (!row) {

            return errorResponse(

                response,

                404,

                "Fee Category Not Found"

            );

        }

        await updateFeeCategory(

            request.params.id,

            request.body

        );

        return successResponse(

            response,

            200,

            "Fee Category Updated Successfully"

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
        DELETE FEE CATEGORY
==========================================================*/

const remove = async (

    request,

    response

) => {

    try {

        const row = await findFeeCategoryById(

            request.params.id

        );

        if (!row) {

            return errorResponse(

                response,

                404,

                "Fee Category Not Found"

            );

        }

        await deleteFeeCategory(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Fee Category Deleted Successfully"

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
        GET FEE CATEGORY COUNT
==========================================================*/

const count = async (

    request,

    response

) => {

    try {

        const total = await getFeeCategoryCount();

        return successResponse(

            response,

            200,

            "Fee Category Count",

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