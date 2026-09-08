/*==========================================================
        GANGA MA.VI
        CLASS ROUTES
==========================================================*/

"use strict";

/*==========================================================
        IMPORT EXPRESS
==========================================================*/

const express = require("express");

const router = express.Router();

/*==========================================================
        IMPORT CONTROLLER
==========================================================*/

const {

    createClassController,

    getAllClassesController,

    getClassByIdController,

    updateClassController,

    deleteClassController,

    getClassCountController

} = require("../controllers/classController");

/*==========================================================
        IMPORT AUTH MIDDLEWARE
==========================================================*/

const {

    authenticate

} = require("../middleware/authMiddleware");

const {

    authorize

} = require("../middleware/roleMiddleware");

/*==========================================================
        ROUTES
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin", "Principal"),

    createClassController

);

router.get(

    "/",

    authenticate,

    getAllClassesController

);

router.get(

    "/count",

    authenticate,

    getClassCountController

);

router.get(

    "/:id",

    authenticate,

    getClassByIdController

);

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    updateClassController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteClassController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;