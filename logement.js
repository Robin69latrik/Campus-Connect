document.addEventListener('DOMContentLoaded', () => {
  const logements = [
    {id:1,titre:"Studio meublé proche du campus CPE",lieu:"Villeurbanne",prix:"580€/mois",surface:"22 m²",proprio:"Jean Dupont",image:"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",coord:[45.784,4.876]},
    {id:2,titre:"Colocation à Part-Dieu - 3 chambres",lieu:"Lyon 3e",prix:"480€/mois/chambre",surface:"75 m²",proprio:"Marie Lefèvre",image:"https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",coord:[45.760,4.855]},
    {id:3,titre:"T1 lumineux avec balcon",lieu:"Lyon 7e - Jean Macé",prix:"620€/mois",surface:"28 m²",proprio:"Alexandre Morel",image:"https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",coord:[45.745,4.842]},
    {id:4,titre:"Appartement étudiant rénové",lieu:"Lyon 6e - Brotteaux",prix:"700€/mois",surface:"30 m²",proprio:"Camille Bernard",image:"https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg",coord:[45.769,4.858]}
  ];

  const container = document.getElementById('logements-container');

  logements.forEach(l => {
    const card = document.createElement('div');
    card.className = 'card-logement';
    card.innerHTML = `
      <img src="${l.image}" alt="${l.titre}">
      <div class="details">
        <h3>${l.titre}</h3>
        <p>📍 ${l.lieu}</p>
        <p>📏 ${l.surface}</p>
        <p class="price">${l.prix}</p>
        <p>👤 ${l.proprio}</p>
        <div class="actions">
          <button class="fav-btn" data-id="${l.id}">❤️</button>
          <button class="contact-btn">Contacter</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Gestion des favoris
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });

  // Initialisation de la carte Leaflet
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    const map = L.map('map').setView([45.764, 4.8357], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap France',
      minZoom: 11,
      maxZoom: 19
    }).addTo(map);

    logements.forEach(l => {
      const marker = L.marker(l.coord).addTo(map);
      marker.bindPopup(`<b>${l.titre}</b><br>${l.lieu}<br>${l.prix}`);
    });

    // Correction affichage (attend que le conteneur soit visible)
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }
});
