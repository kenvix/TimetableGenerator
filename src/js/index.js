//--------------------------------------------------
// Written by Kenvix <i@kenvix.com>
//--------------------------------------------------
import $ from 'jquery';

export let userClasses = [];

for (let i = 0; i < 7; i++) {
    userClasses[i] = [];
}

for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
        userClasses[i][j] = null;
    }
}


export function reloadAllClasses() {
    for (let i = 0; i < 7; i++)
        for (let j = 0; j < 5; j++)
            reloadClass(i, j);
}

export function reloadClass(classDay, classTime) {
    const targetHTML = $(`#class-${classDay}-${classTime}`);

    if (typeof userClasses[classDay] == "undefined" || typeof userClasses[classDay][classTime] == "undefined"
        || userClasses[classDay][classTime] == null) {
        targetHTML.html("+");
        targetHTML.attr("class", "btn btn-dark");
    } else {
        targetHTML.attr("class", "btn btn-success");
    }

    targetHTML.html(userClasses[classDay][classTime].name);
}

export function exportClasses() {
    const userId = $("#user-id").val();
    const userName = $("#user-name").val()
    createAndDownloadFile(userId + "-" + userName + ".json", JSON.stringify({
        version: 1.0,
        name: userName,
        id: userId,
        classes: userClasses
    }));
}

$(document).ready(() => {
    $(".class-button").click(target => {
        $("#sign-title-day").html($(target).attr("data-day"));
        $("#sign-title-time").html($(target).attr("data-time-readable"));

        const classDay = $(target).attr("data-day");
        const classTime = $(target).attr("data-time");
        $("#class-day").val(classDay);
        $("#class-time").val(classTime);

        $("#class-name").val(typeof userClasses[classDay] == "undefined" || typeof userClasses[classDay][classTime] == "undefined" || userClasses[classDay][classTime] == null ? "" : userClasses[classDay][classTime].name);
        $("#class-week").val(typeof userClasses[classDay] == "undefined" || typeof userClasses[classDay][classTime] == "undefined" || userClasses[classDay][classTime] == null ? "" : userClasses[classDay][classTime].weekList.join(","));

        $('#sign-modal').modal('show');
    });

    $("#class-delete").click(e => {
        const classDay = parseInt($("#class-day").val());
        const classTime = parseInt($("#class-time").val());

        if (typeof userClasses[classDay] != "undefined" && typeof userClasses[classDay][classTime] != "undefined"
            && userClasses[classDay][classTime] != null) {

            userClasses[classDay][classTime] = null;
            reloadClass(classDay, classTime);
        }

        $('#sign-modal').modal('toggle');
    });

    $("#class-import").click(e => {
        $("#class-import-file").click();
    });

    $("#class-import-file").change(e => {
        const files = $("#class-import-file").prop('files');

        if(files.length >= 1) {
            const reader = new FileReader();
            reader.readAsText(files[0], "UTF-8");

            reader.onload = evt => {
                const fileString = evt.target.result;
                console.debug(fileString);

                const content = JSON.parse(fileString);

                if (typeof content.version == "undefined") {
                    alert("无效的课表，请重新选择");
                } else {
                    $("#user-id").val(content.id);
                    $("#user-name").val(content.name);
                    userClasses = content.classes;
                    reloadAllClasses();
                }
            }
        }
    });

    $("#class-form").submit(e => {
        exportClasses();
        return false;
    });

    $("#sign-form").submit(e => {
        let weekList = [];
        const weekHTML = $("#class-week");
        const inputWeekText = weekHTML.val().replace("~", "-").replace(" ", "");

        const pattern = new RegExp("[^0-9,~\-]","i");
        if (pattern.test(inputWeekText)) {
            alert("周次输入中含有非法字符");
            return false;
        }

        const inputWeek = inputWeekText.split(",");
        const classDay = parseInt($("#class-day").val());
        const classTime = parseInt($("#class-time").val());

        console.info("Committed class: " + weekHTML.val());

        inputWeek.forEach(element => {
            if (element.indexOf("-") > 0) {
                const rangeBorder = element.split("-");

                if (rangeBorder.length >= 2 && !isNaN(rangeBorder[0]) && !isNaN(rangeBorder[1])) {
                    for (let i = parseInt(rangeBorder[0]); i <= parseInt(rangeBorder[1]); i++) {
                        if (weekList.indexOf(i) < 0)
                            weekList.push(i);
                    }
                }

            } else {
                if (!isNaN(element)) {
                    let elementAsNumber = parseInt(element);

                    if (weekList.indexOf(elementAsNumber) < 0)
                        weekList.push(elementAsNumber);
                }
            }
        });

        console.debug(weekList);

        if (typeof userClasses[classDay] == "undefined")
            userClasses[classDay] = [];

        userClasses[classDay][classTime] = {
            weekList: weekList,
            name: $("#class-name").val()
        };

        $('#sign-modal').modal('toggle');
        reloadClass(classDay, classTime);
        return false;
    });
});