/*==========================================================
        GANGA MA.VI
        PARENT ROUTES
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

    createParentController,

    getAllParentsController,

    getParentByIdController,

    searchParentsController,

    updateParentController,

    deleteParentController,

    getParentCountController

} = require("../controllers/parentController");

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

    createParentController

);

router.get(

    "/",

    authenticate,

    getAllParentsController

);

router.get(

    "/search",

    authenticate,

    searchParentsController

);

router.get(

    "/count",

    authenticate,

    getParentCountController

);

router.get(

    "/:id",

    authenticate,

    getParentByIdController

);

router.put(

    "/:id",

    authenticate,

    authorize("Admin", "Principal"),

    updateParentController

);

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    deleteParentController

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;