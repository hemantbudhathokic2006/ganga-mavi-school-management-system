/*==========================================================
        GANGA MA.VI
        FEE CATEGORY ROUTES
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

    create,

    getAll,

    getById,

    update,

    remove,

    count

} = require("../controllers/feeCategoryController");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    createFeeCategoryValidator,

    updateFeeCategoryValidator

} = require("../validators/feeCategoryValidator");

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
        CREATE FEE CATEGORY
==========================================================*/

router.post(

    "/",

    authenticate,

    authorize("Admin"),

    createFeeCategoryValidator,

    create

);

/*==========================================================
        GET ALL FEE CATEGORIES
==========================================================*/

router.get(

    "/",

    authenticate,

    getAll

);

/*==========================================================
        GET FEE CATEGORY COUNT
==========================================================*/

router.get(

    "/count",

    authenticate,

    count

);

/*==========================================================
        GET FEE CATEGORY BY ID
==========================================================*/

router.get(

    "/:id",

    authenticate,

    getById

);

/*==========================================================
        UPDATE FEE CATEGORY
==========================================================*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin"),

    updateFeeCategoryValidator,

    update

);

/*==========================================================
        DELETE FEE CATEGORY
==========================================================*/

router.delete(

    "/:id",

    authenticate,

    authorize("Admin"),

    remove

);

/*==========================================================
        EXPORT
==========================================================*/

module.exports = router;