/*==========================================================
        GANGA MA.VI
        CREATE DEFAULT ADMIN
==========================================================*/

"use strict";

/*==========================================================
        IMPORT ENVIRONMENT
==========================================================*/

require("dotenv").config();

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        IMPORT PASSWORD UTILITY
==========================================================*/

const { hashPassword } = require("../utils/passward");

/*==========================================================
        CREATE ADMIN
==========================================================*/

async function createAdmin() {
  try {
    /*==============================================
                CHECK ADMIN
        ==============================================*/

    const [rows] = await database.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",

      ["admin@gangamavi.edu.np"],
    );

    if (rows.length > 0) {
      console.log("====================================");

      console.log("Admin Already Exists");

      console.log("====================================");

      process.exit();
    }

    /*==============================================
                HASH PASSWORD
        ==============================================*/

    const password = await hashPassword("admin123");

    /*==============================================
                INSERT ADMIN
        ==============================================*/

    await database.execute(
      `

            INSERT INTO users

            (

                full_name,

                email,

                password,

                role,

                status

            )

            VALUES

            (

                ?, ?, ?, ?, ?

            )

            `,

      [
        "System Administrator",

        "admin@gangamavi.edu.np",

        password,

        "admin",

        "active",
      ],
    );

    console.log("====================================");

    console.log("Default Admin Created Successfully");

    console.log("Email : admin@gangamavi.edu.np");

    console.log("Password : admin123");

    console.log("====================================");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

/*==========================================================
        RUN
==========================================================*/

createAdmin();
