/* Modo oscuro */

let modoOscuro = document.getElementById("modoOscuroOpt");

modoOscuro.addEventListener("click", () => {
    let header = document.getElementsByTagName("header");
    let menu = document.getElementById("burgerMenu");
    let main = document.getElementById("main");
    let fav = document.getElementById("favorites");
    let misG = document.getElementById("myGifos");
    let crear = document.getElementById("ownGif");
    let trend = document.getElementById("trend");
    let footer = document.getElementsByTagName("footer");
    let modal = document.getElementById("modal");
    let body = document.getElementsByTagName("body");
    
    body[0].classList.toggle("darkModeBody");
    header[0].classList.toggle("darkModeHeader");
    main.classList.toggle("darkMain");
    favorites.classList.toggle("darkMain");
    misG.classList.toggle("darkMain");
    crear.classList.toggle("darkOwn");
    trend.classList.toggle("darkTrending");
    footer[0].classList.toggle("darkFooter");
    modal.classList.toggle("darkModeModal");

    if (screen.width <= 375){
        menu.classList.toggle("darkMenu");
    }
    else {
        menu.classList.toggle("withDarkMode");
    }

    if(header[0].classList.contains("darkModeHeader") ? actualizarRecursos("cambiar") : actualizarRecursos("original") );

}); 


function actualizarRecursos(accion){
    let logo = document.getElementById("logo");
    let divOpt = document.getElementById("moreOpt");
    let imgMas = document.getElementById("imgMore");
    let fb = document.getElementById("fb");
    let tw = document.getElementById("tw");
    let inst = document.getElementById("inst");
    let buscar = document.getElementById("btnPanelBusqueda");
    let cerrar = document.getElementById("cerrarBusqueda");
    let bIzq = document.getElementById("tredingLeft");
    let bDer = document.getElementById("tredingRight");
    let divIzq = document.getElementById("controlLeft");
    let divDer = document.getElementById("controlRight");
    let btnCloseModal = document.getElementById("btnCloseModal");
    let left = document.getElementById("left");
    let btnLeft = document.getElementById ("btnLeft");
    let right = document.getElementById("right");
    let btnRight = document.getElementById("btnRight");
    let camara = document.getElementById("camara");
    let movie = document.getElementById("movie");
    let close = document.getElementById("closeMenu");
    let burger = document.getElementById("menuIcon");
    
    switch (accion) {
        case "cambiar":
            logo.src = "./images/logos/logo-desktop-modo-noc.svg";
            moreOpt.style.border = "1px solid #FFF";
            imgMas.src = "./images/buttons/button-crear-gifo-hover.svg"
            fb.src = "./images/socialNetworks/fb_modNoc.svg";
            tw.src = "./images/socialNetworks/tw_modNoc.svg";
            inst.src = "./images/socialNetworks/insta_modNoc.svg";
            buscar.src = "./images/icons/icon-search-mod-noc.svg";
            cerrar.src = "./images/icons/close-modNoc.svg";
            divIzq.style.border = "1px solid #FFF";
            divDer.style.border = "1px solid #FFF";
            bIzq.src = "./images/buttons/button-left-hover.svg";
            bDer.src = "./images/buttons/button-right-hover.svg";
            btnCloseModal.src = "./images/icons/close-modNoc.svg";
            left.style.border = "1px solid #FFF";
            right.style.border = "1px solid #FFF";
            btnLeft.src = "./images/buttons/button-left-hover.svg";
            btnRight.src = "./images/buttons/button-right-hover.svg";
            camara.src = "images/others/camara-modo-noc.svg";
            movie.src = "images/others/pelicula-modo-noc.svg";
            close.src = "./images/icons/close-modNoc.svg";
            burger.src = "./images/icons/burger-noc.svg";
            break;
        case "original":
            logo.src = "./images/logos/logo-desktop.svg";
            moreOpt.style.border = "1px solid #572EE5";
            imgMas.src = "./images/buttons/button-crear-gifo.svg";
            fb.src = "./images/socialNetworks/icon_facebook.svg";
            tw.src = "./images/socialNetworks/icon-twitter.svg";
            inst.src = "./images/socialNetworks/icon_instagram.svg";
            buscar.src = "./images/icons/icon-search.svg";
            cerrar.src = "./images/icons/close.svg";
            divIzq.style.border = "1px solid #572EE5";
            divDer.style.border = "1px solid #572EE5";
            bIzq.src = "./images/buttons/button-left.svg";
            bDer.src = "./images/buttons/button-right.svg";
            btnCloseModal.src = "./images/icons/close.svg";
            left.style.border = "1px solid #572EE5";
            right.style.border = "1px solid #572EE5";
            btnLeft.src = "./images/buttons/button-left.svg";
            btnRight.src = "./images/buttons/button-right.svg";
            camara.src = "images/others/camara.svg";
            movie.src = "images/others/pelicula.svg";
            close.src = "./images/icons/close.svg";
            burger.src = "./images/icons/burger.svg";
            break;
        default:
            break;
    }
        
}