/*==========================================================
        GANGA MA.VI
        AUTH VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        EMAIL REGEX
==========================================================*/

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/*==========================================================
        PHONE REGEX
==========================================================*/

const PHONE_REGEX = /^[0-9]{10}$/;

/*==========================================================
        VALIDATE LOGIN
==========================================================*/

const validateLogin = (user) => {
  const errors = [];

  /*==============================================
            EMAIL
    ==============================================*/

  if (!user.email || !user.email.trim()) {
    errors.push("Email Is Required");
  } else if (!EMAIL_REGEX.test(user.email)) {
    errors.push("Invalid Email Address");
  }

  /*==============================================
            PASSWORD
    ==============================================*/

  if (!user.password) {
    errors.push("Password Is Required");
  }

  /*==============================================
            RETURN RESULT
    ==============================================*/

  return {
    isValid: errors.length === 0,

    errors,
  };
};

/*==========================================================
        VALIDATE REGISTER
==========================================================*/

const validateRegister = (user) => {
  const errors = [];

  /*==============================================
            FULL NAME
    ==============================================*/

  if (!user.full_name || !user.full_name.trim()) {
    errors.push("Full Name Is Required");
  }

  /*==============================================
            USERNAME
    ==============================================*/

  if (!user.username || !user.username.trim()) {
    errors.push("Username Is Required");
  }

  /*==============================================
            EMAIL
    ==============================================*/

  if (!user.email || !user.email.trim()) {
    errors.push("Email Is Required");
  } else if (!EMAIL_REGEX.test(user.email)) {
    errors.push("Invalid Email Address");
  }

  /*==============================================
            PASSWORD
    ==============================================*/

  if (!user.password) {
    errors.push("Password Is Required");
  } else if (user.password.length < 8) {
    errors.push("Password Must Be At Least 8 Characters");
  }

  /*==============================================
            PHONE
    ==============================================*/

  if (!user.phone || !user.phone.trim()) {
    errors.push("Phone Number Is Required");
  } else if (!PHONE_REGEX.test(user.phone)) {
    errors.push("Invalid Phone Number");
  }

  /*==============================================
            RETURN RESULT
    ==============================================*/

  return {
    isValid: errors.length === 0,

    errors,
  };
};

/*==========================================================
        VALIDATE FORGOT PASSWORD
==========================================================*/

const validateForgotPassword = (user) => {
  const errors = [];

  if (!user.email || !EMAIL_REGEX.test(user.email)) {
    errors.push("Valid Email Is Required");
  }

  return {
    isValid: errors.length === 0,

    errors,
  };
};

/*==========================================================
        VALIDATE RESET PASSWORD
==========================================================*/

const validateResetPassword = (user) => {
  const errors = [];

  if (!user.password) {
    errors.push("Password Is Required");
  } else if (user.password.length < 8) {
    errors.push("Password Must Be At Least 8 Characters");
  }

  return {
    isValid: errors.length === 0,

    errors,
  };
};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {
  validateLogin,

  validateRegister,

  validateForgotPassword,

  validateResetPassword,
};
