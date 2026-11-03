/* ══════════════════════════════
   FUNCIONES Y PRECIOS — Anuar Sistemas (landing page)
   TABLA_PLANES_V1 (3 nov 2026)
   - Precios/planes: tabla-planes.json (id, importe, nombre, descripcion,
     usuarios). ES LA UNICA TABLA QUE SE EDITA PARA CAMBIAR PRECIOS.
   - Funciones generales y lista de incluye/incluyeAdemas por plan (clave =
     id): datos-funciones-precios.json
══════════════════════════════ */
function escHtml(s){
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
async function cargarJson(url){
  const r = await fetch(url, { cache: 'no-cache' });
  if(!r.ok) throw new Error(url + ' ' + r.status);
  return r.json();
}

async function renderFuncionesPrecios(){
  let datos, tabla;
  try{
    [datos, tabla] = await Promise.all([cargarJson('datos-funciones-precios.json'), cargarJson('tabla-planes.json')]);
  }catch(e){
    console.warn('No se pudo cargar datos de planes', e);
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
    const extras = datos.extrasPlanes || {};
    const lista = (cls, arr) => `<ul class="${cls}">${arr.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>`;
    contP.innerHTML = (tabla.planes || []).map(p => {
      const ex = extras[String(p.id)] || {};
      const imp = Number(p.importe);
      const precio = '$' + (isFinite(imp) ? (Number.isInteger(imp) ? imp : imp.toFixed(2)) : escHtml(p.importe));
      const us = Number(p.usuarios);
      const usuarios = isFinite(us) ? us + (us === 1 ? ' usuario' : ' usuarios') : '';
      const incluye = Array.isArray(ex.incluye) && ex.incluye.length ? lista('plan-incluye', ex.incluye) : '';
      const ademas = Array.isArray(ex.incluyeAdemas) && ex.incluyeAdemas.length
        ? `<div class="plan-ademas-t">Incluye además:</div>${lista('plan-incluye plan-ademas', ex.incluyeAdemas)}` : '';
      const noIncluye = Array.isArray(ex.noIncluye) && ex.noIncluye.length
        ? `<div class="plan-noincluye-t">No incluye</div>${lista('plan-noincluye', ex.noIncluye)}` : '';
      return `
      <div class="plan-card">
        <div class="plan-nombre">${escHtml(p.nombre)}</div>
        <div class="plan-precio">${precio}<span class="plan-mes">${imp === 0 ? '' : '/año'}</span></div>
        <div class="plan-detalle">${escHtml(p.descripcion)}</div>
        ${usuarios ? `<div class="plan-anual">${usuarios}</div>` : ''}
        ${incluye}
        ${ademas}
        ${noIncluye}
      </div>`;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderFuncionesPrecios);
