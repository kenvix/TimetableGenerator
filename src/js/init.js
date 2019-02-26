import jQuery from 'jquery';
import feather from 'feather-icons';
import { checkConfirmAttr, elExists, modalAlert, tryImage, writeAjaxInfo } from "./utils";

jQuery(document).ready(function ($) {
    feather.replace();

    if (localStorage.getItem("usercss")) {
        const css = localStorage.getItem("usercss");

        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'slot-user-css';
        style.appendChild(document.createTextNode(css));

        document.head.appendChild(style);
    }

    if (localStorage.getItem("userjs")) {
        const js = localStorage.getItem("userjs");

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'slot-user-js';
        script.appendChild(document.createTextNode(js));

        document.body.appendChild(script);
    }

    $("form[ajax]").submit(function (e) {
        e.preventDefault();

        if (!checkConfirmAttr(this))
            return false;

        const $form = $(this);
        const $submitBtn = $form.find("input[type=submit], button[type=submit]");
        const $captchaImg = $form.find(".ajax-code-img");
        const $captchaInput = $form.find(".ajax-code-input");
        const $infoArea = $form.find("div.ajax-info");

        if (elExists($submitBtn))
            $submitBtn.prop("disabled", true);

        $.ajax({
            url: $form.attr("action"),
            type: $form.attr("method") || 'GET',
            dataType: "json",
            cache: false,
            data: $form.serializeArray(),
            beforeSend: function (xhr) {
                if (elExists($infoArea)) {
                    $infoArea.find(".ajax-info-text").html("请稍候 ...");
                    $infoArea.show();
                }
            },
            complete: function (result) {
                const $tokenField = $form.find(`input[name='${formTokenName}']`);
                if (elExists($tokenField))
                    $tokenField.val(result.getResponseHeader(formTokenName));

                if (elExists($submitBtn))
                    $submitBtn.prop("disabled", false);
            },
            success: function (data) {
                writeAjaxInfo($infoArea, data.info);

                if (data.url) {
                    location.href = data.url;
                } else {
                    if (elExists($captchaInput))
                        $captchaInput.val('');

                    if (elExists($captchaImg))
                        $captchaImg.click();
                }
            },
            error: function (data) {
                writeAjaxInfo($infoArea, `错误: #${data.status} - ${e.statusText} - ${e.responseText}`);
            }
        });

        return false;
    });

    $("a[ajax], button[href]").click(function (e) {
        e.preventDefault();

        if (!checkConfirmAttr(this))
            return false;

        const $this = $(this);

        $.ajax({
            url: $this.attr("href"),
            type: "GET",
            dataType: "json",
            cache: false,
            beforeSend: function (xhr) {
                $this.prop("disabled", true);
            },
            complete: function (result) {
                $this.prop("disabled", false);
            },
            success: function (data) {
                modalAlert(data.info);

                if (data.url)
                    location.href = data.url;
            },
            error: function (data) {
                modalAlert(`错误: #${data.status} - ${e.statusText} - ${e.responseText}`);
            }
        });

        return false;
    });

    $("#skin_container").each(function () {
        const control = (checkbox, fn) => {
            let $cb = $(checkbox);
            fn($cb[0].checked);
            $cb.change(function () {
                fn(this.checked);
            });
        };

        Viewer.init(window.skinUrl, window.capeUrl, this)
            .then(viewer => {
                control("#skin_rotating", viewer.setRotating);
                control("#skin_walking", viewer.setWalking);
                control("#skin_running", viewer.setRunning);
                control("#skin_paused", viewer.setPaused);
                control("#skin_show_cape", viewer.setShowCape);
            });
    });
});
