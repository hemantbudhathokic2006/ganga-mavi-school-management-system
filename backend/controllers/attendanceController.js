/*==========================================================
        GANGA MA.VI
        ATTENDANCE CONTROLLER
==========================================================*/

"use strict";

/*==========================================================
        IMPORT MODEL
==========================================================*/

const {

    markAttendance,

    findAttendanceById,

    checkAttendance,

    getAttendanceByStudent,

    getAttendanceByClass,

    updateAttendance,

    deleteAttendance,

    getAttendanceCount

} = require("../models/Attendance");

/*==========================================================
        IMPORT VALIDATOR
==========================================================*/

const {

    validateAttendance

} = require("../validators/attendanceValidator");

/*==========================================================
        IMPORT RESPONSE
==========================================================*/

const {

    successResponse,

    errorResponse

} = require("../utils/response");

/*==========================================================
        MARK ATTENDANCE
==========================================================*/

const markAttendanceController = async (

    request,

    response

) => {

    try {

        const attendance = request.body;

        /*==============================================
                VALIDATE DATA
        ==============================================*/

        const validation = validateAttendance(attendance);

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        /*==============================================
                CHECK DUPLICATE
        ==============================================*/

        const existing = await checkAttendance(

            attendance.student_id,

            attendance.attendance_date

        );

        if (existing) {

            return errorResponse(

                response,

                409,

                "Attendance Already Marked"

            );

        }

        /*==============================================
                SAVE ATTENDANCE
        ==============================================*/

        const result = await markAttendance(attendance);

        return successResponse(

            response,

            201,

            "Attendance Marked Successfully",

            {

                attendance_id: result.insertId

            }

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        GET ATTENDANCE BY STUDENT
==========================================================*/

const getAttendanceByStudentController = async (

    request,

    response

) => {

    try {

        const attendance = await getAttendanceByStudent(

            request.params.studentId

        );

        return successResponse(

            response,

            200,

            "Attendance Retrieved Successfully",

            attendance

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};

/*==========================================================
        GET ATTENDANCE BY CLASS
==========================================================*/

const getAttendanceByClassController = async (

    request,

    response

) => {

    try {

        const attendance = await getAttendanceByClass(

            request.params.classId,

            request.query.date

        );

        return successResponse(

            response,

            200,

            "Attendance Retrieved Successfully",

            attendance

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        UPDATE ATTENDANCE
==========================================================*/

const updateAttendanceController = async (

    request,

    response

) => {

    try {

        const validation = validateAttendance(

            request.body

        );

        if (!validation.isValid) {

            return errorResponse(

                response,

                400,

                "Validation Failed",

                validation.errors

            );

        }

        const attendance = await findAttendanceById(

            request.params.id

        );

        if (!attendance) {

            return errorResponse(

                response,

                404,

                "Attendance Record Not Found"

            );

        }

        await updateAttendance(

            request.params.id,

            request.body

        );

        return successResponse(

            response,

            200,

            "Attendance Updated Successfully"

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        DELETE ATTENDANCE
==========================================================*/

const deleteAttendanceController = async (

    request,

    response

) => {

    try {

        const attendance = await findAttendanceById(

            request.params.id

        );

        if (!attendance) {

            return errorResponse(

                response,

                404,

                "Attendance Record Not Found"

            );

        }

        await deleteAttendance(

            request.params.id

        );

        return successResponse(

            response,

            200,

            "Attendance Deleted Successfully"

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        GET ATTENDANCE COUNT
==========================================================*/

const getAttendanceCountController = async (

    request,

    response

) => {

    try {

        const total = await getAttendanceCount();

        return successResponse(

            response,

            200,

            "Attendance Count Retrieved Successfully",

            {

                total

            }

        );

    }

    catch (error) {

        console.error(error);

        return errorResponse(

            response,

            500,

            "Internal Server Error"

        );

    }

};
/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    markAttendanceController,

    getAttendanceByStudentController,

    getAttendanceByClassController,

    updateAttendanceController,

    deleteAttendanceController,

    getAttendanceCountController

};