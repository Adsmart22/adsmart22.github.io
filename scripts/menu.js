/* recuperar opciones de menus */
let masOpcionesDiv = document.getElementById("moreOpt");  // Funciona OK
let favoritosM = document.getElementById("favoritosOpt");
let misGif = document.getElementById("misGifOpt");
let logo = document.getElementById("logo");

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

favoritosM.addEventListener("click", () => {
    cerrarBloques();
    seccionFavoritos.style.display = "block";
});

misGif.addEventListener("click", () => {
    cerrarBloques();
    seccionGifos.style.display = "block";
});

function cerrarBloques(){
    bloqueGrabar.style.display = "none";
    seccionBuscar.style.display = "none";
    seccionFavoritos.style.display = "none";
    seccionGifos.style.display = "none";
}

logo.addEventListener("click", () => {
    cerrarBloques();
    seccionBuscar.style.display = "block";
    //location.reload();
    let searchImg = document.getElementById("searchImg");
    searchImg.setAttribute("class", "imgBusqueda");
});