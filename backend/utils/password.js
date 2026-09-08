/*==========================================================
        GANGA MA.VI
        PASSWORD UTILITY
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const bcrypt = require("bcrypt");

/*==========================================================
        PASSWORD CONFIGURATION
==========================================================*/

const SALT_ROUNDS = 10;

/*==========================================================
        HASH PASSWORD
==========================================================*/

const hashPassword = async (password) => {

    return await bcrypt.hash(

        password,

        SALT_ROUNDS

    );

};

/*==========================================================
        COMPARE PASSWORD
==========================================================*/

const comparePassword = async (

    password,

    hashedPassword

) => {

    return await bcrypt.compare(

        password,

        hashedPassword

    );

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    hashPassword,

    comparePassword

};