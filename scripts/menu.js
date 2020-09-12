/* recuperar opciones de menus */
let masOpcionesDiv = document.getElementById("moreOpt");
let modoOscuro = document.getElementById("nightModeOption");
let favoritos = document.getElementById("favoritesOption");
let misGif = document.getElementById("myGifOption");

/* Recuperar las secciones */

let bloqueGrabar = document.getElementById("ownGif");
let seccionBuscar = document.getElementById("main");
let seccionFavoritos = document.getElementById("favorites");
let seccionGifos = document.getElementById("myGifos");

/* Elemento grabar */
if(screen.width > 375){
    masOpcionesDiv.addEventListener( "click" , () => {
        cerrarBloques();
        bloqueGrabar.style.display = "block";
    });
}
else {
    bloqueGrabar.style.display = "none";
}


/* favoritos.addEventListener( "click" , () => {
    console.log("entra");
    bloqueGrabar.style.display = "none";
    seccionBuscar.style.display = "none";
    seccionGifos.style.display = "none";
    console.log("entra");
    seccionFavoritos.style.display = "block";
});

misGif.addEventListener( "click" , () => {
    cerrarBloques();
    //seccionGifos.style.display = "block";
});  */ 

function cerrarBloques(){
    bloqueGrabar.style.display = "none";
    seccionBuscar.style.display = "none";
    seccionFavoritos.style.display = "none";
    seccionGifos.style.display = "none";
}