/*==========================================================
        GANGA MA.VI
        ACADEMIC YEAR CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createAcademicYear,

    findAcademicYearById,

    findAcademicYearByName,

    getAllAcademicYears,

    updateAcademicYear,

    deleteAcademicYear,

    getAcademicYearCount

} = require("../models/AcademicYear");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateAcademicYear

} = require("../validators/academicYearValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE ACADEMIC YEAR
==========================================================*/

const createAcademicYearController = async (

    request,

    response

) => {

    try {

        const academicYear = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateAcademicYear(

            academicYear

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
                CHECK DUPLICATE
        ==============================================*/

        const existingAcademicYear =

            await findAcademicYearByName(

                academicYear.academic_year_name

            );

        if (existingAcademicYear) {

            return errorResponse(

                response,

                409,

                "Academic Year Already Exists"

            );

        }

        /*==============================================
                CREATE
        ==============================================*/

        const result = await createAcademicYear(

            academicYear

        );

        return successResponse(

            response,

            201,

            "Academic Year Created Successfully",

            {

                academic_year_id:

                    result.insertId

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
        GET ALL ACADEMIC YEARS
==========================================================*/

const getAllAcademicYearsController = async (

    request,

    response

) => {

    try {

        const academicYears =

            await getAllAcademicYears();

        return successResponse(

            response,

            200,

            "Academic Years Retrieved Successfully",

            academicYears

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
        GET ACADEMIC YEAR BY ID
==========================================================*/

const getAcademicYearByIdController = async (

    request,

    response

) => {

    try {

        const academicYear =

            await findAcademicYearById(

                request.params.id

            );

        if (!academicYear) {

            return errorResponse(

                response,

                404,

                "Academic Year Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Academic Year Retrieved Successfully",

            academicYear

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
        UPDATE ACADEMIC YEAR
==========================================================*/

const updateAcademicYearController = async (

    request,

    response

) => {

    try {

        const academicYearId = request.params.id;

        const academicYear = request.body;

        /*==============================================
                CHECK ACADEMIC YEAR
        ==============================================*/

        const existingAcademicYear =

            await findAcademicYearById(

                academicYearId

            );

        if (!existingAcademicYear) {

            return errorResponse(

                response,

                404,

                "Academic Year Not Found"

            );

        }

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateAcademicYear(

            academicYear

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
                UPDATE ACADEMIC YEAR
        ==============================================*/

        await updateAcademicYear(

            academicYearId,

            academicYear

        );

        return successResponse(

            response,

            200,

            "Academic Year Updated Successfully"

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
        DELETE ACADEMIC YEAR
==========================================================*/

const deleteAcademicYearController = async (

    request,

    response

) => {

    try {

        const academicYearId = request.params.id;

        /*==============================================
                CHECK ACADEMIC YEAR
        ==============================================*/

        const existingAcademicYear =

            await findAcademicYearById(

                academicYearId

            );

        if (!existingAcademicYear) {

            return errorResponse(

                response,

                404,

                "Academic Year Not Found"

            );

        }

        /*==============================================
                DELETE ACADEMIC YEAR
        ==============================================*/

        await deleteAcademicYear(

            academicYearId

        );

        return successResponse(

            response,

            200,

            "Academic Year Deleted Successfully"

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
        GET ACADEMIC YEAR COUNT
==========================================================*/

const getAcademicYearCountController = async (

    request,

    response

) => {

    try {

        const total = await getAcademicYearCount();

        return successResponse(

            response,

            200,

            "Academic Year Count Retrieved Successfully",

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

    createAcademicYearController,

    getAllAcademicYearsController,

    getAcademicYearByIdController,

    updateAcademicYearController,

    deleteAcademicYearController,

    getAcademicYearCountController

};