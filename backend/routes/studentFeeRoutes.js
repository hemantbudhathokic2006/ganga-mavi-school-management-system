/*==========================================================
        GANGA MA.VI
        STUDENT FEE ROUTES
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

} = require("../controllers/studentFeeController");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    createStudentFeeValidator,

    updateStudentFeeValidator

} = require("../validators/studentFeeValidator");

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
        STUDENT FEE ROUTES
==========================================================*/

/*-----------------------------------------
        CREATE STUDENT FEE
-----------------------------------------*/

router.post(

    "/",

    authenticate,

    authorize("Admin"),

    createStudentFeeValidator,

    create

);

/*-----------------------------------------
        GET ALL STUDENT FEES
-----------------------------------------*/

router.get(

    "/",

    authenticate,

    getAll

);

/*-----------------------------------------
        GET STUDENT FEE COUNT
-----------------------------------------*/

router.get(

    "/count",

    authenticate,

    count

);

/*-----------------------------------------
        GET STUDENT FEE BY ID
-----------------------------------------*/

router.get(

    "/:id",

    authenticate,

    getById

);

/*-----------------------------------------
        UPDATE STUDENT FEE
-----------------------------------------*/

router.put(

    "/:id",

    authenticate,

    authorize("Admin"),

    updateStudentFeeValidator,

    update

);

/*-----------------------------------------
        DELETE STUDENT FEE
-----------------------------------------*/

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