/*==========================================================
        GANGA MA.VI
        ACADEMIC TERM ROUTES
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

    createAcademicTermController,

    getAllAcademicTermsController,

    getAcademicTermByIdController,

    updateAcademicTermController,

    deleteAcademicTermController,

    getAcademicTermCountController

} = require("../controllers/academicTermController");

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
        CREATE ACADEMIC TERM
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin"),

    createAcademicTermController

);

/*==========================================================
        GET ALL ACADEMIC TERMS
==========================================================*/

router.get(

    "/",

    authenticate,

    getAllAcademicTermsController

);

/*==========================================================
        GET ACADEMIC TERM COUNT
==========================================================*/

router.get(

    "/count",

    authenticate,

    getAcademicTermCountController

);

/*==========================================================
        GET ACADEMIC TERM BY ID
==========================================================*/

router.get(

    "/:id",

    authenticate,

    getAcademicTermByIdController

);

/*==========================================================
        UPDATE ACADEMIC TERM
==========================================================*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin"),

    updateAcademicTermController

);

/*==========================================================
        DELETE ACADEMIC TERM
==========================================================*/

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteAcademicTermController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;