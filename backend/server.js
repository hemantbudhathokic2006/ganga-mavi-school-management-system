/*==========================================================
        GANGA MA.VI
        SERVER
==========================================================*/

"use strict";

/*==========================================================
        LOAD ENVIRONMENT VARIABLES
==========================================================*/

require("dotenv").config();

/*==========================================================
        IMPORT APPLICATION
==========================================================*/

const app = require("./app");

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { connectDatabase } = require("./config/database");

/*==========================================================
        APPLICATION PORT
==========================================================*/

const PORT = process.env.PORT || 5000;

/*==========================================================
        START SERVER
==========================================================*/

const startServer = async () => {

    try {

        /*==============================================
                CONNECT DATABASE
        ==============================================*/

        await connectDatabase();

        /*==============================================
                START EXPRESS SERVER
        ==============================================*/

        app.listen(PORT, () => {

            console.log("======================================");
            console.log(" GANGA MA.VI SCHOOL MANAGEMENT SYSTEM ");
            console.log("======================================");
            console.log(` Server Running   : http://localhost:${PORT}`);
            console.log(` Environment      : ${process.env.NODE_ENV || "development"}`);
            console.log("======================================");

        });

    }

    catch (error) {

        console.error("======================================");
        console.error(" SERVER FAILED TO START");
        console.error(error.message);
        console.error("======================================");

        process.exit(1);

    }

};

/*==========================================================
        START APPLICATION
==========================================================*/

startServer();

/*==========================================================
        GRACEFUL SHUTDOWN
==========================================================*/

process.on("SIGINT", () => {

    console.log("\nGracefully Shutting Down Server...");

    process.exit(0);

});

process.on("SIGTERM", () => {

    console.log("\nServer Terminated");

    process.exit(0);

});