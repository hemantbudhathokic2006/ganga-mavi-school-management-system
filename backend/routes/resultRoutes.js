/*==========================================================
        GANGA MA.VI
        RESULT ROUTES
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

    createResultController,

    getAllResultsController,

    getResultByIdController,

    updateResultController,

    deleteResultController,

    getResultCountController

} = require("../controllers/resultController");

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
        CREATE RESULT
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin", "Principal", "Teacher"),

    createResultController

);

/*==========================================================
        GET ALL RESULTS
==========================================================*/

router.get(

    "/",

    authenticate,

    getAllResultsController

);

/*==========================================================
        GET RESULT COUNT
==========================================================*/

router.get(

    "/count",

    authenticate,

    getResultCountController

);

/*==========================================================
        GET RESULT BY ID
==========================================================*/

router.get(

    "/:id",

    authenticate,

    getResultByIdController

);

/*==========================================================
        UPDATE RESULT
==========================================================*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal", "Teacher"),

    updateResultController

);

/*==========================================================
        DELETE RESULT
==========================================================*/

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteResultController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;