/*==========================================================
        GANGA MA.VI
        GLOBAL ERROR HANDLER
==========================================================*/

"use strict";

/*==========================================================
        ERROR HANDLER
==========================================================*/

const errorHandler = (

    error,

    request,

    response,

    next

) => {

    console.error(error);

    return response.status(

        error.statusCode || 500

    ).json({

        success: false,

        message:

            error.message ||

            "Internal Server Error"

    });

};

/*==========================================================
        EXPORT
==========================================================*/

module.exports = errorHandler;