/*==========================================================
        GANGA MA.VI
        ROLE AUTHORIZATION MIDDLEWARE
==========================================================*/

"use strict";

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const { errorResponse } = require("../utils/response");

/*==========================================================
        AUTHORIZE USER ROLE
==========================================================*/

const authorize = (...allowedRoles) => {
  return (
    request,

    response,

    next,
  ) => {
    /*==============================================
                CHECK AUTHENTICATED USER
        ==============================================*/

    if (!request.user) {
      return errorResponse(
        response,

        401,

        "Unauthorized Access",
      );
    }

    /*==============================================
                GET USER ROLE
        ==============================================*/

    const userRole = request.user.role_name || request.user.role;

    /*==============================================
                CHECK USER ROLE
        ==============================================*/

    if (!allowedRoles.includes(userRole)) {
      return errorResponse(
        response,

        403,

        "Access Denied",
      );
    }

    /*==============================================
                NEXT MIDDLEWARE
        ==============================================*/

    next();
  };
};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  authorize,
};
