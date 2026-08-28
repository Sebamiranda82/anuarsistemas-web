/* ══════════════════════════════
   FUNCIONES Y PRECIOS — Anuar Sistemas (landing page)
   Lee de datos-funciones-precios.json (fuente UNICA compartida con el
   generador del anuncio de Instagram) - un solo lugar para cambiar
   funciones/precios, nunca se desincronizan entre la pagina y la
   publicidad. 20 ago 2026.
══════════════════════════════ */
async function renderFuncionesPrecios(){
  let datos;
  try{
    const r = await fetch('datos-funciones-precios.json');
    datos = await r.json();
  }catch(e){
    console.warn('No se pudo cargar datos-funciones-precios.json', e);
    return;
  }

  const contF = document.getElementById('lista-funciones');
  if(contF){
    contF.innerHTML = datos.funciones.map(f => `
      <div class="funcion-row">
        <div class="funcion-titulo">${f.titulo}</div>
        <div class="funcion-detalle">${f.detalle}</div>
      </div>
    `).join('');
  }
  const contP = document.getElementById('lista-planes');
  if(contP){
    contP.innerHTML = datos.planes.map(p => `
      <div class="plan-card">
        <div class="plan-nombre">${p.nombre}</div>
        <div class="plan-precio">${p.precio}<span class="plan-mes">/mes</span></div>
        <div class="plan-detalle">${p.detalle}</div>
        ${p.anual ? `<div class="plan-anual">${p.anual}</div>` : ''}
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderFuncionesPrecios);
