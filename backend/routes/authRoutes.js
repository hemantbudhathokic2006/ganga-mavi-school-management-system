/*==========================================================
        AUTH ROUTES
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGE
==========================================================*/

const express = require("express");

const router = express.Router();

/*==========================================================
        IMPORT CONTROLLER
==========================================================*/

const authController = require("../controllers/authController");


/*==========================================================
        IMPORT MIDDLEWARE
==========================================================*/

const {

    authenticate

} = require("../middleware/authMiddleware");

/*==========================================================
        AUTH ROUTES
==========================================================*/

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post(

    "/logout",

    authenticate,

    authController.logout

);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", authController.refreshToken);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;
