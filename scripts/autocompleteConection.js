/* Importar variables */

import { endpointSearch, apiKey, endpointAutocomplete } from './variables.js';

/* EVENTOS Y FUNCIONALIDAD PARA AUTOMPLETAR */

let txtBusqueda = document.getElementById("barraBuscadora");

//Cuando cambie el input, hacer la búsqueda

txtBusqueda.addEventListener("keydown", () => {
    conectarAutocompetar();
    txtBusqueda.focus();
});

async function conectarAutocompetar(){
    let response = await fetch(endpointAutocomplete + "?api_key="+ apiKey + "&q=" + txtBusqueda.value);
    let tagsAuto = await response.json();
    let status = tagsAuto.meta.status;

    try {
        if (status === 200 && tagsAuto.data.length > 0) {
            limpiarLista();
            actualizarTags(tagsAuto.data);
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
    }
    
    limpiarLista();
    panelBusqueda.style.flexDirection = "row";
    btnCerrar.style.display = "none";
}
