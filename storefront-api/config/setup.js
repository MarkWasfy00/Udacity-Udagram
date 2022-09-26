const fs = require("fs");
const path = require("path");
const clc = require("cli-color");

fs.copyFile("config\\.env.example", path.resolve(__dirname , "../.env"), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(clc.bold.greenBright("env file created 📄 ..."));
    }
})