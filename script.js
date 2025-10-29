document.addEventListener('DOMContentLoaded', () => {

  // Menu déroulant
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  // Affichage d'infos (exemple)
  const infoBtn = document.getElementById('btn');
  const infos = document.getElementById('infos');
  if (infoBtn && infos) {
    infoBtn.addEventListener('click', () => {
      infos.innerHTML = `
        <p>📅 Emploi du temps : à venir</p>
        <p>📘 Cours disponibles : Math, Info, Robotique</p>
      `;
    });
  }

  // Enregistrement du service worker (PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker enregistré'))
      .catch(err => console.log('⚠️ Erreur SW', err));
  }

});
