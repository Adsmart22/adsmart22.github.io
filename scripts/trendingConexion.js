/* Importar variables */

import { endpointTrending, apiKey, tituloGenerico, nombreGenerico } from './variables.js';

/* Se agregan eventos a los botones */

let botonIzquierdo = document.getElementById("controlLeft");
let botonDerecho = document.getElementById("controlRight");
let imgFlechaIzq = document.getElementById("tredingLeft"); 
let imgFlechaDer = document.getElementById("controlRight");

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
    let response = await fetch(endpointTrending + "?api_key="+ apiKey + "&limit=" + limit);
    let gifInfo = await response.json();
    let status = gifInfo.meta.status;

    console.warn(gifInfo);

    console.log(status);
    console.log("Tmaño " + gifInfo.data.length);

    try {
        if (status === 200 && gifInfo.data.length > 0) {

            for (let i = 0; i < gifInfo.data.length; i+=1 ){
                let url = gifInfo.data[i].images.fixed_height_downsampled.url;
                /* let name = gifInfo.data[i].username;
                let title = gifInfo.data[i].title;  */
                let name ;
                let title ; 

                try{
                    if(!!gifInfo.data[i].user.username || gifInfo.data[i].user.username === ""){
                        throw new Error("No existe el username - asignar genérico");
                    } else {
                        name = gifInfo.data[i].user.username;
                    }
                }
                catch (error){
                    name = nombreGenerico;
                    console.error(error);
                }

                try {
                    if(!!gifInfo.data[i].user.display_name || gifInfo.data[i].user.display_name === ""){
                        throw new Error("No existe el display - asignar genérico");
                    }else{
                        title = gifInfo.data[i].user.display_name;
                    }
                } catch{
                    title = tituloGenerico;
                    //console.error(error);
                }
                
                crearGiF(url, name, title);
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

let contador = 0;
let modal = document.getElementById("modal");
const imagenModal = document.getElementById("centralImg");
const imgUser = document.getElementById("imgUser");

function crearGiF( urlGif, name, title){
    let contenedor = document.getElementById("resultTrendingGif");
    let card = document.createElement("img");

    card.src = urlGif;
    card.id = name;
    card.alt = title;
    card.setAttribute("class", "cardTrending");
    contenedor.append(card);

    card.addEventListener("click", () => {
        modal.style.display="block";
        imagenModal.src = card.src;
        imgUser.textContent = name;
 
        let titulo = document.createElement("span");
        titulo.innerText = title;
        imgUser.append(titulo);
    });
    contador+=1;
}

conectar();
