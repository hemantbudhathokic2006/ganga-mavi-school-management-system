/*==========================================================
        GANGA MA.VI
        ATTENDANCE MODEL
==========================================================*/

"use strict";

/*==========================================================
        IMPORT DATABASE
==========================================================*/

const { database } = require("../config/database");

/*==========================================================
        MARK ATTENDANCE
==========================================================*/

const markAttendance = async (attendance) => {

    try {

        const query = `

            INSERT INTO attendance (

                student_id,

                class_id,

                section_id,

                attendance_date,

                status,

                remarks,

                marked_by

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?

            )

        `;

        const values = [

            attendance.student_id,

            attendance.class_id,

            attendance.section_id,

            attendance.attendance_date,

            attendance.status,

            attendance.remarks,

            attendance.marked_by

        ];

        const [result] = await database.execute(

            query,

            values

        );

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        FIND ATTENDANCE BY ID
==========================================================*/

const findAttendanceById = async (id) => {

    try {

        const query = `

            SELECT *

            FROM attendance

            WHERE id = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [id]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        CHECK ATTENDANCE
==========================================================*/

const checkAttendance = async (

    studentId,

    attendanceDate

) => {

    try {

        const query = `

            SELECT *

            FROM attendance

            WHERE

                student_id = ?

                AND attendance_date = ?

            LIMIT 1

        `;

        const [rows] = await database.execute(

            query,

            [

                studentId,

                attendanceDate

            ]

        );

        return rows.length > 0 ? rows[0] : null;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        GET ATTENDANCE BY STUDENT
==========================================================*/

const getAttendanceByStudent = async (studentId) => {

    try {

        const query = `

            SELECT *

            FROM attendance

            WHERE student_id = ?

            ORDER BY attendance_date DESC

        `;

        const [rows] = await database.execute(

            query,

            [studentId]

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        GET ATTENDANCE BY CLASS
==========================================================*/

const getAttendanceByClass = async (

    classId,

    attendanceDate

) => {

    try {

        const query = `

            SELECT *

            FROM attendance

            WHERE

                class_id = ?

                AND attendance_date = ?

            ORDER BY student_id ASC

        `;

        const [rows] = await database.execute(

            query,

            [

                classId,

                attendanceDate

            ]

        );

        return rows;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        UPDATE ATTENDANCE
==========================================================*/

const updateAttendance = async (

    id,

    attendance

) => {

    try {

        const query = `

            UPDATE attendance

            SET

                status = ?,

                remarks = ?,

                marked_by = ?

            WHERE

                id = ?

        `;

        const values = [

            attendance.status,

            attendance.remarks,

            attendance.marked_by,

            id

        ];

        const [result] = await database.execute(

            query,

            values

        );

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        DELETE ATTENDANCE
==========================================================*/

const deleteAttendance = async (id) => {

    try {

        const query = `

            DELETE FROM attendance

            WHERE id = ?

        `;

        const [result] = await database.execute(

            query,

            [id]

        );

        return result;

    }

    catch (error) {

        throw error;

    }

};
/*==========================================================
        GET ATTENDANCE COUNT
==========================================================*/

const getAttendanceCount = async () => {

    try {

        const query = `

            SELECT

                COUNT(*) AS total

            FROM attendance

        `;

        const [rows] = await database.execute(query);

        return rows[0].total;

    }

    catch (error) {

        throw error;

    }

};/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    markAttendance,

    findAttendanceById,

    checkAttendance,

    getAttendanceByStudent,

    getAttendanceByClass,

    updateAttendance,

    deleteAttendance,

    getAttendanceCount

};
