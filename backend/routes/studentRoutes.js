/*==========================================================
        GANGA MA.VI
        STUDENT ROUTES
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

const {

    createStudentController,

    getAllStudentsController,

    getStudentByIdController,

    searchStudentsController,

    updateStudentController,

    updateStudentStatusController,

    deleteStudentController,

    getStudentCountController

} = require("../controllers/studentController");

/*==========================================================
        IMPORT MIDDLEWARE
==========================================================*/

const {

    authenticate

} = require("../middlewares/authMiddleware");

const {

    authorize

} = require("../middlewares/roleMiddleware");

/*==========================================================
        CREATE STUDENT
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin"),

    createStudentController

);

/*==========================================================
        GET ALL STUDENTS
==========================================================*/

router.get(

    "/",

    authenticate,

    getAllStudentsController

);

/*==========================================================
        SEARCH STUDENTS
==========================================================*/

router.get(

    "/search",

    authenticate,

    searchStudentsController

);

/*==========================================================
        GET STUDENT COUNT
==========================================================*/

router.get(

    "/count",

    authenticate,

    getStudentCountController

);

/*==========================================================
        GET STUDENT BY ID
==========================================================*/

router.get(

    "/:id",

    authenticate,

    getStudentByIdController

);

/*==========================================================
        UPDATE STUDENT
==========================================================*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin"),

    updateStudentController

);

/*==========================================================
        UPDATE STUDENT STATUS
==========================================================*/

router.patch(

    "/:id/status",

    authenticate,

    authorize("Admin"),

    updateStudentStatusController

);

/*==========================================================
        DELETE STUDENT
==========================================================*/

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteStudentController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;