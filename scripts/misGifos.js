/* Importar variables */

import { constraints, endpointCargar, apiKey, contador, detenerCronometro} from './variables.js';

/* Recuperar elementos y añadir eventos */

let comenzar = document.getElementById("comenzarGrab");
let grabar = document.getElementById("grabar");
let finalizar = document.getElementById("finalizar");
let subir = document.getElementById("subir");
let info1 = document.getElementById("info1");
let info2 = document.getElementById("info2");
let info3 = document.getElementById("info3");
let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let crear = document.getElementById("ownGif"); 
let video = document.getElementById("videoGif");
let contenedorVideo = document.getElementsByClassName("mainModalVideo");
let modalVideo = document.getElementById("modalVideo");
let imgVideoModal = document.getElementById("imgVideoModal");
let textVideoModal = document.getElementById("textVideoModal");

let idGif = null;
let status;
let arregloGifLocal = [];

/* EVENTOS PARA MANIPULAR TEXTOS Y CAMARAS CUANDO SE SELECCIONA LA OPCIÓN GRABAR */

comenzar.addEventListener("click", ()=>{
    console.log(crear.classList.contains("darkOwn"));
    if (crear.classList.contains("darkOwn")) {
        step1.style.border = "solid 1px #FFF"
        step1.style.backgroundColor = "#37383C";
        step1.style.color = "#FFF";
    }
    else {
        step1.style.color = "#FFF ";
        step1.style.backgroundColor = "#572EE5";
        step1.style.color = "#FFF ";
    }

    info1.innerText = "¿Nos das acceso a tu cámara?";
    info2.innerText = "El acceso a tu cámara será válido sólo";
    info2.innerText = "por el tiempo que estemos creado tu GIFO";

    obtenerPermisos();
});

comenzar.addEventListener("mouseover", ()=>{
    if (crear.classList.contains("darkOwn")) {
        comenzarGrab.style.backgroundColor = "#FFF";
        comenzarGrab.style.color = "#37383C";
    }
    else {
        comenzarGrab.style.backgroundColor = "#572EE5";
        comenzarGrab.style.color = "#FFF ";
    }
});

comenzar.addEventListener("mouseout" , ()=>{
    if (crear.classList.contains("darkOwn")) {
        comenzarGrab.style.backgroundColor = "#37383C";
        comenzarGrab.style.color = "#FFF";
    }
    else {
        comenzarGrab.style.backgroundColor = "#FFF";
        comenzarGrab.style.color = "#572EE5";
    }
});

grabar.addEventListener("click", ()=> {
    grabarGif();
    contador();

    if (crear.classList.contains("darkOwn")) {
        step1.style.border = "solid 1px #37383C";
        step1.style.backgroundColor = "#FFF";
        step1.style.color = "#37383C";
        step2.style.border = "solid 1px #FFF";
        step2.style.backgroundColor = "#37383C";
        step2.style.color = "#FFF";
    }
    else {
        step1.style.backgroundColor = "#FFF";
        step1.style.color = "#572EE5";
        step2.style.backgroundColor = "#572EE5";
        step2.style.color = "#FFF ";
    }

    grabar.style.display = "none";
    finalizar.style.display = "block";
});

finalizar.addEventListener("click", () => {
    detenerGif();
    detenerCronometro();

    if (crear.classList.contains("darkOwn")) {
        step2.style.backgroundColor = "#FFF";
        step2.style.color = "#37383C";
    }
    else {
        step2.style.backgroundColor = "#572EE5";
        step2.style.color = "#FFF ";
    }

    finalizar.style.display = 'none';
    subir.style.display = "block";
});

subir.addEventListener("click", ()=>{
    realizarCargaGif(videoBlob);
    subir.style.display = "none";

    if (crear.classList.contains("darkOwn")) {
        step2.style.border = "solid 1px #37383C";
        step2.style.backgroundColor = "#FFF";
        step2.style.color = "#37383C";
        step3.style.border = "solid 1px #FFF";
        step3.style.backgroundColor = "#37383C";
        step3.style.color = "#FFF";
    }
    else {
        step2.style.backgroundColor = "#FFF";
        step2.style.color = "#572EE5";
        step3.style.backgroundColor = "#572EE5";
        step3.style.color = "#FFF ";
    }
});

/* FUNCIONES PARA INICIAR CAM - GRABAR - TERMINAR */
let stream = null;
let videoBlob = null;
let recorder;

async function obtenerPermisos() {
    comenzar.style.display = "none";
    grabar.style.display = "block";
 
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            info1.style.display = "none";
            info2.style.display = "none";
            info3.style.display = "none";
            contenedorVideo[0].style.display = "block";
            video.style.display = "block";

            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) { 
            console.log(err.name + ": " + err.message); 
        });
}

function grabarGif(){
    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function (stream) {
            recorder = new RecordRTC(stream, {
                type: 'gif',
                mimeType: 'video/webm',
                recorderType: GifRecorder,
                disableLogs: true,
                quality: 6,
                width: 400,
                height: 320
            });
            recorder.startRecording();
            recorder.stream = stream;
        })
}

function detenerGif(){
    recorder.stopRecording( detenerCallBack);
}

function detenerCallBack(){
    videoBlob = recorder.getBlob();
    recorder.stream.stop();
    recorder.destroy();
    recorder = null;
}

function realizarCargaGif(vBloob){
    modalVideo.style.display = "block";
    let form = new FormData();
    form.append('file', vBloob, 'myGif.gif');
    console.log("info file");
    console.info(form.get('file'));

    cargarGif(form);
}

function cargarGif(gifForm) {
    console.warn("entra a método final");
    fetch(endpointCargar + '?api_key=' + apiKey , {
        method: 'POST',
        body: gifForm
    }).then(response => response.json())
    .then( jsonResult => {

        if (localStorage.getItem("misgifos") === null) {
            localStorage.setItem("misgifos", arregloGifLocal);
        }
        else {
            //console.log("Enta a si existe en local");
            let arreglo = localStorage.getItem("misgifos");
            arregloGifLocal = JSON.parse(arreglo);
            //console.warn("Arreglo antes de salir de validacion" + arregloGifLocal);
        }
  
        idGif = jsonResult.data.id;
        status = jsonResult.meta.status; 

        arregloGifLocal.push(idGif);
        
        actualizarModal();
        localStorage.setItem("misgifos", JSON.stringify(arregloGifLocal) );

    }).catch(function (error) {
        console.log("Ocurrió un error al cargar el endpoint");
        console.error(error);
    })
} 

function actualizarModal () {
    imgVideoModal.src = "images/icons/check.svg";
    textVideoModal.innerText = "GIFO subido con éxito";
}