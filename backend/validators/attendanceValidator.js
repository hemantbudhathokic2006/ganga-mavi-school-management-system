/*==========================================================
        GANGA MA.VI
        ATTENDANCE VALIDATOR
==========================================================*/

"use strict";

/*==========================================================
        VALIDATE ATTENDANCE
==========================================================*/

const validateAttendance = (attendance) => {

    const errors = [];

    /*==============================================
            REQUIRED FIELDS
    ==============================================*/

    if (!attendance.student_id) {

        errors.push("Student Is Required");

    }

    if (!attendance.class_id) {

        errors.push("Class Is Required");

    }

    if (!attendance.section_id) {

        errors.push("Section Is Required");

    }

    if (!attendance.attendance_date) {

        errors.push("Attendance Date Is Required");

    }

    if (!attendance.status) {

        errors.push("Attendance Status Is Required");

    }

    /*==============================================
            STATUS VALIDATION
    ==============================================*/

    if (

        attendance.status &&

        ![

            "Present",

            "Absent",

            "Late",

            "Leave"

        ].includes(attendance.status)

    ) {

        errors.push("Invalid Attendance Status");

    }

    /*==============================================
            MARKED BY VALIDATION
    ==============================================*/

    if (

        attendance.marked_by &&

        Number(attendance.marked_by) <= 0

    ) {

        errors.push("Invalid Teacher");

    }

    /*==============================================
            RETURN RESULT
    ==============================================*/

    return {

        isValid: errors.length === 0,

        errors

    };

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    validateAttendance

};