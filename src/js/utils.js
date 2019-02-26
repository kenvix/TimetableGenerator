import $ from 'jquery';

export function goToPage(targetPage) {
    if (targetPage < 1 || targetPage > totalPage)
        return false;

    $("#page-elevator-value").val(targetPage);
    $("#page-elevator").submit();

    return true;
}

export function showModal(text, title, size) {
    size = size || 'md';

    document.getElementById('alert_modal_dialog').className = 'modal-dialog modal-' + size;
    document.getElementById('watext').innerHTML = text;
    document.getElementById('watitle').innerHTML = title;

    $("#alert_modal").modal();
}

export function modalAlert(text, title) {
    while (/\n/.test(text) > 0) {
        text = text.replace(/\n/, '<br/>');
    }

    if (!text) {
        text = '未指定的异常';
    }

    if (!title) {
        title = '提示信息';
    }

    showModal(text, title, 'md');
}

export function elExists($jQueryObj) {
    return $jQueryObj && $jQueryObj.length;
}

export function scrollToEl(selector, time) {
    time = time || 555;
    $("html,body").animate({ scrollTop: $(selector).offset().top }, time);
}

export function checkConfirmAttr(obj) {
    if (typeof $(obj).attr("confirm") !== 'undefined')
        return confirm($(obj).attr("confirm"));
    else
        return true;
}

export function contactUs() {
    const prefix = "admin";
    const domain = "moecraft.net";
    const content = `Email: <a href="mailto: ${prefix}@${domain}">${prefix}@${domain}</a>
        Github Issues: <a href="https://github.com/MoeNetwork/MoeCraft" target="_blank">https://github.com/MoeNetwork/MoeCraft/issues</a>`;

    modalAlert(content, 'Contact Us');
}

export function writeAjaxInfo($jQueryObj, info) {
    if (!info)
        return;

    if (elExists($jQueryObj)) {
        $jQueryObj.find(".ajax-info-text").html(info);
        $jQueryObj.show();
    } else {
        modalAlert(info);
    }
}

export function parseMcColor(str) {
    let result = str.replace(/§[kf]/g, '');

    const colorSign = result.match(/§/g);

    result = result
        .replace(/§0/g, '<span style="color: black">')
        .replace(/§r/g, '<span style="color: black">')
        .replace(/§1/g, '<span style="color: darkblue">')
        .replace(/§2/g, '<span style="color: darkgreen">')
        .replace(/§3/g, '<span style="color: #006969">')
        .replace(/§4/g, '<span style="color: #690000">')
        .replace(/§5/g, '<span style="color: purple">')
        .replace(/§6/g, '<span style="color: #af9200">')
        .replace(/§7/g, '<span style="color: #7c7c7c">')
        .replace(/§8/g, '<span style="color: #696969">')
        .replace(/§9/g, '<span style="color: #0000af">')
        .replace(/§a/g, '<span style="color: #006900">')
        .replace(/§b/g, '<span style="color: #00afaf">')
        .replace(/§c/g, '<span style="color: #af0000">')
        .replace(/§d/g, '<span style="color: #af8688">')
        .replace(/§e/g, '<span style="color: #afaf00">')
        .replace(/§l/g, '<span style="font-weight: bold">')
        .replace(/§n/g, '<span style="text-decoration: underline">')
        .replace(/\n/g, '</span><br/>');

    if (colorSign) {
        result += '</span>'.repeat(colorSign.length);
    }

    return result;
}

export function tryImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(url);
        img.onerror = reject;
        img.src = url;
    });
}
