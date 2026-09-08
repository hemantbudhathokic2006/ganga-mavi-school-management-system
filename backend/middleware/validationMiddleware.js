/*==========================================================
        GANGA MA.VI
        VALIDATION MIDDLEWARE
==========================================================*/

"use strict";

/*==========================================================
        LOGIN VALIDATION
==========================================================*/

const validateLogin = (
  request,

  response,

  next,
) => {
  /*==============================================
            GET REQUEST DATA
    ==============================================*/

  const {
    email,

    password,
  } = request.body;

  /*==============================================
            VALIDATE EMAIL
    ==============================================*/

  if (!email || email.trim() === "") {
    return response.status(400).json({
      success: false,

      message: "Email Is Required",
    });
  }

  /*==============================================
            VALIDATE PASSWORD
    ==============================================*/

  if (!password || password.trim() === "") {
    return response.status(400).json({
      success: false,

      message: "Password Is Required",
    });
  }

  /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

  next();
};

/*==========================================================
        REGISTER VALIDATION
==========================================================*/

const validateRegister = (
  request,

  response,

  next,
) => {
  /*==============================================
            GET REQUEST DATA
    ==============================================*/

  const {
    full_name,

    username,

    email,

    password,

    phone,
  } = request.body;

  /*==============================================
            VALIDATE REQUIRED FIELDS
    ==============================================*/

  if (!full_name || !username || !email || !password || !phone) {
    return response.status(400).json({
      success: false,

      message: "All Required Fields Must Be Filled",
    });
  }

  /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

  next();
};

/*==========================================================
        ADMISSION VALIDATION
==========================================================*/

const validateAdmission = (
  request,

  response,

  next,
) => {
  /*==============================================
            GET REQUEST DATA
    ==============================================*/

  const {
    academic_year_id,

    class_id,

    first_name,

    last_name,

    gender,

    date_of_birth,

    guardian_name,

    guardian_phone,
  } = request.body;

  /*==============================================
            VALIDATE REQUIRED FIELDS
    ==============================================*/

  if (
    !academic_year_id ||
    !class_id ||
    !first_name ||
    !last_name ||
    !gender ||
    !date_of_birth ||
    !guardian_name ||
    !guardian_phone
  ) {
    return response.status(400).json({
      success: false,

      message: "All Required Admission Fields Must Be Filled",
    });
  }

  /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

  next();
};

/*==========================================================
        STUDENT VALIDATION
==========================================================*/

const validateStudent = (
  request,

  response,

  next,
) => {
  /*==============================================
            GET REQUEST DATA
    ==============================================*/

  const {
    first_name,

    last_name,

    class_id,

    gender,
  } = request.body;

  /*==============================================
            VALIDATE REQUIRED FIELDS
    ==============================================*/

  if (!first_name || !last_name || !class_id || !gender) {
    return response.status(400).json({
      success: false,

      message: "Student Information Is Incomplete",
    });
  }

  /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

  next();
};

/*==========================================================
        TEACHER VALIDATION
==========================================================*/

const validateTeacher = (
  request,

  response,

  next,
) => {
  /*==============================================
            GET REQUEST DATA
    ==============================================*/

  const {
    full_name,

    email,

    phone,
  } = request.body;

  /*==============================================
            VALIDATE REQUIRED FIELDS
    ==============================================*/

  if (!full_name || !email || !phone) {
    return response.status(400).json({
      success: false,

      message: "Teacher Information Is Incomplete",
    });
  }

  /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

  next();
};

/*==========================================================
        NEWS VALIDATION
==========================================================*/

const validateNews = (

    request,

    response,

    next

) => {

    /*==============================================
            GET REQUEST DATA
    ==============================================*/

    const {

        title,

        description

    } = request.body;

    /*==============================================
            VALIDATE REQUIRED FIELDS
    ==============================================*/

    if (

        !title ||

        !description

    ) {

        return response.status(400).json({

            success: false,

            message: "News Title And Description Are Required"

        });

    }

    /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

    next();

};

/*==========================================================
        EVENT VALIDATION
==========================================================*/

const validateEvent = (

    request,

    response,

    next

) => {

    /*==============================================
            GET REQUEST DATA
    ==============================================*/

    const {

        title,

        event_date,

        location

    } = request.body;

    /*==============================================
            VALIDATE REQUIRED FIELDS
    ==============================================*/

    if (

        !title ||

        !event_date ||

        !location

    ) {

        return response.status(400).json({

            success: false,

            message: "Event Information Is Incomplete"

        });

    }

    /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

    next();

};

/*==========================================================
        GALLERY VALIDATION
==========================================================*/

const validateGallery = (

    request,

    response,

    next

) => {

    /*==============================================
            CHECK FILE
    ==============================================*/

    if (

        !request.file

    ) {

        return response.status(400).json({

            success: false,

            message: "Image File Is Required"

        });

    }

    /*==============================================
            NEXT MIDDLEWARE
    ==============================================*/

    next();

};

/*==========================================================
        EXPORT MIDDLEWARE
==========================================================*/

module.exports = {

    validateLogin,

    validateRegister,

    validateAdmission,

    validateStudent,

    validateTeacher,

    validateNews,

    validateEvent,

    validateGallery

};