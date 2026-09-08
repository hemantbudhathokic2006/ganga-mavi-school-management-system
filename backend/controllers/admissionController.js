/*==========================================================
        GANGA MA.VI
        ADMISSION CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const AdmissionModel = require("../models/Admission");

/*==========================================================
        IMPORT UTILITIES
==========================================================*/

const { v4: uuidv4 } = require("uuid");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const { validateAdmission } = require("../validators/admissionValidator");

/*==========================================================
        CREATE ADMISSION
==========================================================*/

const createAdmission = async (req, res) => {
  try {
    /*==============================================
                REQUEST BODY
        ==============================================*/

    const admission = req.body;
    /*==============================================
        HANDLE FILE UPLOADS
==============================================*/

    if (req.files) {
      admission.profile_photo = req.files.profile_photo
        ? req.files.profile_photo[0].filename
        : null;

      admission.birth_certificate = req.files.birth_certificate
        ? req.files.birth_certificate[0].filename
        : null;

      admission.transfer_certificate = req.files.transfer_certificate
        ? req.files.transfer_certificate[0].filename
        : null;

      admission.marksheet = req.files.marksheet
        ? req.files.marksheet[0].filename
        : null;
    }

    /*==============================================
        VALIDATE REQUEST
==============================================*/

    const validation = validateAdmission(admission);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,

        errors: validation.errors,
      });
    }

    /*==============================================
                GENERATE APPLICATION NUMBER
        ==============================================*/

    admission.application_number = `ADM-${new Date().getFullYear()}-${uuidv4()
      .substring(0, 8)

      .toUpperCase()}`;

    /*==============================================
                CHECK EMAIL
        ==============================================*/

    if (admission.email) {
      const existingEmail = await AdmissionModel.findAdmissionByEmail(
        admission.email,
      );

      if (existingEmail) {
        return res.status(409).json({
          success: false,

          message: "Email Already Exists",
        });
      }
    }

    /*==============================================
                CHECK APPLICATION NUMBER
        ==============================================*/

    const existingApplication =
      await AdmissionModel.findAdmissionByApplicationNumber(
        admission.application_number,
      );

    if (existingApplication) {
      return res.status(409).json({
        success: false,

        message: "Application Number Already Exists",
      });
    }

    /*==============================================
                SAVE ADMISSION
        ==============================================*/

    const result = await AdmissionModel.createAdmission(admission);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(201).json({
      success: true,

      message: "Admission Submitted Successfully",

      admissionId: result.insertId,

      applicationNumber: admission.application_number,
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
        GET ALL ADMISSIONS
==========================================================*/

const getAllAdmissions = async (req, res) => {
  try {
    /*==============================================
                FETCH ADMISSIONS
        ==============================================*/

    const admissions = await AdmissionModel.getAllAdmissions();

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      total: admissions.length,

      data: admissions,
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
        GET ADMISSION BY ID
==========================================================*/

const getAdmissionById = async (req, res) => {
  try {
    /*==============================================
                REQUEST PARAMETER
        ==============================================*/

    const { id } = req.params;

    /*==============================================
                FIND ADMISSION
        ==============================================*/

    const admission = await AdmissionModel.findAdmissionById(id);

    /*==============================================
                CHECK RECORD
        ==============================================*/

    if (!admission) {
      return res.status(404).json({
        success: false,

        message: "Admission Not Found",
      });
    }

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      data: admission,
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
        APPROVE ADMISSION
==========================================================*/

const approveAdmission = async (req, res) => {
  try {
    /*==============================================
                REQUEST PARAMETERS
        ==============================================*/

    const { id } = req.params;

    /*==============================================
                CHECK ADMISSION
        ==============================================*/

    const admission = await AdmissionModel.findAdmissionById(id);

    if (!admission) {
      return res.status(404).json({
        success: false,

        message: "Admission Not Found",
      });
    }

    /*==============================================
                APPROVE ADMISSION
        ==============================================*/

    await AdmissionModel.approveAdmission(id);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Admission Approved Successfully",
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
        REJECT ADMISSION
==========================================================*/

const rejectAdmission = async (req, res) => {
  try {
    /*==============================================
                REQUEST PARAMETERS
        ==============================================*/

    const { id } = req.params;

    const { remarks } = req.body;

    /*==============================================
                CHECK ADMISSION
        ==============================================*/

    const admission = await AdmissionModel.findAdmissionById(id);

    if (!admission) {
      return res.status(404).json({
        success: false,

        message: "Admission Not Found",
      });
    }

    /*==============================================
                REJECT ADMISSION
        ==============================================*/

    await AdmissionModel.rejectAdmission(
      id,

      remarks || null,
    );

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Admission Rejected Successfully",
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
        DELETE ADMISSION
==========================================================*/

const deleteAdmission = async (req, res) => {
  try {
    /*==============================================
                REQUEST PARAMETERS
        ==============================================*/

    const { id } = req.params;

    /*==============================================
                CHECK ADMISSION
        ==============================================*/

    const admission = await AdmissionModel.findAdmissionById(id);

    if (!admission) {
      return res.status(404).json({
        success: false,

        message: "Admission Not Found",
      });
    }

    /*==============================================
                DELETE ADMISSION
        ==============================================*/

    await AdmissionModel.deleteAdmission(id);

    /*==============================================
                SUCCESS RESPONSE
        ==============================================*/

    return res.status(200).json({
      success: true,

      message: "Admission Deleted Successfully",
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
        EXPORT
==========================================================*/

module.exports = {
  createAdmission,

  getAllAdmissions,

  getAdmissionById,

  updateAdmission,

  approveAdmission,

  rejectAdmission,

  deleteAdmission,
};
