/*==========================================================
        GANGA MA.VI
        STUDENT FEE PAYMENT CONTROLLER
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
  createStudentFeePayment,

  findStudentFeePaymentById,

  getAllStudentFeePayments,

  updateStudentFeePayment,

  deleteStudentFeePayment,

  getStudentFeePaymentCount,
} = require("../models/StudentFeePayment");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {
  successResponse,

  errorResponse,
} = require("../utils/response");

/*==========================================================
        CREATE PAYMENT
==========================================================*/

const create = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return errorResponse(
        response,

        422,

        "Validation Failed",

        errors.array(),
      );
    }

    const result = await createStudentFeePayment(request.body);

    return successResponse(
      response,

      201,

      "Student Fee Payment Created Successfully",

      result,
    );
  } catch (error) {
    return errorResponse(
      response,

      500,

      error.message,
    );
  }
};

/*==========================================================
        GET ALL PAYMENTS
==========================================================*/

const getAll = async (request, response) => {
  try {
    const rows = await getAllStudentFeePayments();

    return successResponse(
      response,

      200,

      "Student Fee Payment List",

      rows,
    );
  } catch (error) {
    return errorResponse(
      response,

      500,

      error.message,
    );
  }
};

/*==========================================================
        GET PAYMENT BY ID
==========================================================*/

const getById = async (request, response) => {
  try {
    const row = await findStudentFeePaymentById(request.params.id);

    if (!row) {
      return errorResponse(
        response,

        404,

        "Student Fee Payment Not Found",
      );
    }

    return successResponse(
      response,

      200,

      "Student Fee Payment Found",

      row,
    );
  } catch (error) {
    return errorResponse(
      response,

      500,

      error.message,
    );
  }
};

/*==========================================================
        UPDATE PAYMENT
==========================================================*/

const update = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return errorResponse(
        response,

        422,

        "Validation Failed",

        errors.array(),
      );
    }

    const row = await findStudentFeePaymentById(request.params.id);

    if (!row) {
      return errorResponse(
        response,

        404,

        "Student Fee Payment Not Found",
      );
    }

    await updateStudentFeePayment(
      request.params.id,

      request.body,
    );

    return successResponse(
      response,

      200,

      "Student Fee Payment Updated Successfully",
    );
  } catch (error) {
    return errorResponse(
      response,

      500,

      error.message,
    );
  }
};

/*==========================================================
        DELETE PAYMENT
==========================================================*/

const remove = async (request, response) => {
  try {
    const row = await findStudentFeePaymentById(request.params.id);

    if (!row) {
      return errorResponse(
        response,

        404,

        "Student Fee Payment Not Found",
      );
    }

    await deleteStudentFeePayment(request.params.id);

    return successResponse(
      response,

      200,

      "Student Fee Payment Deleted Successfully",
    );
  } catch (error) {
    return errorResponse(
      response,

      500,

      error.message,
    );
  }
};

/*==========================================================
        PAYMENT COUNT
==========================================================*/

const count = async (request, response) => {
  try {
    const total = await getStudentFeePaymentCount();

    return successResponse(
      response,

      200,

      "Student Fee Payment Count",

      total,
    );
  } catch (error) {
    return errorResponse(
      response,

      500,

      error.message,
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

  count,
};
