/*==========================================================
        GANGA MA.VI
        TEACHER ROUTES
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

    createTeacherController,

    getAllTeachersController,

    getTeacherByIdController,

    searchTeachersController,

    updateTeacherController,

    deleteTeacherController,

    getTeacherCountController

} = require("../controllers/teacherController");

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

    createTeacherController

);

router.get(

    "/",

    authenticate,

    getAllTeachersController

);

router.get(

    "/search",

    authenticate,

    searchTeachersController

);

router.get(

    "/count",

    authenticate,

    getTeacherCountController

);

router.get(

    "/:id",

    authenticate,

    getTeacherByIdController

);

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    updateTeacherController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteTeacherController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;