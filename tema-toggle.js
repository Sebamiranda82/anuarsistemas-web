/* ══════════════════════════════
   INTERRUPTOR CLARO/OSCURO — Anuar Sistemas (landing page)
   Mismo mecanismo que CFB: atributo data-theme en <html> + localStorage.
   Se carga TEMPRANO (en el <head>) para aplicar el tema antes de que
   se pinte la pagina, evita parpadeo del tema equivocado.
   Por defecto: CLARO (fondo blanco) para visitantes nuevos - a pedido
   del usuario. Se puede volver a oscuro con el interruptor.
   20 ago 2026.
══════════════════════════════ */
(function(){
  const guardado = localStorage.getItem('anuar_web_tema_v1');
  const tema = guardado || 'light'; // por defecto CLARO
  if(tema === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

function toggleTemaAnuar(){
  const actual = document.documentElement.getAttribute('data-theme');
  const nuevo = actual === 'light' ? 'dark' : 'light';
  if(nuevo === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('anuar_web_tema_v1', nuevo);
  actualizarBotonTemaAnuar();
}

function actualizarBotonTemaAnuar(){
  const btn = document.getElementById('btnTemaAnuar');
  if(!btn) return;
  const esClaro = document.documentElement.getAttribute('data-theme') === 'light';
  btn.textContent = esClaro ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', actualizarBotonTemaAnuar);
