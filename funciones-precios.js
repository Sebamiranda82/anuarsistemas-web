/* ══════════════════════════════
   FUNCIONES Y PRECIOS — Anuar Sistemas (landing page)
   Lee de datos-funciones-precios.json (fuente UNICA compartida con el
   generador del anuncio de Instagram) - un solo lugar para cambiar
   funciones/precios, nunca se desincronizan entre la pagina y la
   publicidad. 20 ago 2026.
   17 oct 2026: planes Demo / Estándar / Full de Ferretería. Campos
   opcionales por plan: "periodo" (por defecto "/mes"; vacío = sin
   periodo) e "incluye" (lista de lo que trae el plan).
══════════════════════════════ */
function escHtml(s){
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

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
        <div class="funcion-titulo">${escHtml(f.titulo)}</div>
        <div class="funcion-detalle">${escHtml(f.detalle)}</div>
      </div>
    `).join('');
  }
  const contP = document.getElementById('lista-planes');
  if(contP){
    contP.innerHTML = datos.planes.map(p => {
      const periodo = (p.periodo === undefined) ? '/mes' : p.periodo;
      const incluye = Array.isArray(p.incluye) && p.incluye.length
        ? `<ul class="plan-incluye">${p.incluye.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>` : '';
      // ESTANDAR_NO_INCLUYE_V1: lo que el plan NO trae (campo opcional "noIncluye")
      // PLANES_ADEMAS_V1: lo que el plan trae ADEMÁS de lo general (campo opcional "incluyeAdemas")
      const ademas = Array.isArray(p.incluyeAdemas) && p.incluyeAdemas.length
        ? `<div class="plan-ademas-t">Incluye además:</div><ul class="plan-incluye plan-ademas">${p.incluyeAdemas.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>` : '';
      const noIncluye = Array.isArray(p.noIncluye) && p.noIncluye.length
        ? `<div class="plan-noincluye-t">No incluye</div><ul class="plan-noincluye">${p.noIncluye.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>` : '';
      return `
      <div class="plan-card">
        <div class="plan-nombre">${escHtml(p.nombre)}</div>
        <div class="plan-precio">${escHtml(p.precio)}${periodo ? `<span class="plan-mes">${escHtml(periodo)}</span>` : ''}</div>
        <div class="plan-detalle">${escHtml(p.detalle)}</div>
        ${p.anual ? `<div class="plan-anual">${escHtml(p.anual)}</div>` : ''}
        ${incluye}
        ${ademas}
        ${noIncluye}
      </div>`;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderFuncionesPrecios);
