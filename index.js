document.getElementById("opcionRegistro").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el enlace navegue a otra página
    document.getElementById("formulario").classList.toggle("mostrar");
});



document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    let nombre = document.getElementById("nombree").value.trim(); // Captura el valor del input "nombre"
    let correo = document.getElementById("correoo").value.trim();
    let contraseña = document.getElementById("contraseñaa").value.trim();
    if (nombre === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    if(correo === ""){
       alert("porfabor ingresa tu correo.");
       return;
    }
    else if (!correo.includes("@") || !correo.includes(".")){
        alert("porvafor ingresa un correo valido");
        return;

    }

    if(contraseña === ""){
        alerte("porfavor ingresa una contraseña");
    }

    else if(contraseña.length < 6 ){
        alert("contraseña dever tener almenos 6 caracteres");
        return;
    }
        


    

    alert(` hola ${nombre}.  tu registro fue exitoso ve a ya estoy registrado` );

    console.log("Nombre ingresado:", nombre);
    console.log("Correo ingresado:", correo);
    console.log("Contraseña ingresada:", contraseña);
});

const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const cerrarModal = document.getElementById("cerrarModal");


document.getElementById("abrirModal").addEventListener("click", function() {

    modal.style.display="flex";

});
document.getElementById("cerrarModal").addEventListener("click", function(){

    modal.style.display="none";
})

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});