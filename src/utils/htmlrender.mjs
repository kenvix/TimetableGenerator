'use strict';

import getRenderInnerFunctions from "./functions";
import ejs from "ejs";
import fs from "fs";

const baseSrcPath = "src/page/";
const baseHtmlPath = "Public/";


function renderFile(file, pageTitle) {
    const inputFilePath = baseSrcPath + file + ".ejs";
    const outputFilePath = baseHtmlPath + file + ".html";

    ejs.renderFile(inputFilePath, Object.assign({ title: pageTitle }, getRenderInnerFunctions()), {}, (err, str) => {
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