// 👉 1. Tabla de aportes por abono en gramos por cada 1000g
const aportesAbonos = {
    bocashi: {
      nitrogeno: 18,
      fosforo: 20,
      potasio: 25,
      calcio: 20
    },
    gallinaza: {
      nitrogeno: 40,
      fosforo: 30,
      potasio: 25,
      calcio: 60
    },
    vermicompost: {
      nitrogeno: 15,
      fosforo: 10,
      potasio: 15,
      calcio: 15
    },
    compost: {
      nitrogeno: 10,
      fosforo: 8,
      potasio: 12,
      calcio: 22
    },
    ceniza: {
      nitrogeno: 3,
      fosforo: 5,
      potasio: 250,
      calcio: 350
    }
  };
  
  // 👉 2. Extrae los valores de nutrientes y cultivo desde la URL (enviados desde otra página)
  const urlParams = new URLSearchParams(window.location.search);
  const cultivoSeleccionado = urlParams.get("cultivo");
  const nitrogeno = parseFloat(urlParams.get("nitrogeno"));
  const fosforo = parseFloat(urlParams.get("fosforo"));
  const potasio = parseFloat(urlParams.get("potasio"));
  const calcio = parseFloat(urlParams.get("calcio")); // Aunque no usamos calcio aún, lo dejamos por si lo necesitas
  
  // 👉 3. Selecciona todos los botones que tengan name="abono"
  const abonos = document.querySelectorAll('button[name="abono"]');
  
  // 👉 4. Por cada botón, asigna una acción al hacer clic
  abonos.forEach((boton, i) => {
    boton.addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el botón recargue la página
  
      // Lista de nombres de abonos en el mismo orden que los botones
      const nombresAbonos = ["bocashi", "gallinaza", "vermicompost", "compost", "ceniza"];
      const nombreAbono = nombresAbonos[i]; // Nombre según botón
      const aporte = aportesAbonos[nombreAbono]; // Obtiene aportes desde la tabla
  
      if (!aporte) {
        alert("No se encontraron datos del abono.");
        return;
      }
  
      // 👉 Calcula la cantidad de abono necesaria para cada nutriente
      const cantidadN = aporte.nitrogeno > 0 ? nitrogeno * 1000 / aporte.nitrogeno : 0;
      const cantidadP = aporte.fosforo > 0 ? fosforo * 1000 / aporte.fosforo : 0;
      const cantidadK = aporte.potasio > 0 ? potasio * 1000 / aporte.potasio : 0;
  
      // 👉 Toma el nutriente que requiera mayor cantidad (el más crítico)
      const cantidadFinal = Math.max(cantidadN, cantidadP, cantidadK);
  
      // 👉 Muestra el mensaje de recomendación al usuario
      alert(`
  🔎 Cultivo seleccionado: ${cultivoSeleccionado.toUpperCase()}
  🌿 Abono: ${nombreAbono.toUpperCase()}
  
  📌 Necesidades por planta:
  - Nitrógeno: ${nitrogeno.toFixed(2)} g
  - Fósforo: ${fosforo.toFixed(2)} g
  - Potasio: ${potasio.toFixed(2)} g
  
  ✅ Recomendación:
  Usa aproximadamente ${cantidadFinal} gramos por planta de ${nombreAbono}
  para cubrir las necesidades nutricionales del cultivo.
  
  (Nutriente más limitante calculado automáticamente)
      `);
    });
  });
  