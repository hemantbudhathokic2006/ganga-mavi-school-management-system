/*==========================================================
        GANGA MA.VI
        ACADEMIC YEAR ROUTES
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

    createAcademicYearController,

    getAllAcademicYearsController,

    getAcademicYearByIdController,

    updateAcademicYearController,

    deleteAcademicYearController,

    getAcademicYearCountController

} = require("../controllers/academicYearController");

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
        CREATE ACADEMIC YEAR
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin"),

    createAcademicYearController

);

/*==========================================================
        GET ALL ACADEMIC YEARS
==========================================================*/

router.get(

    "/",

    authenticate,

    getAllAcademicYearsController

);

/*==========================================================
        GET ACADEMIC YEAR COUNT
==========================================================*/

router.get(

    "/count",

    authenticate,

    getAcademicYearCountController

);

/*==========================================================
        GET ACADEMIC YEAR BY ID
==========================================================*/

router.get(

    "/:id",

    authenticate,

    getAcademicYearByIdController

);

/*==========================================================
        UPDATE ACADEMIC YEAR
==========================================================*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin"),

    updateAcademicYearController

);

/*==========================================================
        DELETE ACADEMIC YEAR
==========================================================*/

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteAcademicYearController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;