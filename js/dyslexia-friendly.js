let trigger = document.getElementById('d-triggerer');

document.addEventListener('DOMContentLoaded', () => {
    if (checkCookie('d-enabled')){
        optimizesited(true);
    }
})

trigger.addEventListener('click', () => {
        if (!checkCookie('d-enabled')){
            spawnnotify('Dyslexia Friendly Mode activated');
            console.log('Dyslexia Friendly Mode activated');
            createCookie('d-enabled', true, 360);
            optimizesited(true);
        } else {
            spawnnotify('Dyslexia Friendly Mode disactivated');
            console.log('Dyslexia Friendly Mode disactivated');
            deleteCookie('d-enabled');
            optimizesited(false);
        }
});

function optimizesited(enabled){
    if (enabled){
        const blurElements = document.getElementsByClassName('blur');
        while (blurElements.length > 0) {
            blurElements[0].remove();
        }
        const gridElements = document.getElementsByClassName('grid-item');
        while (gridElements.length > 0) {
            gridElements[0].remove();
        }
        const gridbg = document.getElementsByClassName('grid-bg');
        while (gridbg.length > 0) {
            gridbg[0].remove();
        }
        const stylesheet = ":root{ --font-family: 'OpenDyslexic', 'Comic Sans MS', 'Verdana', ui-sans-serif, sans-serif, 'Noto Emoji' !important; --background-color: wheat !important;} .font-nunito{font-family: var(--font-family) !important;} h1,h2,h3,h4,h5,h6,p,button,div,:root,html,body{--color: black !important;} .nav-link-label{--color: white !important;} .navbar{backdrop-filter: blur(0px) !important; background-color: black !important; border-radius:0px !important;} .menu{background-color:black;}";
        setStyleTag(stylesheet, 'd-style__');
        document.body.dataset.theme = "light"
    } else {
        document.body.dataset.theme = "dark"
        document.getElementById("d-style__").remove();
        var gridBg = document.createElement('div');
        gridBg.classList.add('grid-bg');
        var blurDiv = document.createElement('div');
        blurDiv.classList.add('blur');
        document.querySelector('.site-wrap').appendChild(gridBg);
        document.querySelector('.site-wrap').appendChild(blurDiv);
        initbg()
    }
}