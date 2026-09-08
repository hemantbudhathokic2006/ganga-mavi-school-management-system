"use strict";

const {
    hashPassword,
    comparePassword
} = require("./utils/password");

async function test() {

    const password = "admin123";

    const hash = await hashPassword(password);

    console.log("Password :", password);

    console.log("Hash :", hash);

    const matched = await comparePassword(password, hash);

    console.log("Matched :", matched);

}

test();