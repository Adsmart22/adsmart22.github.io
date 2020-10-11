/* Importar variables */

import { endpointTrending, apiKey, tituloGenerico, nombreGenerico, arregloFavoritos } from './variables.js';
import {crearGiF} from './modalFuncionalidad.js';


/* Se agregan eventos a los botones */

let botonIzquierdo = document.getElementById("controlLeft");
let botonDerecho = document.getElementById("controlRight");
let imgFlechaIzq = document.getElementById("tredingLeft"); 
let imgFlechaDer = document.getElementById("tredingRight");

    if(screen.width > 375){
        botonIzquierdo.addEventListener( "mouseover" , () => {
            botonIzquierdo.style.backgroundColor = "#572EE5";
            imgFlechaIzq.src = "./images/buttons/button-left-hover.svg";
        });
        botonIzquierdo.addEventListener( "mouseout" , () => {
            botonIzquierdo.style.backgroundColor = "#FFF";
            imgFlechaIzq.src = "./images/buttons/button-left.svg";
        }); 
        botonDerecho.addEventListener( "mouseover" , () => {
            botonDerecho.style.backgroundColor = "#572EE5";
            imgFlechaDer.src = "./images/buttons/button-right-hover.svg";
        });
        botonDerecho.addEventListener( "mouseout" , () => {
            botonDerecho.style.backgroundColor = "#FFF";
            imgFlechaDer.src = "./images/buttons/button-right.svg";
        });
    }


const limit = 12;

async function conectar () {
    let response = await fetch(endpointTrending + "?api_key="+ apiKey + "&limit=" + limit + "&rating=15");
    let gifInfo = await response.json();
    let status = gifInfo.meta.status;

    try {
        if (status === 200 && gifInfo.data.length > 0) {

            for (let i = 0; i < gifInfo.data.length; i+=1 ){
                let url = gifInfo.data[i].images.fixed_height_downsampled.url;
                let name ;
                let title ; 
                let idGif = gifInfo.data[i].id;

                try{
                    if(gifInfo.data[i].username === ""){
                        throw new Error("No existe el username - asignar genérico");
                    } else {
                        name = gifInfo.data[i].username;
                    }
                }
                catch (error){
                    name = nombreGenerico;
                    console.error(error);
                }

                try {
                    if(gifInfo.data[i].title === ""){
                            throw new Error("No existe el display - asignar genérico");
                    }else{
                        title = gifInfo.data[i].title;
                    }
                } catch{
                    title = tituloGenerico;
                }
                crearGiF(idGif, url, name, title, "resultTrendingGif", "cardTrending", "modalViewTrend", "mainContainerTrend");
            } 
            sessionStorage.setItem('indiceTrending', '12');
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

conectar();