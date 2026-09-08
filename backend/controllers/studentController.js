/*==========================================================
        GANGA MA.VI
        STUDENT CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODELS
==========================================================*/
const {
  createStudent,

  findStudentById,

  findStudentByAdmissionNumber,

  findStudentByEmail,

  findStudentByEmailExceptId,

  getAllStudents,

  getStudentsByClass,

  searchStudents,

  updateStudent,

  updateStudentStatus,

  deleteStudent,

  getStudentCount,
} = require("../models/Student");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const { validateStudent } = require("../validators/studentValidator");

/*==========================================================
        IMPORT RESPONSE UTILITY
==========================================================*/

const {
  successResponse,

  errorResponse,
} = require("../utils/response");

/*==========================================================
        CREATE STUDENT
==========================================================*/

const createStudentController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                REQUEST BODY
        ==============================================*/

    const student = request.body;

    /*==============================================
        TRIM STRING VALUES
==============================================*/

    Object.keys(student).forEach((key) => {
      if (typeof student[key] === "string") {
        student[key] = student[key].trim();
      }
    });

    /*==============================================
        TRIM INPUT DATA
==============================================*/

    Object.keys(student).forEach((key) => {
      if (typeof student[key] === "string") {
        student[key] = student[key].trim();
      }
    });
    /*==============================================
                VALIDATE DATA
        ==============================================*/

    const validation = validateStudent(student);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    /*==============================================
                CHECK ADMISSION NUMBER
        ==============================================*/

    const existingAdmission = await findStudentByAdmissionNumber(
      student.admission_number,
    );

    if (existingAdmission) {
      return errorResponse(
        response,

        409,

        "Admission Number Already Exists",
      );
    }

    /*==============================================
                CHECK EMAIL
        ==============================================*/

    if (student.email) {
      const existingEmail = await findStudentByEmail(student.email);

      if (existingEmail) {
        return errorResponse(
          response,

          409,

          "Email Already Exists",
        );
      }
    }

    /*==============================================
                CREATE STUDENT
        ==============================================*/

    const result = await createStudent(student);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      201,

      "Student Created Successfully",

      {
        student_id: result.insertId,
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
        GET ALL STUDENTS
==========================================================*/

const getAllStudentsController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                GET STUDENTS
        ==============================================*/

    const students = await getAllStudents();

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Students Retrieved Successfully",

      students,
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
        GET STUDENT BY ID
==========================================================*/

const getStudentByIdController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                GET PARAMETER
        ==============================================*/

    const { id } = request.params;

    /*==============================================
                FIND STUDENT
        ==============================================*/

    const student = await findStudentById(id);

    /*==============================================
                STUDENT NOT FOUND
        ==============================================*/

    if (!student) {
      return errorResponse(
        response,

        404,

        "Student Not Found",
      );
    }

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Student Retrieved Successfully",

      student,
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
        SEARCH STUDENTS
==========================================================*/

const searchStudentsController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                GET QUERY
        ==============================================*/

    const { keyword } = request.query;

    /*==============================================
                VALIDATION
        ==============================================*/

    if (!keyword) {
      return errorResponse(
        response,

        400,

        "Search Keyword Is Required",
      );
    }

    /*==============================================
                SEARCH STUDENTS
        ==============================================*/

    const students = await searchStudents(keyword);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Search Completed Successfully",

      students,
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
        UPDATE STUDENT
==========================================================*/

const updateStudentController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                REQUEST DATA
        ==============================================*/

    const { id } = request.params;

    const student = request.body;

    /*==============================================
                CHECK STUDENT
        ==============================================*/

    const existingStudent = await findStudentById(id);

    if (!existingStudent) {
      return errorResponse(
        response,

        404,

        "Student Not Found",
      );
    }

    /*==============================================
                VALIDATE DATA
        ==============================================*/

    const validation = validateStudent(student);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    /*==============================================
                UPDATE STUDENT
        ==============================================*/

    await updateStudent(
      id,

      student,
    );

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Student Updated Successfully",
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

/*==============================================
        CHECK DUPLICATE EMAIL
==============================================*/

if (student.email) {
  const existingEmail = await findStudentByEmailExceptId(
    student.email,

    id,
  );

  if (existingEmail) {
    return errorResponse(
      response,

      409,

      "Email Already Exists",
    );
  }
}
/*==========================================================
        UPDATE STUDENT STATUS
==========================================================*/

const updateStudentStatusController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                REQUEST DATA
        ==============================================*/

    const { id } = request.params;

    const { academic_status } = request.body;

    /*==============================================
                CHECK STUDENT
        ==============================================*/

    const student = await findStudentById(id);

    if (!student) {
      return errorResponse(
        response,

        404,

        "Student Not Found",
      );
    }

    /*==============================================
                UPDATE STATUS
        ==============================================*/

    await updateStudentStatus(
      id,

      academic_status,
    );

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Student Status Updated Successfully",
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
/*==============================================
        VALIDATE STATUS
==============================================*/

const allowedStatus = [
  "Active",

  "Graduated",

  "Transferred",

  "Dropped",

  "Suspended",
];

if (!allowedStatus.includes(academic_status)) {
  return errorResponse(
    response,

    400,

    "Invalid Academic Status",
  );
}
/*==========================================================
        DELETE STUDENT
==========================================================*/

const deleteStudentController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                REQUEST DATA
        ==============================================*/

    const { id } = request.params;

    /*==============================================
                CHECK STUDENT
        ==============================================*/

    const student = await findStudentById(id);

    if (!student) {
      return errorResponse(
        response,

        404,

        "Student Not Found",
      );
    }

    /*==============================================
                DELETE STUDENT
        ==============================================*/

    await deleteStudent(id);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Student Deleted Successfully",
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
        GET STUDENT COUNT
==========================================================*/

const getStudentCountController = async (
  request,

  response,
) => {
  try {
    /*==============================================
                GET COUNT
        ==============================================*/

    const total = await getStudentCount();

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return successResponse(
      response,

      200,

      "Student Count Retrieved Successfully",

      {
        total,
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
        EXPORT
==========================================================*/

module.exports = {
  createStudentController,

  getAllStudentsController,

  getStudentByIdController,

  searchStudentsController,

  updateStudentController,

  updateStudentStatusController,

  deleteStudentController,

  getStudentCountController,
};
