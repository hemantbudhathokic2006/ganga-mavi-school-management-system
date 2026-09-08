/*==========================================================
        GANGA MA.VI
        SECTION ROUTES
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

    createSectionController,

    getAllSectionsController,

    getSectionByIdController,

    getSectionsByClassController,

    updateSectionController,

    deleteSectionController,

    getSectionCountController

} = require("../controllers/sectionController");

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

    createSectionController

);

router.get(

    "/",

    authenticate,

    getAllSectionsController

);

router.get(

    "/count",

    authenticate,

    getSectionCountController

);

router.get(

    "/class/:classId",

    authenticate,

    getSectionsByClassController

);

router.get(

    "/:id",

    authenticate,

    getSectionByIdController

);

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    updateSectionController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteSectionController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;