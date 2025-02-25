const videocontainer = document.getElementById('videocontainer');
let miniplayerBtns = document.querySelectorAll('#mp-btn');
let blockstatus = NaN;
const miniplayerStatus = {};
let miniplayerPlaying = false;
let currentVideo = undefined;

function getVideosFromChannel(maxResults = 10) {
    if (isArchived()) {
        const disabledCSSClassname = 'yt-api-disabled-blockquote-border-color';
        const disabledstatusCSS = `
        .${disabledCSSClassname} {
            --blockquote-border-color: #cd0b28 !important;
        }`;
        setStyleTag(disabledstatusCSS, disabledCSSClassname);
        const disabledstatus = document.createElement('blockquote');
        disabledstatus.classList.add(disabledCSSClassname);
        const h4Disabled = document.createElement('h4');
        h4Disabled.textContent = "API YouTube disabilitata";
        const pDisabled = document.createElement('p');
        pDisabled.textContent = "La API di youtube è stata disabilitata perché il sito è in modalità archivio, per visualizzare i video visita il canale YouTube.";
        const aDisabled = document.createElement('a');
        aDisabled.href = "https://youtube.com/@star08-web";
        aDisabled.textContent = "Visita il canale YouTube";
        disabledstatus.appendChild(h4Disabled);
        disabledstatus.appendChild(pDisabled);
        disabledstatus.appendChild(aDisabled);
        videocontainer.appendChild(disabledstatus);
        return new Promise((resolve, reject) => {
            reject(new Error("API YouTube disabilitata"));
        });
    }
    return new Promise((resolve, reject) => {
        const apiUrl = `https://fetchyt.star08-web.workers.dev/?maxResults=${maxResults}`;
        const request = new XMLHttpRequest();
        request.open('GET', apiUrl, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const data = JSON.parse(request.responseText);
                const videos = data.items.map(item => {
                    return {
                        title: item.snippet.title,
                        videoId: item.id.videoId,
                        thumbnail: item.snippet.thumbnails.high.url
                    };
                });
                resolve(videos);
            } else {
                const errString = "Si è verificato il seguente errore:" + request.status;
                spawnnotify(errString, "error");
                console.error(errString);
                reject(new Error(errString));
            }
        };

        request.onerror = function () {
            const errString = "Si è verificato il seguente errore:" + request.status;
            spawnnotify(errString, "error");
            console.error(errString);
            reject(new Error(errString));
        };

        request.send();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getVideosFromChannel(30)
        .then(videos => {
            let grid = undefined;
            videos.forEach(element => {
                if (blockstatus === 2 || isNaN(blockstatus)) {
                    if (!isNaN(blockstatus)) {
                        videocontainer.appendChild(document.createElement('br'));
                    }
                    grid = document.createElement('div');
                    grid.classList.add('grid');
                    videocontainer.appendChild(grid);
                    blockstatus = 0;
                }
                const video = document.createElement('div');
                const box = document.createElement('article');
                box.dataset.videoId = element.videoId;
                box.id = `video-${element.videoId}`;
                box.innerHTML = `
                <header>
                    <img id="thumbnail" src="${element.thumbnail}" alt="${element.title}" style="border-radius: 7px;">
                    <iframe id="miniplayer" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: none; border-radius: 7px;"></iframe>
                </header>
                <h2>${element.title}</h2>
                <button onclick="replaceURL('https://www.youtube.com/watch?v=${element.videoId}')"><i class="fa-regular fa-circle-play"></i> Guarda su YouTube</button>
                <button id="mp-btn"><i class="fa-solid fa-tv"></i> Guarda nel miniplayer</button>
                <button onclick="copyToClipboard('https://www.youtube.com/watch?v=${element.videoId}')"><i class="fa-solid fa-link"></i> Copia link</button>
                `;
                video.appendChild(box);
                grid.appendChild(video);
                miniPlayerSettings(element.videoId, 'set', 'paused');
                blockstatus = blockstatus + 1;
            });
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });
});

function handleMiniplayer(elem){
    const videoId = elem.parentElement.dataset.videoId;
    const header = elem.parentElement.querySelector('header');
    const thumbnail = header.querySelector('#thumbnail');
    const miniplayer = header.querySelector('#miniplayer');
    if (miniplayerPlaying && currentVideo !== videoId) {
        spawnnotify("Chiudi il miniplayer corrente prima di aprirne un altro", "warning");
        return;
    }
    if (miniPlayerSettings(videoId, 'get') !== 'paused') {
        miniplayer.src = '';
        miniplayer.style.display = 'none';
        thumbnail.style.display = 'block';
        miniPlayerSettings(videoId, 'set', 'paused');
        miniplayerPlaying = false;
        currentVideo = undefined;
        return;
    }
    miniplayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    miniplayer.style.display = 'block';
    thumbnail.style.display = 'none';
    miniPlayerSettings(videoId, 'set', 'playing');
    miniplayerPlaying = true;
    currentVideo = videoId;
}

const searchMPBTNS = setInterval(() => {
    if (miniplayerBtns.length === 0) {
        miniplayerBtns = document.querySelectorAll('#mp-btn');
    } else {
        return clearInterval(searchMPBTNS);
    }
    miniplayerBtns.forEach(miniplayerBtn => {
        miniplayerBtn.addEventListener('click', function () {
            handleMiniplayer(this); 
        });
    });
}, 1000);


function miniPlayerSettings(vID, what, status = NaN){
    switch (what) {
        case 'get':
            return miniplayerStatus[vID];
        case 'set':
            if (!isNaN(status)) {
                spawnnotify("miniplayerStatus: param(status) isn't valid", "error");
                break;
            }
            miniplayerStatus[vID] = status;
            break;
    }
}

function isArchived(){
    return window.location.href.includes('archive');
}