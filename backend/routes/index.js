/*==========================================================
        GANGA MA.VI
        MAIN API ROUTER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT EXPRESS
==========================================================*/

const express = require("express");

const router = express.Router();

/*==========================================================
        IMPORT ROUTES
==========================================================*/

/* Authentication */
const authRoutes = require("./authRoutes");

/* Academic */
const academicYearRoutes = require("./academicYearRoutes");
const academicTermRoutes = require("./academicTermRoutes");
const classRoutes = require("./classRoutes");
const sectionRoutes = require("./sectionRoutes");
const subjectRoutes = require("./subjectRoutes");

/* User Management */
const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");
const parentRoutes = require("./parentRoutes");
const studentParentRoutes = require("./studentParentRoutes");

/* School Management */
const admissionRoutes = require("./admissionRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const examinationRoutes = require("./examinationRoutes");
const resultRoutes = require("./resultRoutes");

/* Finance */
const feeCategoryRoutes = require("./feeCategoryRoutes");
const studentFeeRoutes = require("./studentFeeRoutes");
const studentFeePaymentRoutes = require("./studentFeePaymentRoutes");


/* Website */
const newsRoutes = require("./newsRoutes");
const eventRoutes = require("./eventRoutes");
const galleryRoutes = require("./galleryRoutes");
const translateRoutes = require("./translate");

/*==========================================================
        API HEALTH CHECK
==========================================================*/

router.get("/", (request, response) => {
  return response.status(200).json({
    success: true,

    application: "Ganga Ma.Vi School Management System",

    version: "1.0.0",

    message: "Main API Router Working Successfully",
  });
});

/*==========================================================
        REGISTER API ROUTES
==========================================================*/

/* Authentication */
router.use("/auth", authRoutes);

/* Academic */
router.use("/academic-years", academicYearRoutes);
router.use("/academic-terms", academicTermRoutes);
router.use("/classes", classRoutes);
router.use("/sections", sectionRoutes);
router.use("/subjects", subjectRoutes);

/* User Management */
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);
router.use("/parents", parentRoutes);
router.use("/student-parents", studentParentRoutes);

/* School Management */
router.use("/admissions", admissionRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/examinations", examinationRoutes);
router.use("/results", resultRoutes);

/* Finance */
router.use("/fee-categories", feeCategoryRoutes);
router.use("/student-fees", studentFeeRoutes);
router.use("/student-fee-payments", studentFeePaymentRoutes);

/* Website */
router.use("/news", newsRoutes);
router.use("/events", eventRoutes);
router.use("/gallery", galleryRoutes);
router.use("/translate", translateRoutes);

/*==========================================================
        EXPORT ROUTER
==========================================================*/

module.exports = router;
