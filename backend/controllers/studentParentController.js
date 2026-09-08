/*==========================================================
        GANGA MA.VI
        STUDENT PARENT CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    createRelationship,

    getParentsByStudent,

    getStudentsByParent,

    checkRelationship,

    deleteRelationship

} = require("../models/StudentParent");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        CREATE RELATIONSHIP
==========================================================*/

const createRelationshipController = async (

    request,

    response

) => {

    try {

        const relation = request.body;

        /*==============================================
                CHECK DUPLICATE
        ==============================================*/

        const existing = await checkRelationship(

            relation.student_id,

            relation.parent_id,

            relation.relationship

        );

        if (existing) {

            return errorResponse(

                response,

                409,

                "Relationship Already Exists"

            );

        }

        /*==============================================
                CREATE RELATIONSHIP
        ==============================================*/

        const result = await createRelationship(

            relation

        );

        return successResponse(

            response,

            201,

            "Relationship Created Successfully",

            {

                relationship_id:

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
        GET PARENTS BY STUDENT
==========================================================*/

const getParentsByStudentController = async (

    request,

    response

) => {

    try {

        const parents = await getParentsByStudent(

            request.params.studentId

        );

        return successResponse(

            response,

            200,

            "Parents Retrieved Successfully",

            parents

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
        GET STUDENTS BY PARENT
==========================================================*/

const getStudentsByParentController = async (

    request,

    response

) => {

    try {

        const students = await getStudentsByParent(

            request.params.parentId

        );

        return successResponse(

            response,

            200,

            "Students Retrieved Successfully",

            students

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
        DELETE RELATIONSHIP
==========================================================*/

const deleteRelationshipController = async (

    request,

    response

) => {

    try {

        await deleteRelationship(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Relationship Deleted Successfully"

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

    createRelationshipController,

    getParentsByStudentController,

    getStudentsByParentController,

    deleteRelationshipController

};