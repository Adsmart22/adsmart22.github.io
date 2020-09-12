/* Importar variables */

import { endpointTrendingTag, apiKey } from './variables.js';
const elementsTranding = [];

/* Conexion con API para busqueda de tags */

async function obtenerTagsTrending () {
    let response = await fetch(endpointTrendingTag + "?api_key="+ apiKey);
    let trendingInfo = await response.json();
    let status = trendingInfo.meta.status;
    
    try {
        if (status === 200) {
            /* console.log("entro al exito");
            console.log(trendingInfo.data);
            console.log(trendingInfo.data[0]);
            console.log(trendingInfo.data[1]); */

            for(let i = 0; i < 6; i+=1) {
                elementsTranding.push(trendingInfo.data[i]);
            }

            /* console.warn(elementsTranding); */
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
    texto.innerHTML = tags;
    /* console.log("Trending text" +texto);
    console.log("Arrays tags" + tags); */

    //console.log("Trending text" + tags.length)
}

obtenerTagsTrending ();