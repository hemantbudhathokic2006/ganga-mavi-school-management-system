/*==========================================================
        GANGA MA.VI
        AUTHENTICATION MIDDLEWARE
==========================================================*/

"use strict";

/*==========================================================
        IMPORT JWT UTILITY
==========================================================*/

const { verifyAccessToken } = require("../utils/jwt");

/*==========================================================
        AUTHENTICATE USER
==========================================================*/

const authenticate = (
  request,

  response,

  next,
) => {
  try {
    /*==============================================
                GET AUTHORIZATION HEADER
        ==============================================*/

    const authorizationHeader = request.headers.authorization;

    /*==============================================
                CHECK AUTHORIZATION HEADER
        ==============================================*/

    if (!authorizationHeader) {
      return errorResponse(response, 401, "Access Token Required");
    }

    /*==============================================
                EXTRACT TOKEN
        ==============================================*/

    const token = authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.split(" ")[1]
      : null;

    /*==============================================
                CHECK TOKEN
        ==============================================*/

    if (!token) {
      return errorResponse(response, 401, "Invalid Access Token");
    }

    /*==============================================
                VERIFY ACCESS TOKEN
        ==============================================*/

    const decoded = verifyAccessToken(token);

    /*==============================================
                STORE USER INFORMATION
        ==============================================*/

    request.user = decoded;

    /*==============================================
                NEXT MIDDLEWARE
        ==============================================*/

    next();
  } catch (error) {
    return errorResponse(response, 401, "Invalid Or Expired Access Token");
  }
};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  authenticate,
};
