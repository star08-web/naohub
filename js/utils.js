function checkCookie(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return true;
        }
    }
    return false;
}

function createCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function setStyleTag(cssCode, id="") {
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(cssCode));
    document.head.appendChild(styleTag);
    styleTag.id = id
}

function deleteCookie(cookieName) {
    const date = new Date('Thu, 22 Sept 1999 00:00:00 UTC'); // haha little easter egg
    document.cookie = cookieName + "=; expires=" + date.toUTCString() + "; path=/;";
}

function replaceURL(uri){
    window.location.href = uri
}

function copyToClipboard(content, type="link") {
    var tempInput = document.createElement("input");
    tempInput.value = content;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    spawnnotify(`${type} copiato negli appunti`, 'success')
}

function isMobile() {
    let mobile = false;
    let userAgent = navigator.userAgent;
    let mobileAgents = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
    for (let i = 0; i < mobileAgents.length; i++) {
        if (userAgent.indexOf(mobileAgents[i]) > -1) {
            mobile = true;
            break;
        }
    }
    return mobile;
}

// Preload Images Self Invoking Function
document.addEventListener('DOMContentLoaded', function() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        const preload = new Image();
        preload.src = images[i].src;
    }
});