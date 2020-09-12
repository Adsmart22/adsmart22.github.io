
function cambiarMenu(){
    let nocturno = document.getElementById("nightModeOption");
    let favoritos = document.getElementById("favoritesOption");
    let myGif = document.getElementById("myGifOption");
    let imagenLogo = document.getElementById("logo");
    let contMasOpciones = document.createElement("div");
    let masOpciones = document.createElement("img");
    let container = document.getElementById("logoStart");
    console.log(container);

    if (screen.width > 375) {
        //Modificar texto
        nocturno.innerHTML = "MODO NOCTURNO";
        favoritos.innerHTML = "FAVORITOS";
        myGif.innerHTML = "MIS GIFOS";

        //Anexar nuevo botón
        imagenLogo.src = "./images/logos/logo-desktop.svg";
        imagenLogo.setAttribute("class", "logoDesktop" );

        masOpcionesDiv = document.getElementById("moreOpt");
        masOpcionesImg = document.getElementById("imgMore");

        masOpcionesDiv.addEventListener('mouseover', () => {
            masOpcionesDiv.style.backgroundColor = "#572EE5";
            masOpcionesImg.src = "./images/buttons/button-crear-gifo-hover.svg";
        });
        masOpcionesDiv.addEventListener('mouseout', () => {
            masOpcionesDiv.style.backgroundColor = "#FFF";
            masOpcionesImg.src = "./images/buttons/button-crear-gifo.svg"
        })
    }
    else {
        nocturno.innerHTML = "Modo nocturno";
        favoritos.innerHTML = "Favoritos";
        myGif.innerHTML = "Mis Gifos";
        imagenLogo.src = "./images/logos/logo-mobile.svg";
        imagenLogo.setAttribute("class", "mainLogo" );
    }
}

cambiarMenu(); 

let iconFB = document.getElementById("fb");
let fbLink = document.getElementById("fbLink");

fbLink.addEventListener( "mouseover" , () => {
    fbLink.style.backgroundColor = "#FFF";
    iconFB.src = "./images/socialNetworks/icon_facebook_hover.svg";
}); 

fbLink.addEventListener( "mouseoot" , () => {
    fbLink.style.backgroundColor = "#FFF";
    iconFB.src = "./images/socialNetworks/icon_facebook.svg";
}); 
