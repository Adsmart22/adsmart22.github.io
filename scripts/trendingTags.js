/* Importar variables */

import { endpointTrendingTag, apiKey, limpiarGridBusqueda, endpointSearch, tituloGenerico, nombreGenerico } from './variables.js';
const elementsTranding = [];
import {crearGiF} from './modalFuncionalidad.js';
let limitSearch = 12;
let btnBusqueda = document.getElementById("masBusqueda");

/* Conexion con API para busqueda de tags */

async function obtenerTagsTrending () {
    let response = await fetch(endpointTrendingTag + "?api_key="+ apiKey);
    let trendingInfo = await response.json();
    let status = trendingInfo.meta.status;
    
    try {
        if (status === 200 && trendingInfo.data.length > 0) {
            for(let i = 0; i < 6; i+=1) {
                elementsTranding.push(trendingInfo.data[i]);
            }

            actualizarTagsFont(elementsTranding);
        } else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error de conexión, intente más tarde")
        }
    }catch (error) {
        console.error(error);
    } 
};

function actualizarTagsFont(tags){
    let texto = document.getElementById("trendingText");
    let buscador = document.getElementById("barraBuscadora");
    let lista = document.createElement("ul");
    
    for (let i=0; i < tags.length; i+=1 ) {
        let item = document.createElement("li");
        item.innerText = tags[i] ;
        
        item.addEventListener("click", ()=>{
            buscador.value = item.innerText;
            obtenerResultado(buscador.value);
            limpiarGridBusqueda();
        });
        lista.append(item);
        lista.append(",  ");
    }

    texto.append(lista);
}

obtenerTagsTrending ();



/* FUNCION PARA LA BUSQUEDA AUTOMATICA */

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