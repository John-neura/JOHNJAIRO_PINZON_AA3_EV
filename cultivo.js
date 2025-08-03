// Diccionario con info y cálculos de cada cultivo
const cultivosInfo = {
    maiz: {
        nombre: "Maíz",
        fondo: "url('maiz.jpg')",
        calcular: function () {
            return `
                <div>
                    <p>Elegiste el cultivo <strong>${this.nombre}</strong>. Pasemos al análisis.</p>
                    <button onclick="window.location.href='analisis.html?cultivo=maiz'" class="boton-analisis">

                        comenzar análisis
                    </button>
                </div>
            `;
        }
    },
    cafe: {
        nombre: "Café",
        fondo: "url('cafe.jpg')",
        calcular: function () {
            return `
                <div>
                    <p>¡Elegiste el cultivo <strong>${this.nombre}</strong>! ¡Pasemos al análisis!</p>
                    <button onclick="window.location.href='analisis.html?cultivo=cafe'" class="boton-analisis">

                        Comenzar análisis
                    </button>
                </div>
            `;
        }
    },
    platano: {
        nombre: "Platano",
        fondo: "url('platano.jpg')",
        calcular: function () {
            return `
                <div>
                    <p>¡Elegiste el cultivo <strong>${this.nombre}</strong>! ¡Pasemos al análisis!</p>
                    <button onclick="window.location.href='analisis.html?cultivo=platano'" class="boton-analisis">

                        Comenzar análisis
                    </button>
                </div>
            `;
        }
    },
  
};

// Evento del botón para capturar input y mostrar info
document.getElementById("boton__cultivo").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    let input = document.getElementById("producto").value.trim().toLowerCase();
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let resultado = document.getElementById("resultado");

    if (input === "") {
        alert("Por favor, ingresa un cultivo.");
        return;
    }

    const cultivo = cultivosInfo[input]; // Busca el cultivo en el diccionario
    if (input === "") {
        alert("Por favor, ingresa un cultivo.");
        return;
    }
    if (cultivo) {
        resultado.innerHTML = `<h2>${cultivo.nombre}</h2>${cultivo.calcular()}`;
        resultado.style.backgroundImage = cultivo.fondo;
        resultado.style.backgroundSize = "cover";
        resultado.style.backgroundPosition = "center";
        resultado.style.color = "#fff";
    } else {
        resultado.innerHTML = `<p style="color: red;">El cultivo "${input}" no está registrado.</p>`;
        resultado.style.backgroundImage = "none";
        resultado.style.color = "#000";
    }
});
