/*==========================================================
        GANGA MA.VI
        USER MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const database = require("../config/database");

/*==========================================================
        FIND USER BY ID
==========================================================*/

async function findUserById(id) {
  const [rows] = await database.execute(
    `
        SELECT

            users.*,

            roles.role_name

        FROM users

        LEFT JOIN roles

            ON users.role_id = roles.id

        WHERE users.id = ?

        LIMIT 1
        `,

    [id],
  );

  return rows[0];
}

/*==========================================================
        FIND USER BY EMAIL
==========================================================*/

async function findUserByEmail(email) {
  const [rows] = await database.execute(
    `
        SELECT

            users.*,

            roles.role_name

        FROM users

        LEFT JOIN roles

            ON users.role_id = roles.id

        WHERE users.email = ?

        LIMIT 1
        `,

    [email],
  );

  return rows[0];
}
/*==========================================================
        CREATE USER
==========================================================*/
async function createUser(user) {
  const [result] = await database.execute(
    `
        INSERT INTO users
        (
            uuid,
            full_name,
            username,
            email,
            password,
            phone,
            role_id
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?
        )
        `,

    [
      user.uuid,

      user.full_name,

      user.username,

      user.email,

      user.password,

      user.phone,

      user.role_id,
    ],
  );

  return result.insertId;
}

/*==========================================================
        UPDATE LAST LOGIN
==========================================================*/

async function updateLastLogin(id) {
  await database.execute(
    `
        UPDATE users

        SET

            last_login = CURRENT_TIMESTAMP,

            login_attempts = 0

        WHERE id = ?
        `,

    [id],
  );
}
/*==========================================================
        RESET LOGIN ATTEMPTS
==========================================================*/

const resetLoginAttempts = async (id) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            UPDATE users

            SET

                login_attempts = 0,

                account_locked = FALSE

            WHERE id = ?

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      [id],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        LOCK ACCOUNT
==========================================================*/

async function lockAccount(id) {
  await database.execute(
    `

            UPDATE users

            SET

                account_locked = TRUE

            WHERE id = ?

        `,

    [id],
  );
}
/*==========================================================
        UPDATE PASSWORD
==========================================================*/

const updatePassword = async (
  id,

  password,
) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            UPDATE users

            SET

                password = ?

            WHERE id = ?

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      [password, id],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        SAVE PASSWORD RESET TOKEN
==========================================================*/

const savePasswordResetToken = async (
  id,

  token,

  expires,
) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            UPDATE users

            SET

                reset_token = ?,

                reset_token_expiry = ?

            WHERE id = ?

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      [token, expires, id],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return result;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        FIND USER BY RESET TOKEN
==========================================================*/

const findUserByResetToken = async (token) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT *

            FROM users

            WHERE reset_token = ?

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [token],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        CLEAR PASSWORD RESET TOKEN
==========================================================*/

const clearPasswordResetToken = async (id) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            UPDATE users

            SET

                reset_token = NULL,

                reset_token_expiry = NULL

            WHERE id = ?

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      [id],
    );

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return result;
  } catch (error) {
    throw error;
  }
};
/*==========================================================
        INCREASE LOGIN ATTEMPTS
==========================================================*/

async function increaseLoginAttempts(id) {
  await database.execute(
    `
        UPDATE users

        SET

            login_attempts = login_attempts + 1

        WHERE id = ?
        `,

    [id],
  );
}

/*==========================================================
        FIND USER BY USERNAME
==========================================================*/

async function findUserByUsername(username) {
  const [rows] = await database.execute(
    `
        SELECT

            users.*,

            roles.role_name

        FROM users

        LEFT JOIN roles

            ON users.role_id = roles.id

        WHERE users.username = ?

        LIMIT 1
        `,

    [username],
  );

  return rows[0];
}

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    findUserById,

    findUserByEmail,

    findUserByUsername,

    createUser,

    updateLastLogin,

    increaseLoginAttempts,

    resetLoginAttempts,

    lockAccount,

    updatePassword,

    savePasswordResetToken,

    findUserByResetToken,

    clearPasswordResetToken

};