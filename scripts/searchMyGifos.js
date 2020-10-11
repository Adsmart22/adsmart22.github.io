/* Importar variables */

import { endpointGifById, apiKey, tituloGenerico, nombreGenerico, limpiarGrid } from './variables.js';
import {crearGiF} from './modalFuncionalidad.js';

/* AGREGAR EVENTOS A BOTONES */

let myG = document.getElementById("misGifOpt");
let gifosLocal = localStorage.getItem("misgifos") ;
let arregloLocal = JSON.parse(gifosLocal);


myG.addEventListener("click", () => {
    limpiarGrid("gifosItems");

    if(!gifosLocal || arregloLocal.length === 0){
        console.log("No hay favoritos");
        let panelNoGif = document.getElementById("noGifos");
        panelNoGif.style.display = 'block';
    }
    else {    
        for(let i=0; i < arregloLocal.length; i+=1) {
            obtenerGif(arregloLocal[i]);
        }
    }
});

async function obtenerGif(idGif) {
    let response = await fetch(endpointGifById + idGif + "?api_key="+ apiKey);
    let gifResult = await response.json();
    let status = gifResult.meta.status;

    try {
        if (status === 200 && !(gifResult.data === "")) {
            crearTarjeta(gifResult.data);
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

function crearTarjeta(data){
    let url = data.images.fixed_height_downsampled.url;
    let idGif = data.id;
    let name;
    let title;

    try {
        if(data.username === ""){
            throw new Error("No existe el username - asignar genérico");
        } else {
            name = data.username;
        } 
    }
    catch(error){
        name = nombreGenerico;
        console.error(error);
    }

    try {
        if(data.title === ""){
            throw new Error("No existe el display - asignar genérico");
        }else{
            title = data.title;
        } 
    }
    catch(error){
        title = tituloGenerico;
        console.error(error);
    }

    crearGiF(idGif, url, name, title, "gifosItems", "imgGifItem", "modalViewFavGif", "mainContFavGif");
}