#!/usr/bin/env node

var ejs = require("ejs");
var fs = require("fs");

const basrSrcPath = "src/page/";
const basrHtmlPath = "Public/";

function renderFile(file, pageTitle) {
    var inputFilePath = basrSrcPath + file + ".ejs";
    var outputFilePath = basrHtmlPath + file + ".html";

    ejs.renderFile(inputFilePath, { title: pageTitle }, {}, (err, str) => {
        if (err)
            throw err;
        fs.access(outputFilePath, fs.constants.F_OK, (err) => {

            fs.unlink(outputFilePath, (err) => {

                fs.writeFile(outputFilePath, str, 'utf8', (err) => {
                    if (err)
                        throw err;

                    console.log("Generated: " + outputFilePath);
                });

            });

        });
    });
}

renderFile("index", "登记课表");