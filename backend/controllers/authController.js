/*==========================================================
        GANGA MA.VI
        AUTH CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODELS
==========================================================*/

const {
  findUserByEmail,

  findUserByUsername,

  createUser,

  updateLastLogin,

  increaseLoginAttempts,

  lockAccount,
} = require("../models/User");

/*==========================================================
        IMPORT UTILITIES
==========================================================*/

const {
  hashPassword,

  comparePassword,
} = require("../utils/password");

const { generateAccessToken } = require("../utils/jwt");

const { v4: uuidv4 } = require("uuid");

/*==========================================================
        REGISTER
==========================================================*/

const register = async (req, res) => {
  try {
    /*==============================================
                GET REQUEST DATA
        ==============================================*/

    const {
      full_name,

      username,

      email,

      password,

      phone,

      role,
    } = req.body;

    /*==============================================
                VALIDATE REQUIRED FIELDS
        ==============================================*/

    if (!full_name || !username || !email || !password || !phone) {
      return res.status(400).json({
        success: false,

        message: "All Required Fields Must Be Filled",
      });
    }

    /*==============================================
                CHECK EMAIL
        ==============================================*/

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,

        message: "Email Already Exists",
      });
    }

    /*==============================================
                CHECK USERNAME
        ==============================================*/

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,

        message: "Username Already Exists",
      });
    }

    /*==============================================
                HASH PASSWORD
        ==============================================*/

    const hashedPassword = await hashPassword(password);

    /*==============================================
                GENERATE USER UUID
        ==============================================*/

    const uuid = uuidv4();

    /*==============================================
                CREATE USER
        ==============================================*/

    const userId = await createUser({
      uuid,

      full_name,

      username,

      email,

      password: hashedPassword,

      phone,

      role_id: role || 2,
    });

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(201).json({
      success: true,

      message: "User Registered Successfully",

      data: {
        id: userId,

        uuid,

        full_name,

        username,

        email,

        phone,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*==========================================================
        LOGIN
==========================================================*/

const login = async (req, res) => {
  try {
    /*==============================================
                GET REQUEST DATA
        ==============================================*/

    const {
      email,

      password,
    } = req.body;

    /*==============================================
                VALIDATE REQUIRED FIELDS
        ==============================================*/

    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message: "Email and Password are Required",
      });
    }

    /*==============================================
                FIND USER BY EMAIL
        ==============================================*/

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,

        message: "Invalid Email or Password",
      });
    }

    /*==============================================
                CHECK ACCOUNT STATUS
        ==============================================*/

    if (!user.is_active) {
      return res.status(403).json({
        success: false,

        message: "Your Account Is Inactive",
      });
    }

    /*==============================================
                VERIFY PASSWORD
        ==============================================*/

    const passwordMatched = await comparePassword(
      password,

      user.password,
    );

    if (!passwordMatched) {
      await increaseLoginAttempts(user.id);

      if (user.login_attempts + 1 >= 5) {
        await lockAccount(user.id);

        return res.status(403).json({
          success: false,

          message: "Account Locked Due To Multiple Failed Login Attempts",
        });
      }

      return res.status(401).json({
        success: false,

        message: "Invalid Email or Password",
      });
    }

    /*==============================================
                RESET LOGIN ATTEMPTS
        ==============================================*/

    if (user.login_attempts > 0 || user.account_locked) {
      /*
                NOTE:
                Model Function तयार भएपछि
                resetLoginAttempts(user.id)
                यहाँ Call गर्ने।
            */
    }

    /*==============================================
                UPDATE LAST LOGIN
        ==============================================*/

    await updateLastLogin(user.id);

    /*==============================================
                GENERATE ACCESS TOKEN
        ==============================================*/

    const token = generateAccessToken({
      id: user.id,

      uuid: user.uuid,

      role: user.role_name,

      username: user.username,
    });

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Login Successful",

      token,

      user: {
        id: user.id,

        uuid: user.uuid,

        full_name: user.full_name,

        username: user.username,

        email: user.email,

        phone: user.phone,

        role: user.role_name,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*==========================================================
        LOGOUT
==========================================================*/

const logout = async (req, res) => {
  try {
    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Logout Successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*==========================================================
        FORGOT PASSWORD
==========================================================*/

const forgotPassword = async (req, res) => {
  try {
    /*==============================================
                GET EMAIL
        ==============================================*/

    const { email } = req.body;

    /*==============================================
                VALIDATE EMAIL
        ==============================================*/

    if (!email) {
      return res.status(400).json({
        success: false,

        message: "Email Is Required",
      });
    }

    /*==============================================
                FIND USER
        ==============================================*/

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User Not Found",
      });
    }

    /*==============================================
                TODO
                SEND RESET PASSWORD EMAIL
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Password Reset Link Will Be Sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*==========================================================
        RESET PASSWORD
==========================================================*/

const resetPassword = async (req, res) => {
  try {
    /*==============================================
                GET REQUEST DATA
        ==============================================*/

    const {
      token,

      password,
    } = req.body;

    /*==============================================
                VALIDATE REQUEST
        ==============================================*/

    if (!token || !password) {
      return res.status(400).json({
        success: false,

        message: "Token And Password Are Required",
      });
    }

    /*==============================================
                TODO
                VERIFY RESET TOKEN
        ==============================================*/

    /*
            Production Version

            1. Verify JWT Reset Token

            2. Find User

            3. Hash New Password

            4. Update Password

            5. Remove Reset Token

        */

    /*==============================================
                HASH NEW PASSWORD
        ==============================================*/

    const hashedPassword = await hashPassword(password);

    /*
            TODO

            updatePassword(
                user.id,
                hashedPassword
            );

        */

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*==========================================================
        REFRESH TOKEN
==========================================================*/

const refreshToken = async (req, res) => {
  try {
    /*
            TODO

            Verify Refresh Token

            Generate New Access Token

        */

    return res.status(200).json({
      success: true,

      message: "Refresh Token API",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*==========================================================
        EXPORT CONTROLLER
==========================================================*/

module.exports = {
  register,

  login,

  logout,

  forgotPassword,

  resetPassword,

  refreshToken,
};
