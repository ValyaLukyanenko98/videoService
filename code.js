//окно авторизации
function showWindow(){
    var modalWrapper = document.getElementById("modalWrapper");
    var contentWindow = document.getElementById("contentWindow");
    modalWrapper.style.display = 'flex';
    contentWindow.style.display = 'block';
}
document.getElementById("btnEntrance").onclick = showWindow;

function noWindow(){
    var modalWrapper = document.getElementById("modalWrapper");
    var contentWindow = document.getElementById("contentWindow");
    modalWrapper.style.display = 'none';
    contentWindow.style.display = 'none';
}
document.getElementById("modalWrapper").onclick = noWindow;

//переключение табов
function switchoverTabFilms(){
    var films = document.getElementById("films");
    var tvPrograms = document.getElementById("tvPrograms");
    tvPrograms.style.display = 'none';
    films.style.display = 'block';
}

function switchoverTabTV(){
    var tvPrograms = document.getElementById("tvPrograms");
    var films = document.getElementById("films");
    films.style.display = 'none';
    tvPrograms.style.display = 'block';
}

var tabFilms = document.getElementById("tabFilms");
tabFilms.onclick = function() {
    tabFilms.classList.add('activ');
    tabСhannels.classList.remove('activ');
    switchoverTabFilms();
}

var tabСhannels = document.getElementById("tabСhannels");
tabСhannels.onclick = function() {
    tabСhannels.classList.add('activ');
    tabFilms.classList.remove('activ');
    switchoverTabTV();
}