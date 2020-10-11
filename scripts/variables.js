export const apiKey = "fIqIZpCyt2zeZ9jE83dOA4jVd5Du3GIK";
export const endpointTrending = "https://api.giphy.com/v1/gifs/trending";
export const endpointTrendingTag = "https://api.giphy.com/v1/trending/searches";
export const endpointSearch = "https://api.giphy.com/v1/gifs/search";
export const endpointAutocomplete = "https://api.giphy.com/v1/gifs/search/tags";
export const endpointGifById = "https://api.giphy.com/v1/gifs/";
export const tituloGenerico = "GIF animado";
export const nombreGenerico = "GIF";
export let arregloFavoritos = [];
export let constraints = { 
    audio: false, 
    video: {
        width: 400,
        height: 320,
    } 
};
export const endpointCargar = "https://upload.giphy.com/v1/gifs";
export function limpiarGrid(nameObject) {
    let grid = document.getElementById(nameObject);
    let panelNoFav = document.getElementById("noFavoritos");

    while( grid.firstChild ) {
        grid.removeChild( grid.firstChild );
    }

    panelNoFav.style.display = 'none';
}

let cronometro;

export function contador(){
    let segundos = 0;
    let minutos = 0;
    let contador = document.getElementById("contador");

    cronometro = setInterval(
        function(){        
            if( segundos == 60) {
                segundos = 0;
                minutos += 1;
            }

            contador.innerHTML = "00:0" + minutos + ":" + segundos;
            segundos += 1;
        }, 1000);
}

export function detenerCronometro() {
    clearInterval(cronometro);
}

export function limpiarGridBusqueda() {
    let grid = document.getElementById("resultContainer");
    let titulo = document.getElementById("result");
    let btnVerMas = document.getElementById("masBusqueda");
    let imgNoRes = document.getElementById("sinResulutados");

    titulo.innerHTML = "";
    btnVerMas.style.display = "none";
    imgNoRes.style.display = "none";

    while( grid.firstChild ) {
        grid.removeChild( grid.firstChild );
    }

    sessionStorage.setItem('indiceBusqueda', '0');
}