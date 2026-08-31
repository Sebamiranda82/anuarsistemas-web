/* ══════════════════════════════
   BENEFICIOS DESTACADOS — Anuar Sistemas
   Contenido separado del index.html a proposito, para poder cambiar
   estos datos (dias de prueba, tipo de soporte) sin tocar la
   estructura de la pagina. 20 ago 2026.
══════════════════════════════ */
const BENEFICIOS_DESTACADOS = [];

function renderBeneficiosDestacados(){
  const cont = document.getElementById('beneficios-destacados');
  if(!cont) return;
  cont.innerHTML = BENEFICIOS_DESTACADOS.map(b =>
    `<span class="beneficio-pill">${b.icono} ${b.texto}</span>`
  ).join('');
}

document.addEventListener('DOMContentLoaded', renderBeneficiosDestacados);
