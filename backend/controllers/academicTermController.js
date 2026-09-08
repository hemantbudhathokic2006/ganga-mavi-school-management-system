/*==========================================================
        GANGA MA.VI
        ACADEMIC TERM CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {
  createAcademicTerm,

  findAcademicTermById,

  findAcademicTermByCode,

  findAcademicTermByCodeExceptId,

  getAllAcademicTerms,

  updateAcademicTerm,

  deleteAcademicTerm,

  getAcademicTermCount,
} = require("../models/AcademicTerm");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const { validateAcademicTerm } = require("../validators/academicTermValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {
  successResponse,

  errorResponse,
} = require("../utils/response");

/*==========================================================
        CREATE ACADEMIC TERM
==========================================================*/

const createAcademicTermController = async (
  request,

  response,
) => {
  try {
    const term = request.body;

    /*==============================================
                VALIDATION
        ==============================================*/

    const validation = validateAcademicTerm(term);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    /*==============================================
                DUPLICATE TERM CODE
        ==============================================*/

    const existingTerm = await findAcademicTermByCode(term.term_code);

    if (existingTerm) {
      return errorResponse(
        response,

        409,

        "Academic Term Code Already Exists",
      );
    }

    /*==============================================
                CREATE
        ==============================================*/

    const result = await createAcademicTerm(term);

    return successResponse(
      response,

      201,

      "Academic Term Created Successfully",

      {
        academic_term_id: result.insertId,
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
        GET ALL ACADEMIC TERMS
==========================================================*/

const getAllAcademicTermsController = async (
  request,

  response,
) => {
  try {
    const terms = await getAllAcademicTerms();

    return successResponse(
      response,

      200,

      "Academic Terms Retrieved Successfully",

      terms,
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
        GET ACADEMIC TERM BY ID
==========================================================*/

const getAcademicTermByIdController = async (
  request,

  response,
) => {
  try {
    const term = await findAcademicTermById(request.params.id);

    if (!term) {
      return errorResponse(
        response,

        404,

        "Academic Term Not Found",
      );
    }

    return successResponse(
      response,

      200,

      "Academic Term Retrieved Successfully",

      term,
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
        UPDATE ACADEMIC TERM
==========================================================*/

const updateAcademicTermController = async (
  request,

  response,
) => {
  try {
    const termId = request.params.id;

    const term = request.body;

    /*==============================================
                CHECK TERM
        ==============================================*/

    const existingTerm = await findAcademicTermById(termId);

    if (!existingTerm) {
      return errorResponse(
        response,

        404,

        "Academic Term Not Found",
      );
    }

    /*==============================================
                VALIDATE
        ==============================================*/

    const validation = validateAcademicTerm(term);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    /*==============================================
                DUPLICATE TERM CODE
        ==============================================*/

    const duplicateTerm = await findAcademicTermByCodeExceptId(
      term.term_code,

      termId,
    );

    if (duplicateTerm) {
      return errorResponse(
        response,

        409,

        "Academic Term Code Already Exists",
      );
    }

    /*==============================================
                UPDATE
        ==============================================*/

    await updateAcademicTerm(
      termId,

      term,
    );

    return successResponse(
      response,

      200,

      "Academic Term Updated Successfully",
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
        DELETE ACADEMIC TERM
==========================================================*/

const deleteAcademicTermController = async (
  request,

  response,
) => {
  try {
    const termId = request.params.id;

    const existingTerm = await findAcademicTermById(termId);

    if (!existingTerm) {
      return errorResponse(
        response,

        404,

        "Academic Term Not Found",
      );
    }

    await deleteAcademicTerm(termId);

    return successResponse(
      response,

      200,

      "Academic Term Deleted Successfully",
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
        GET ACADEMIC TERM COUNT
==========================================================*/

const getAcademicTermCountController = async (
  request,

  response,
) => {
  try {
    const total = await getAcademicTermCount();

    return successResponse(
      response,

      200,

      "Academic Term Count Retrieved Successfully",

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
  createAcademicTermController,

  getAllAcademicTermsController,

  getAcademicTermByIdController,

  updateAcademicTermController,

  deleteAcademicTermController,

  getAcademicTermCountController,
};
