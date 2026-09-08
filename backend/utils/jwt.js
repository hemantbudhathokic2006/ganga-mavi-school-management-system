/*==========================================================
        GANGA MA.VI
        JWT UTILITY
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const jwt = require("jsonwebtoken");

/*==========================================================
        GENERATE ACCESS TOKEN
==========================================================*/

const generateAccessToken = (user) => {

    return jwt.sign(

        {

            id: user.id,

            uuid: user.uuid,

            username: user.username,

            role: user.role

        },

        process.env.JWT_SECRET,

        {

            expiresIn:

                process.env.JWT_EXPIRES_IN || "7d"

        }

    );

};

/*==========================================================
        VERIFY ACCESS TOKEN
==========================================================*/

const verifyAccessToken = (token) => {

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

};

/*==========================================================
        DECODE TOKEN
==========================================================*/

const decodeToken = (token) => {

    return jwt.decode(

        token

    );

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    generateAccessToken,

    verifyAccessToken,

    decodeToken

};