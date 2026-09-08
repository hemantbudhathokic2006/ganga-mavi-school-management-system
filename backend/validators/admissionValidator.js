/*==========================================================
        GANGA MA.VI
        ADMISSION VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE ADMISSION DATA
==========================================================*/

const validateAdmission = (admission) => {
  const errors = [];

  /*==============================================
            REQUIRED FIELDS
    ==============================================*/

  if (!admission.academic_year_id) {
    errors.push("Academic Year Is Required");
  }

  if (!admission.class_id) {
    errors.push("Class Is Required");
  }

  if (!admission.first_name || !admission.first_name.trim()) {
    errors.push("First Name Is Required");
  }

  if (!admission.last_name || !admission.last_name.trim()) {
    errors.push("Last Name Is Required");
  }

  if (!admission.gender) {
    errors.push("Gender Is Required");
  }

  if (!admission.date_of_birth) {
    errors.push("Date Of Birth Is Required");
  }

  if (!admission.father_name || !admission.father_name.trim()) {
    errors.push("Father Name Is Required");
  }

  if (!admission.guardian_phone || !admission.guardian_phone.trim()) {
    errors.push("Guardian Phone Is Required");
  }

  /*==============================================
            GENDER VALIDATION
    ==============================================*/

  if (
    admission.gender &&
    !["Male", "Female", "Other"].includes(admission.gender)
  ) {
    errors.push("Invalid Gender");
  }

  /*==============================================
            EMAIL VALIDATION
    ==============================================*/

  if (admission.email && !/^\S+@\S+\.\S+$/.test(admission.email)) {
    errors.push("Invalid Email Address");
  }

  /*==============================================
            PHONE VALIDATION
    ==============================================*/

  if (
    admission.guardian_phone &&
    !/^[0-9]{10}$/.test(admission.guardian_phone)
  ) {
    errors.push("Invalid Guardian Phone Number");
  }

  /*==============================================
            PERCENTAGE VALIDATION
    ==============================================*/

  if (
    admission.previous_percentage &&
    (admission.previous_percentage < 0 || admission.previous_percentage > 100)
  ) {
    errors.push("Previous Percentage Must Be Between 0 And 100");
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
        EXPORT
==========================================================*/

module.exports = {
  validateAdmission,
};
