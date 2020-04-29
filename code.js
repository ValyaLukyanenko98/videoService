//получаем фильмы из appi
let requestFilmURL = "https://api.npoint.io/92face52350a7984a77d";

let requestFilms = new XMLHttpRequest();

requestFilms.open('GET', requestFilmURL);

requestFilms.responseType = 'json';
requestFilms.send();

requestFilms.onload = function() {
    let responceFilms = requestFilms.response;
    afterResponceFilms(responceFilms.films);
};

function afterResponceFilms(films) {
    let newFilms = document.getElementById('newFilms');
    for(let i=0; i < films.length; i++){
        let divNew = document.createElement('div');
        divNew.className='new';
        let divHolder = document.createElement('div');
        divHolder.className='holder';
        let img = document.createElement('img');
        let divBlock = document.createElement('div');
        divBlock.className='block';
        let p = document.createElement('p');
        divBlock.innerText = films[i].description;
        p.innerText = films[i].name;
        img.src = films[i].img_url;
        divHolder.appendChild(img);
        divHolder.appendChild(divBlock);
        divNew.appendChild(divHolder);
        divNew.appendChild(p);
        newFilms.appendChild(divNew);
    }
}


//получаем каналы из appi
let requestChannelsURL ="https://api.npoint.io/cc55edfde716b6a76ea2";

let requestChannels = new XMLHttpRequest();

requestChannels.open('GET', requestChannelsURL);

requestChannels.responseType = 'json';
requestChannels.send();

requestChannels.onload = function() {
    let responceChannels = requestChannels.response;
    afterResponceChannels(responceChannels.channels);
};
function afterResponceChannels(channels){
    for(let i=0; i < channels.length; i++){
        let array = [];

        for (let j =0; j < channels[i].programms.length; j++) {
            let programTime = getTime(channels[i].programms[j].time); // time = "14:30"

            let actualTime = new Date();

            if (programTime > actualTime) {
                array.push(channels[i].programms[j-1]);
                array.push(channels[i].programms[j]);
                array.push(channels[i].programms[j+1]);
                break;
            }
        }

        if (array.length === 0) {
            array.push(channels[i].programms[channels[i].programms.length-3]);
            array.push(channels[i].programms[channels[i].programms.length-2]);
            array.push(channels[i].programms[channels[i].programms.length-1]);
        }
        addChannelsToHTML(channels[i],array);
    }
}

function getTime(stringTime) {
    let hoursMinutes = stringTime.split(':');// массив 14,30
    let date = new Date();

    date.setHours(hoursMinutes[0], hoursMinutes[1], 0, 0);

    return date
}
let simpleBar = new SimpleBar(document.getElementById('scrollbar'),{
    autoHide: false,
    scrollbarMinSize: 50
});
let content = simpleBar.getContentElement();

function addChannelsToHTML(channel,array) {
    let divOneChannel = document.createElement('div');
    divOneChannel.className='oneChannel';
    let imgChannels = document.createElement('img');
    let tableChannels = document.createElement('table');
    tableChannels.className='channels';
    let captionChannel = document.createElement('caption');

    imgChannels.src = channel.img_url;
    captionChannel.innerText = channel.name;

    for (let i = 0; i < array.length; i++){
        let tdChannelTime = document.createElement('td');
        let tdChannelTVname = document.createElement('td');
        let trChannel = document.createElement('tr');
        tdChannelTime.innerText=array[i].time;
        tdChannelTVname.innerText=array[i].TVname;
        trChannel.appendChild(tdChannelTime);
        trChannel.appendChild(tdChannelTVname);
        tableChannels.appendChild(captionChannel);
        tableChannels.appendChild(trChannel);

    }
    divOneChannel.appendChild(imgChannels);
    divOneChannel.appendChild(tableChannels);

    content.appendChild(divOneChannel);
}

//окно авторизации
function showWindow(){
    let modalWrapper = document.getElementById("modalWrapper");
    let contentWindow = document.getElementById("contentWindow");
    modalWrapper.style.display = 'flex';
    contentWindow.style.display = 'block';
}
document.getElementById("btnEntrance").onclick = showWindow;

function noWindow(){
    let modalWrapper = document.getElementById("modalWrapper");
    let contentWindow = document.getElementById("contentWindow");
    modalWrapper.style.display = 'none';
    contentWindow.style.display = 'none';
}
document.getElementById("modalWrapper").onclick = noWindow;

//переключение табов
function switchoverTabFilms(){
    let films = document.getElementById("films");
    let tvPrograms = document.getElementById("tvPrograms");
    tvPrograms.style.display = 'none';
    films.style.display = 'block';
}

function switchoverTabTV(){
    let tvPrograms = document.getElementById("tvPrograms");
    let films = document.getElementById("films");
    films.style.display = 'none';
    tvPrograms.style.display = 'block';
}

let tabFilms = document.getElementById("tabFilms");
let tabChannels = document.getElementById("tabСhannels");

tabChannels.onclick = function() {
    tabChannels.classList.add('activ');
    tabFilms.classList.remove('activ');
    switchoverTabTV();
}

tabFilms.onclick = function() {
    tabFilms.classList.add('activ');
    tabChannels.classList.remove('activ');
    switchoverTabFilms();
}

document.getElementById("films").click();