/*==========================================================
        GANGA MA.VI
        EXAMINATION ROUTES
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

    createExamController,

    getAllExamsController,

    getExamByIdController,

    updateExamController,

    deleteExamController,

    getExamCountController

} = require("../controllers/examinationController");

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
        CREATE EXAM
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin", "Principal"),

    createExamController

);

/*==========================================================
        GET ALL EXAMS
==========================================================*/

router.get(

    "/",

    authenticate,

    getAllExamsController

);

/*==========================================================
        GET EXAM COUNT
==========================================================*/

router.get(

    "/count",

    authenticate,

    getExamCountController

);

/*==========================================================
        GET EXAM BY ID
==========================================================*/

router.get(

    "/:id",

    authenticate,

    getExamByIdController

);

/*==========================================================
        UPDATE EXAM
==========================================================*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    updateExamController

);

/*==========================================================
        DELETE EXAM
==========================================================*/

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteExamController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;