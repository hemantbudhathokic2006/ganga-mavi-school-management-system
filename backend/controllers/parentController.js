/*==========================================================
        GANGA MA.VI
        PARENT CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {
  createParent,

  findParentById,

  findParentByCode,

  findParentByUserId,

  getAllParents,

  searchParents,

  updateParent,

  deleteParent,

  getParentCount,
} = require("../models/Parent");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const { validateParent } = require("../validators/parentValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {
  successResponse,

  errorResponse,
} = require("../utils/response");

/*==========================================================
        CREATE PARENT
==========================================================*/

const createParentController = async (
  request,

  response,
) => {
  try {
    const parent = request.body;

    /*==============================================
                VALIDATE DATA
        ==============================================*/

    const validation = validateParent(parent);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    /*==============================================
                CHECK PARENT CODE
        ==============================================*/

    const existingParent = await findParentByCode(parent.parent_code);

    if (existingParent) {
      return errorResponse(
        response,

        409,

        "Parent Code Already Exists",
      );
    }

    /*==============================================
                CHECK USER
        ==============================================*/

    if (parent.user_id) {
      const existingUser = await findParentByUserId(parent.user_id);

      if (existingUser) {
        return errorResponse(
          response,

          409,

          "Parent Already Assigned To This User",
        );
      }
    }

    /*==============================================
                CREATE PARENT
        ==============================================*/

    const result = await createParent(parent);

    return successResponse(
      response,

      201,

      "Parent Created Successfully",

      {
        parent_id: result.insertId,
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
        GET ALL PARENTS
==========================================================*/

const getAllParentsController = async (
  request,

  response,
) => {
  try {
    const parents = await getAllParents();

    return successResponse(
      response,

      200,

      "Parents Retrieved Successfully",

      parents,
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
        GET PARENT BY ID
==========================================================*/

const getParentByIdController = async (
  request,

  response,
) => {
  try {
    const parent = await findParentById(request.params.id);

    if (!parent) {
      return errorResponse(
        response,

        404,

        "Parent Not Found",
      );
    }

    return successResponse(
      response,

      200,

      "Parent Retrieved Successfully",

      parent,
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
        SEARCH PARENTS
==========================================================*/

const searchParentsController = async (
  request,

  response,
) => {
  try {
    const keyword = request.query.keyword || "";

    const parents = await searchParents(keyword);

    return successResponse(
      response,

      200,

      "Parents Retrieved Successfully",

      parents,
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
        UPDATE PARENT
==========================================================*/

const updateParentController = async (
  request,

  response,
) => {
  try {
    const validation = validateParent(request.body);

    if (!validation.isValid) {
      return errorResponse(
        response,

        400,

        "Validation Failed",

        validation.errors,
      );
    }

    const parent = await findParentById(request.params.id);

    if (!parent) {
      return errorResponse(
        response,

        404,

        "Parent Not Found",
      );
    }

    await updateParent(
      request.params.id,

      request.body,
    );

    return successResponse(
      response,

      200,

      "Parent Updated Successfully",
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
        DELETE PARENT
==========================================================*/

const deleteParentController = async (
  request,

  response,
) => {
  try {
    const parent = await findParentById(request.params.id);

    if (!parent) {
      return errorResponse(
        response,

        404,

        "Parent Not Found",
      );
    }

    await deleteParent(request.params.id);

    return successResponse(
      response,

      200,

      "Parent Deleted Successfully",
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
        GET PARENT COUNT
==========================================================*/

const getParentCountController = async (
  request,

  response,
) => {
  try {
    const total = await getParentCount();

    return successResponse(
      response,

      200,

      "Parent Count Retrieved Successfully",

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
  createParentController,

  getAllParentsController,

  getParentByIdController,

  searchParentsController,

  updateParentController,

  deleteParentController,

  getParentCountController,
};
