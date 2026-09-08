/*==========================================================
        GANGA MA.VI
        RESPONSE UTILITY
==========================================================*/

"use strict";

/*==========================================================
        SUCCESS RESPONSE
==========================================================*/

const successResponse = (
  response,

  statusCode = 200,

  message = "Success",

  data = null,
) => {
  return response.status(statusCode).json({
    success: true,

    message,

    data,
  });
};

/*==========================================================
        ERROR RESPONSE
==========================================================*/

const errorResponse = (
  response,

  statusCode = 500,

  message = "Internal Server Error",

  errors = null,
) => {
  return response.status(statusCode).json({
    success: false,

    message,

    errors,
  });
};
/*==========================================================
        PAGINATED RESPONSE
==========================================================*/

const paginatedResponse = (
  response,

  statusCode = 200,

  message = "Success",

  data = [],

  pagination = {},
) => {
  return response.status(statusCode).json({
    success: true,

    message,

    data,

    pagination,
  });
};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  successResponse,

  errorResponse,

  paginatedResponse,
};
