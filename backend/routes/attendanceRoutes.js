/*==========================================================
        GANGA MA.VI
        ATTENDANCE ROUTES
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

    markAttendanceController,

    getAttendanceByStudentController,

    getAttendanceByClassController,

    updateAttendanceController,

    deleteAttendanceController,

    getAttendanceCountController

} = require("../controllers/attendanceController");

/*==========================================================
        IMPORT MIDDLEWARE
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

    authorize("Admin", "Principal", "Teacher"),

    markAttendanceController

);

router.get(

    "/student/:studentId",

    authenticate,

    getAttendanceByStudentController

);

router.get(

    "/class/:classId",

    authenticate,

    getAttendanceByClassController

);

router.get(

    "/count",

    authenticate,

    getAttendanceCountController

);

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal", "Teacher"),

    updateAttendanceController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    deleteAttendanceController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;