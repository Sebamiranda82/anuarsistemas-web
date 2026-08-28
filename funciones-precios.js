/* ══════════════════════════════
   FUNCIONES Y PRECIOS — Anuar Sistemas (landing page)
   Misma informacion que el anuncio de Instagram, para que la gente no
   tenga que hacer zoom en una foto - contenido separado del HTML,
   mismo criterio que beneficios.js. 20 ago 2026.
══════════════════════════════ */
const FUNCIONES_DESTACADAS = [
  { titulo: "Facturación SRI completa", detalle: "Factura, Nota de Crédito, Nota de Débito, Guía de Remisión y Retenciones" },
  { titulo: "Presupuestos", detalle: "Cotizaciones que se convierten en factura" },
  { titulo: "Productos con fotos y stock", detalle: "Inventario, categorías y control de stock automático" },
  { titulo: "Compras a proveedores", detalle: "Ingreso manual o automático leyendo el PDF de la factura" },
  { titulo: "Vendedores con comisión", detalle: "Reportes de ventas por vendedor" },
  { titulo: "Reportes completos", detalle: "Ventas por cliente, producto y proveedores" },
  { titulo: "Funciona sin internet", detalle: "Consultá todo aunque se corte la conexión" }
];

const PLANES = [
  { nombre: "GRATUITO", precio: "$0", detalle: "30 facturas/mes", anual: "" },
  { nombre: "BÁSICO", precio: "$5", detalle: "hasta 150 facturas/mes", anual: "$50 / año" },
  { nombre: "ILIMITADO", precio: "$10", detalle: "facturación ilimitada", anual: "$99 / año" }
];

function renderFuncionesPrecios(){
  const contF = document.getElementById('lista-funciones');
  if(contF){
    contF.innerHTML = FUNCIONES_DESTACADAS.map(f => `
      <div class="funcion-row">
        <div class="funcion-titulo">${f.titulo}</div>
        <div class="funcion-detalle">${f.detalle}</div>
      </div>
    `).join('');
  }
  const contP = document.getElementById('lista-planes');
  if(contP){
    contP.innerHTML = PLANES.map(p => `
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
