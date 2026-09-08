/*==========================================================
        GANGA MA.VI
        STUDENT PARENT ROUTES
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

    createRelationshipController,

    getParentsByStudentController,

    getStudentsByParentController,

    deleteRelationshipController

} = require("../controllers/studentParentController");

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

    createRelationshipController

);

router.get(

    "/student/:studentId",

    authenticate,

    getParentsByStudentController

);

router.get(

    "/parent/:parentId",

    authenticate,

    getStudentsByParentController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    deleteRelationshipController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;