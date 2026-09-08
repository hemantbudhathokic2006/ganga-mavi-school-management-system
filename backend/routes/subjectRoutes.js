/*==========================================================
        GANGA MA.VI
        SUBJECT ROUTES
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

    createSubjectController,

    getAllSubjectsController,

    getSubjectByIdController,

    searchSubjectsController,

    updateSubjectController,

    deleteSubjectController,

    getSubjectCountController

} = require("../controllers/subjectController");

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

    authorize("Admin", "Principal"),

    createSubjectController

);

router.get(

    "/",

    authenticate,

    getAllSubjectsController

);

router.get(

    "/search",

    authenticate,

    searchSubjectsController

);

router.get(

    "/count",

    authenticate,

    getSubjectCountController

);

router.get(

    "/:id",

    authenticate,

    getSubjectByIdController

);

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    updateSubjectController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteSubjectController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;