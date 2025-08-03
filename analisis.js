const urlParams = new URLSearchParams(window.location.search);
const cultivoSeleccionado = urlParams.get("cultivo");

const necesidadesPorCultivo = {
  maiz: {
    nitrogeno: 550,
    fosforo: 102000,
    potasio: 145.25,
    calcio: 200,
    plantasPorHa: 62000
  },
  cafe: {
    nitrogeno: 400,
    fosforo: 80000,
    potasio: 240,
    calcio: 150,
    plantasPorHa: 5000
  },
  platano: {
    nitrogeno: 300,
    fosforo: 175000,
    potasio: 600,
    calcio: 150,
    plantasPorHa: 1280
  }
};

const mineralizacionFactores = {
  calido: 1.5,
  templado: 1,
  frio: 0.5,
  palanca: 1,
  pala: 2,
  tractor: 4,
  lluvias: 2,
  verano: 0.5,
  neutro: 1,
  riego: 4
};

const botonCalculo = document.getElementById("calculo");
const campos = document.querySelectorAll('input[name="elemento"]');
const filtros = document.querySelectorAll('button[name="filtro"]');

// Event listener para los botones

filtros.forEach(boton => {
  boton.addEventListener('click', (e) => {
    e.target.classList.add('botonSeleccionado');
  });
});



botonCalculo.addEventListener("click", function (event) {
  event.preventDefault();

  for (let i = 0; i < campos.length; i++) {
    let valor = campos[i].value.trim();
    if (valor === "") {
      alert(`El campo ${campos[i].placeholder} está vacío`);
      return;
    }
    if (isNaN(valor)) {
      alert(`El campo ${campos[i].placeholder} no contiene un número válido`);
      return;
    }
  }

  const necesidades = necesidadesPorCultivo[cultivoSeleccionado];

  // === NITRÓGENO ===
  let MO = parseFloat(document.getElementById("parametro1").value);
  const profundidadMuestra = 20;
  const densidadSuelo = 1.3;
  const superficie = 10000;
  const nitrogenoRequerido = necesidades.nitrogeno;
  const plantasPorHectarea = necesidades.plantasPorHa;

  const pesoSuelo = (profundidadMuestra / 100) * superficie * densidadSuelo * 1000;
  const pesoMateriaOrganica = (MO / 100) * pesoSuelo;
  const nitrogenoTotal = pesoMateriaOrganica * 0.05;
  const nitrogenoMineralizado = nitrogenoTotal * 0.01;
  const nitrogenoFaltante = nitrogenoRequerido - nitrogenoMineralizado;
  const nitrogenoGramos = nitrogenoFaltante * 1000;
  const nitrogenoPorPlanta = nitrogenoGramos / plantasPorHectarea;

  // === FÓSFORO ===
  let fosforo = parseFloat(document.getElementById("parametro3").value);
  let masa_suelo_kg = superficie * (profundidadMuestra / 100) * densidadSuelo * 1000;
  let fosforo_asimilable = fosforo * masa_suelo_kg;
  let fosforo_total = fosforo_asimilable / 1000;
  let fosforo_falta_ha = necesidades.fosforo - fosforo_total;
  let fosforo_planta = fosforo_falta_ha / plantasPorHectarea;

  // === POTASIO ===
  let potasio = parseFloat(document.getElementById("parametro2").value); 

  const profundidadMuestra_potasio = 20;
  const superficie_potasio = 10000;
  const densidadSuelo_potasio = 1.3;
  const peso_suelo_kg = (profundidadMuestra_potasio / 100) * superficie_potasio * densidadSuelo_potasio * 1000;

  const mg_por_cmol_potasio = 391;
  let potasio_mg_kg = potasio * mg_por_cmol_potasio;
  let potasio_total_kg_ha = (potasio_mg_kg * peso_suelo_kg) / 1_000_000;
  let potasio_necesario_kg_ha = necesidades.potasio;
  let potasio_faltante_kg_ha = potasio_necesario_kg_ha - potasio_total_kg_ha;
  if (potasio_faltante_kg_ha < 0) potasio_faltante_kg_ha = 0;

  let potasio_faltante_g = potasio_faltante_kg_ha * 1000;
  let potasio_planta_g = potasio_faltante_g / necesidades.plantasPorHa;

  // === CALCIO ===
  const calcio = parseFloat(document.getElementById("parametro4").value);
  const calcio_mg_por_kg = calcio * 400;
  const calcio_kg_por_ha = (calcio_mg_por_kg / 1000) * pesoSuelo;
  let calcio_faltante = necesidades.calcio - calcio_kg_por_ha;
  if (calcio_faltante < 0) calcio_faltante = 0;
  const calcio_por_planta = (calcio_faltante * 1000) / plantasPorHectarea;

  // === Redireccionar a la página de selección de abonos llevando resultados ===
  const query = new URLSearchParams({
    cultivo: cultivoSeleccionado,
    nitrogeno: nitrogenoPorPlanta.toFixed(2),
    fosforo: fosforo_planta.toFixed(2),
    potasio: potasio_planta_g.toFixed(2),
    calcio: calcio_por_planta.toFixed(2)
  });

  window.location.href = `abonos.html?${query.toString()}`;
});



