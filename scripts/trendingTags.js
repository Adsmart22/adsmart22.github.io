/* Importar variables */

import { endpointTrendingTag, apiKey } from './variables.js';
const elementsTranding = [];

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
    //texto.innerHTML = tags;

    let lista = document.createElement("ul");
    
    //console.info(tags);

    for (let i=0; i < tags.length; i+=1 ) {
        let item = document.createElement("li");
        item.innerText = tags[i] ;
        
        item.addEventListener("click", ()=>{
            buscador.value = item.innerText;
        });
        lista.append(item);
        lista.append(",  ");
    }

    texto.append(lista);
}

obtenerTagsTrending ();