/*==========================================================
        GANGA MA.VI
        DATABASE CONFIGURATION
==========================================================*/

"use strict";

/*==========================================================
        IMPORT PACKAGES
==========================================================*/

const mysql = require("mysql2/promise");

const dotenv = require("dotenv");

/*==========================================================
        LOAD ENVIRONMENT VARIABLES
==========================================================*/

dotenv.config();

/*==========================================================
        CREATE DATABASE CONNECTION POOL
==========================================================*/

const database = mysql.createPool({

    host: process.env.DB_HOST,

    port: Number(process.env.DB_PORT),

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 20,

    queueLimit: 0,

    enableKeepAlive: true,

    keepAliveInitialDelay: 10000

});

/*==========================================================
        CONNECT DATABASE
==========================================================*/

const connectDatabase = async () => {

    try {

        /*==============================================
                GET DATABASE CONNECTION
        ==============================================*/

        const connection = await database.getConnection();

        /*==============================================
                VERIFY DATABASE CONNECTION
        ==============================================*/

        await connection.ping();

        console.log("======================================");

        console.log("Database Connected Successfully");

        console.log("======================================");

        /*==============================================
                RELEASE CONNECTION
        ==============================================*/

        connection.release();

    }

    catch (error) {

        console.error("======================================");

        console.error("Database Connection Failed");

        console.error(error.message);

        console.error("======================================");

        process.exit(1);

    }

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    database,

    connectDatabase

};