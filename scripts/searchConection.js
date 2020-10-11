/* Importar variables */

import { endpointAutocomplete, endpointSearch, apiKey, tituloGenerico, nombreGenerico, limpiarGridBusqueda } from './variables.js';
import {crearGiF} from './modalFuncionalidad.js';

/* agregar eventos a los botones */

let btnEjecutarBusqueda = document.getElementById("btnPanelBusqueda");
let inputBusqueda = document.getElementById("barraBuscadora");
let valorInput;
let limitSearch = 12;
let btnBusqueda = document.getElementById("masBusqueda");


btnEjecutarBusqueda.addEventListener("click", () => {
    valorInput = inputBusqueda.value;
    sessionStorage.setItem('addResult', '0');
    obtenerResultado(valorInput);
});

inputBusqueda.addEventListener('keydown', (event) => {
    if (event.which === 13 || event.key === 'Enter' ){
        valorInput = inputBusqueda.value;
        obtenerResultado(valorInput);
    }
});

/* Realizar conexión y carga de imagenes */

async function obtenerResultado(itemBusqueda) {
    let response = await fetch(endpointSearch + "?api_key="+ apiKey + "&q=" + itemBusqueda + "&limit=" + limitSearch);
    let searchResult = await response.json();
    let status = searchResult.meta.status;
    
    try {
        if (status === 200 && searchResult.data.length > 0) {
            crearResultadoBusqueda(searchResult.data, itemBusqueda);
            btnBusqueda.style.display = "block";
        }else if (searchResult.data.length === 0) {
            mostrarNoResultados();
        } else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error de conexión, intente más tarde")
        }
    }catch (error) {
        console.error(error);
    } 
}


function crearResultadoBusqueda(resultadoBusqueda, itemBusqueda){    
    let panelResultado = document.getElementsByClassName("resultOfSearch");
    let titulo = document.getElementById("result");
    let imgNoRes = document.getElementById("sinResulutados");

    if ( sessionStorage.getItem('addResult') === '0' ){
        limpiarGridBusqueda();
    }

    imgNoRes.style.display = "none";
    panelResultado[0].style.display = "block";
    titulo.innerText = itemBusqueda;

    /* Se valida información y se crean tarjetas */

    for(let i= 0; i < resultadoBusqueda.length; i+=1){
        let url = resultadoBusqueda[i].images.fixed_height_downsampled.url;
        let idGif = resultadoBusqueda[i].id;
        let name;
        let title;

        try {
            if(resultadoBusqueda[i].username === ""){
                throw new Error("No existe el username - asignar genérico");
            } else {
                name = resultadoBusqueda[i].username;
            } 
        }
        catch(error){
            name = nombreGenerico;
            console.error(error);
        }

        try {
            if(resultadoBusqueda[i].title === ""){
                throw new Error("No existe el display - asignar genérico");
            }else{
                title = resultadoBusqueda[i].title;
            } 
        }
        catch(error){
            title = tituloGenerico;
            console.error(error);
        }

        sessionStorage.setItem('indiceBusqueda', '12');
        crearGiF(idGif, url, name, title, "resultContainer", "gifResult", "modalView", "mainContainer");
    }
}

function mostrarNoResultados() {
    let panel = document.getElementsByClassName("resultOfSearch");
    let txt = document.getElementById("result");
    let imgNoRes = document.getElementById("sinResulutados");

    panel[0].style.display = "block";
    imgNoRes.style.display = "block";
    txt.innerText = "Sin resultados"
}

/* EVENTOS Y FUNCIONALIDAD PARA VER MAS */

 let btnVerMas = document.getElementById("masBusqueda");

 btnVerMas.addEventListener("click", () => {
     verMasGif(inputBusqueda.value);
 });

 async function verMasGif(itemBusqueda){
    let newResponse = await fetch(endpointSearch + "?api_key="+ apiKey + "&q=" + itemBusqueda + "&limit=" + limitSearch + "&offset=" + sessionStorage.getItem('indiceBusqueda'));
    let gifNewInfo = await newResponse.json();
    let status = gifNewInfo.meta.status;

    try {
        if (status === 200 && gifNewInfo.data.length > 0) {
            sessionStorage.setItem('addResult', '1');
            crearResultadoBusqueda(gifNewInfo.data, itemBusqueda);
        }else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error de conexión, intente más tarde")
        }
    }catch (error) {
        console.error(error);
    }
 }
 


 /* FUNCIONALIDAD PARA AUTOCOMPLETAR Y EJECUTAR BÚSQUEDA ENSEGUIDA */

/* EVENTOS Y FUNCIONALIDAD PARA AUTOMPLETAR */

let txtBusqueda = document.getElementById("barraBuscadora");

//Cuando cambie el input, hacer la búsqueda

txtBusqueda.addEventListener("keydown", () => {
    conectarAutocompetar();
    txtBusqueda.focus();
    limpiarGridBusqueda();
});

async function conectarAutocompetar(){
    let response = await fetch(endpointAutocomplete + "?api_key="+ apiKey + "&q=" + txtBusqueda.value);
    let tagsAuto = await response.json();
    let status = tagsAuto.meta.status;

    try {
        if (status === 200 && tagsAuto.data.length > 0) {
            limpiarLista();
            actualizarTags(tagsAuto.data);
            limpiarGridBusqueda();
        }
        else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error al recuperar la información")
        }
    }
    catch(error) {
        console.error(error);
    }
}

function limpiarLista(){
    let numeroItems = document.querySelectorAll('#coincidencias div');
    let lista = document.getElementById('coincidencias');
    let div;

    for(let i=0; div=numeroItems[i]; i++) {
        div.parentNode.removeChild(div);
    }
}

let panelBusqueda = document.getElementById('panelControl');
let btnCerrar = document.getElementById('cerrarBusqueda');

function actualizarTags(valores) {
    panelBusqueda.style.flexDirection = "row-reverse";
    btnCerrar.style.display = "block";
    limpiarGridBusqueda();

    let lista = document.getElementById("coincidencias");

    for ( let a=0; a < valores.length ; a+=1 ) {
        let listContainer = document.createElement("div");
        let imgLista = document.createElement("img");
        let itemList = document.createElement("li");
        
        itemList.innerText = valores[a].name;
        imgLista.src = "./images/icons/icon-search-mod-noc.svg";

        listContainer.addEventListener("click", () => {
            actualizarTexto(itemList.innerText, "actualizar");
        });

        btnCerrar.addEventListener("click", () => {
            actualizarTexto("", "borrar");
            limpiarGridBusqueda();
        })

        listContainer.append(imgLista);
        listContainer.append(itemList);
        lista.append(listContainer);
    }
}

function actualizarTexto(texto, accion) {
    if (accion === "borrar") {
        txtBusqueda.value="";
        txtBusqueda.focus();
    }else {
        txtBusqueda.value = texto;
        txtBusqueda.focus();
        console.warn("Antes de ejecutar el obtener resultado")
        obtenerResultado(txtBusqueda.value);
    }
    
    limpiarLista();
    limpiarGridBusqueda();
    panelBusqueda.style.flexDirection = "row";
    btnCerrar.style.display = "none";
}
