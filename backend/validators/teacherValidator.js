/*==========================================================
        GANGA MA.VI
        TEACHER CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT TEACHER MODEL
==========================================================*/

const {
  createTeacher,

  findTeacherById,

  findTeacherByTeacherCode,

  findTeacherByUserId,

  getAllTeachers,

  searchTeachers,

  updateTeacher,

  deleteTeacher,

  getTeacherCount,
} = require("../models/Teacher");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const { validateTeacher } = require("../validators/teacherValidator");

/*==========================================================
        IMPORT RESPONSE UTILITY
==========================================================*/

const {
  successResponse,

  errorResponse,
} = require("../utils/response");

/*==========================================================
        CREATE TEACHER
==========================================================*/

const createTeacherController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                REQUEST BODY
        ==============================================*/

    const teacher = request.body;

    /*==============================================
                VALIDATE DATA
        ==============================================*/

    const validation = validateTeacher(teacher);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    /*==============================================
                CHECK TEACHER CODE
        ==============================================*/

    const existingTeacher = await findTeacherByTeacherCode(
      teacher.teacher_code,
    );

    if (existingTeacher) {
      return errorResponse(
        response,

        409,

        "Teacher Code Already Exists",
      );
    }

    /*==============================================
                CHECK USER
        ==============================================*/

    const existingUser = await findTeacherByUserId(teacher.user_id);

    if (existingUser) {
      return errorResponse(
        response,

        409,

        "Teacher Already Assigned To This User",
      );
    }

    /*==============================================
                CREATE TEACHER
        ==============================================*/

    const result = await createTeacher(teacher);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      201,

      "Teacher Created Successfully",

      {
        teacher_id: result.insertId,
      },
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};
/*==========================================================
        GET ALL TEACHERS
==========================================================*/

const getAllTeachersController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                GET TEACHERS
        ==============================================*/

    const teachers = await getAllTeachers();

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Teachers Retrieved Successfully",

      teachers,
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};
/*==========================================================
        GET TEACHER BY ID
==========================================================*/

const getTeacherByIdController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                GET ID
        ==============================================*/

    const { id } = request.params;

    /*==============================================
                FIND TEACHER
        ==============================================*/

    const teacher = await findTeacherById(id);

    /*==============================================
                CHECK TEACHER
        ==============================================*/

    if (!teacher) {
      return errorResponse(
        response,

        404,

        "Teacher Not Found",
      );
    }

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Teacher Retrieved Successfully",

      teacher,
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};
/*==========================================================
        SEARCH TEACHERS
==========================================================*/

const searchTeachersController = async (request, response) => {
  try {
    const { keyword } = request.query;

    const teachers = await searchTeachers(keyword || "");

    return successResponse(
      response,

      200,

      "Teachers Retrieved Successfully",

      teachers,
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};

/*==========================================================
        UPDATE TEACHER
==========================================================*/

const updateTeacherController = async (request, response) => {
  try {
    const { id } = request.params;

    const teacher = request.body;

    const existingTeacher = await findTeacherById(id);

    if (!existingTeacher) {
      return errorResponse(
        response,

        404,

        "Teacher Not Found",
      );
    }

    const validation = validateTeacher(teacher);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    await updateTeacher(id, teacher);

    return successResponse(
      response,

      200,

      "Teacher Updated Successfully",
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};
/*==========================================================
        DELETE TEACHER
==========================================================*/

const deleteTeacherController = async (request, response) => {
  try {
    const { id } = request.params;

    const existingTeacher = await findTeacherById(id);

    if (!existingTeacher) {
      return errorResponse(
        response,

        404,

        "Teacher Not Found",
      );
    }

    await deleteTeacher(id);

    return successResponse(
      response,

      200,

      "Teacher Deleted Successfully",
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};
/*==========================================================
        GET TEACHER COUNT
==========================================================*/

const getTeacherCountController = async (request, response) => {
  try {
    const total = await getTeacherCount();

    return successResponse(
      response,

      200,

      "Teacher Count Retrieved Successfully",

      { total },
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      response,

      500,

      "Internal Server Error",
    );
  }
};
/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  createTeacherController,

  getAllTeachersController,

  getTeacherByIdController,

  searchTeachersController,

  updateTeacherController,

  deleteTeacherController,

  getTeacherCountController,
};
