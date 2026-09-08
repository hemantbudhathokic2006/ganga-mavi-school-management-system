/*==========================================================
        CREATE ADMISSION
==========================================================*/

const createAdmission = async (admission) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            INSERT INTO admissions (

                application_number,

                academic_year_id,

                class_id,

                first_name,

                middle_name,

                last_name,

                gender,

                date_of_birth,

                blood_group,

                nationality,

                religion,

                caste,

                phone,

                email,

                address,

                city,

                district,

                province,

                postal_code,

                father_name,

                mother_name,

                guardian_name,

                guardian_phone,

                previous_school,

                previous_class,

                previous_percentage,

                profile_photo,

                birth_certificate,

                transfer_certificate,

                marksheet,

                application_status,

                remarks

            )

            VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?

            )

        `;

    /*==============================================
                QUERY PARAMETERS
        ==============================================*/

    const values = [
      admission.application_number,

      admission.academic_year_id,

      admission.class_id,

      admission.first_name,

      admission.middle_name,

      admission.last_name,

      admission.gender,

      admission.date_of_birth,

      admission.blood_group,

      admission.nationality,

      admission.religion,

      admission.caste,

      admission.phone,

      admission.email,

      admission.address,

      admission.city,

      admission.district,

      admission.province,

      admission.postal_code,

      admission.father_name,

      admission.mother_name,

      admission.guardian_name,

      admission.guardian_phone,

      admission.previous_school,

      admission.previous_class,

      admission.previous_percentage,

      admission.profile_photo,

      admission.birth_certificate,

      admission.transfer_certificate,

      admission.marksheet,

      admission.application_status,

      admission.remarks,
    ];

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      values,
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
        FIND ADMISSION BY APPLICATION NUMBER
==========================================================*/

const findAdmissionByApplicationNumber = async (applicationNumber) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT *

            FROM admissions

            WHERE application_number = ?

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [applicationNumber],
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
        FIND ADMISSION BY ID
==========================================================*/

const findAdmissionById = async (id) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT *

            FROM admissions

            WHERE id = ?

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [id],
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
        FIND ADMISSION BY EMAIL
==========================================================*/

const findAdmissionByEmail = async (email) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT *

            FROM admissions

            WHERE email = ?

            LIMIT 1

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(
      query,

      [email],
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
        GET ALL ADMISSIONS
==========================================================*/

const getAllAdmissions = async () => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            SELECT

                admissions.*,

                academic_years.academic_year_name AS academic_year,

                classes.class_name

            FROM admissions

            INNER JOIN academic_years

                ON admissions.academic_year_id = academic_years.id

            INNER JOIN classes

                ON admissions.class_id = classes.id

            ORDER BY admissions.applied_at DESC

        `;

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [rows] = await database.execute(query);

    /*==============================================
                RETURN RESULT
        ==============================================*/

    return rows;
  } catch (error) {
    throw error;
  }
};

/*==========================================================
        UPDATE ADMISSION
==========================================================*/

const updateAdmission = async (id, admission) => {
  try {
    /*==============================================
                SQL QUERY
        ==============================================*/

    const query = `

            UPDATE admissions

            SET

                academic_year_id = ?,

                class_id = ?,

                first_name = ?,

                middle_name = ?,

                last_name = ?,

                gender = ?,

                date_of_birth = ?,

                blood_group = ?,

                nationality = ?,

                religion = ?,

                caste = ?,

                phone = ?,

                email = ?,

                address = ?,

                city = ?,

                district = ?,

                province = ?,

                postal_code = ?,

                father_name = ?,

                mother_name = ?,

                guardian_name = ?,

                guardian_phone = ?,

                previous_school = ?,

                previous_class = ?,

                previous_percentage = ?,

                profile_photo = ?,

                birth_certificate = ?,

                transfer_certificate = ?,

                marksheet = ?,

                remarks = ?

            WHERE id = ?

        `;

    /*==============================================
                QUERY PARAMETERS
        ==============================================*/

    const values = [
      admission.academic_year_id,

      admission.class_id,

      admission.first_name,

      admission.middle_name,

      admission.last_name,

      admission.gender,

      admission.date_of_birth,

      admission.blood_group,

      admission.nationality,

      admission.religion,

      admission.caste,

      admission.phone,

      admission.email,

      admission.address,

      admission.city,

      admission.district,

      admission.province,

      admission.postal_code,

      admission.father_name,

      admission.mother_name,

      admission.guardian_name,

      admission.guardian_phone,

      admission.previous_school,

      admission.previous_class,

      admission.previous_percentage,

      admission.profile_photo,

      admission.birth_certificate,

      admission.transfer_certificate,

      admission.marksheet,

      admission.remarks,

      id,
    ];

    /*==============================================
                EXECUTE QUERY
        ==============================================*/

    const [result] = await database.execute(
      query,

      values,
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
        APPROVE ADMISSION
==========================================================*/

const approveAdmission = async (id) => {

    try {

        /*==============================================
                SQL QUERY
        ==============================================*/

        const query = `

            UPDATE admissions

            SET

                application_status = 'Approved'

            WHERE id = ?

        `;

        /*==============================================
                EXECUTE QUERY
        ==============================================*/

        const [result] = await database.execute(

            query,

            [

                id

            ]

        );

        /*==============================================
                RETURN RESULT
        ==============================================*/

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        REJECT ADMISSION
==========================================================*/

const rejectAdmission = async (id, remarks) => {

    try {

        /*==============================================
                SQL QUERY
        ==============================================*/

        const query = `

            UPDATE admissions

            SET

                application_status = 'Rejected',

                remarks = ?

            WHERE id = ?

        `;

        /*==============================================
                EXECUTE QUERY
        ==============================================*/

        const [result] = await database.execute(

            query,

            [

                remarks,

                id

            ]

        );

        /*==============================================
                RETURN RESULT
        ==============================================*/

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        DELETE ADMISSION
==========================================================*/

const deleteAdmission = async (id) => {

    try {

        /*==============================================
                SQL QUERY
        ==============================================*/

        const query = `

            DELETE FROM admissions

            WHERE id = ?

        `;

        /*==============================================
                EXECUTE QUERY
        ==============================================*/

        const [result] = await database.execute(

            query,

            [

                id

            ]

        );

        /*==============================================
                RETURN RESULT
        ==============================================*/

        return result;

    }

    catch (error) {

        throw error;

    }

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = {

    createAdmission,

    findAdmissionByApplicationNumber,

    findAdmissionById,

    findAdmissionByEmail,

    getAllAdmissions,

    updateAdmission,

    approveAdmission,

    rejectAdmission,

    deleteAdmission

};