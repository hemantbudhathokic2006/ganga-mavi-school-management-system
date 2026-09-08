/*==========================================================
        GANGA MA.VI
        SECTION CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createSection,

    findSectionById,

    findSection,

    getAllSections,

    getSectionsByClass,

    updateSection,

    deleteSection,

    getSectionCount

} = require("../models/Section");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateSection

} = require("../validators/sectionValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE SECTION
==========================================================*/

const createSectionController = async (

    request,

    response

) => {

    try {

        const section = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateSection(section);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                CHECK EXISTING SECTION
        ==============================================*/

        const existingSection = await findSection(

            section.class_id,

            section.section_name

        );

        if (existingSection) {

            return errorResponse(

                response,

                409,

                "Section Already Exists"

            );

        }

        /*==============================================
                CREATE SECTION
        ==============================================*/

        const result = await createSection(section);

        return successResponse(

            response,

            201,

            "Section Created Successfully",

            {

                section_id: result.insertId

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
        GET ALL SECTIONS
==========================================================*/

const getAllSectionsController = async (

    request,

    response

) => {

    try {

        const sections = await getAllSections();

        return successResponse(

            response,

            200,

            "Sections Retrieved Successfully",

            sections

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
        GET SECTION BY ID
==========================================================*/

const getSectionByIdController = async (

    request,

    response

) => {

    try {

        const section = await findSectionById(

            request.params.id

        );

        if (!section) {

            return errorResponse(

                response,

                404,

                "Section Not Found"

            );

        }

        return successResponse(

            response,

            200,

            "Section Retrieved Successfully",

            section

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
        GET SECTIONS BY CLASS
==========================================================*/

const getSectionsByClassController = async (

    request,

    response

) => {

    try {

        const sections = await getSectionsByClass(

            request.params.classId

        );

        return successResponse(

            response,

            200,

            "Sections Retrieved Successfully",

            sections

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
        UPDATE SECTION
==========================================================*/

const updateSectionController = async (

    request,

    response

) => {

    try {

        const validation = validateSection(

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

        const section = await findSectionById(

            request.params.id

        );

        if (!section) {

            return errorResponse(

                response,

                404,

                "Section Not Found"

            );

        }

        await updateSection(

            request.params.id,

            request.body

        );

        return successResponse(

            response,

            200,

            "Section Updated Successfully"

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
        DELETE SECTION
==========================================================*/

const deleteSectionController = async (

    request,

    response

) => {

    try {

        const section = await findSectionById(

            request.params.id

        );

        if (!section) {

            return errorResponse(

                response,

                404,

                "Section Not Found"

            );

        }

        await deleteSection(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Section Deleted Successfully"

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
        GET SECTION COUNT
==========================================================*/

const getSectionCountController = async (

    request,

    response

) => {

    try {

        const total = await getSectionCount();

        return successResponse(

            response,

            200,

            "Section Count Retrieved Successfully",

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

    createSectionController,

    getAllSectionsController,

    getSectionByIdController,

    getSectionsByClassController,

    updateSectionController,

    deleteSectionController,

    getSectionCountController

};