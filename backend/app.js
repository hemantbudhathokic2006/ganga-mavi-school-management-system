/*==========================================================
        GANGA MA.VI
        EXPRESS APPLICATION
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGES
==========================================================*/

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

/*==========================================================
        IMPORT ROUTES
==========================================================*/

const routes = require("./routes");

/*==========================================================
        IMPORT MIDDLEWARES
==========================================================*/

const errorHandler = require("./middleware/errorHandler");

/*==========================================================
        CREATE EXPRESS APPLICATION
==========================================================*/

const app = express();

/*==========================================================
        SECURITY MIDDLEWARE
==========================================================*/

app.use(helmet());

app.use(compression());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        credentials: true
    })
);

/*==========================================================
        BODY PARSER
==========================================================*/

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

/*==========================================================
        REQUEST LOGGER
==========================================================*/

app.use(morgan("dev"));

/*==========================================================
        API ROUTES
==========================================================*/

app.use("/api", routes);

/*==========================================================
        HEALTH CHECK
==========================================================*/

app.get("/", (request, response) => {

    return response.status(200).json({

        success: true,

        application: "Ganga Ma.Vi School Management System",

        version: "1.0.0",

        status: "Running"

    });

});

/*==========================================================
        404 HANDLER
==========================================================*/

app.use((request, response) => {

    return response.status(404).json({

        success: false,

        message: "Requested API Route Not Found"

    });

});

/*==========================================================
        GLOBAL ERROR HANDLER
==========================================================*/

app.use(errorHandler);

/*==========================================================
        EXPORT APPLICATION
==========================================================*/

module.exports = app;