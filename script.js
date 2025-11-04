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

document.addEventListener('DOMContentLoaded', () => {

  // --- données simulées (à éditer) ---
  const articles = [
    {
      id: 1,
      title: "Forum des assos ce vendredi sur la place centrale",
      tag: "events",
      time: "2025-10-28T18:00:00",
      excerpt: "Rencontre avec les associations étudiantes : stands, jeux et inscriptions. Boissons offertes pour les premiers arrivants.",
      image: "https://images.pexels.com/photos/8344905/pexels-photo-8344905.jpeg"
    },
    {
      id: 2,
      title: "Tournoi intercampus : football samedi",
      tag: "sport",
      time: "2025-10-27T15:30:00",
      excerpt: "Viens supporter l'équipe de la promo 2026. Buvette et DJ à partir de 17h.",
      image: "https://images.pexels.com/photos/5896843/pexels-photo-5896843.jpeg"
    },
    {
      id: 3,
      title: "Colocation disponible proche du campus",
      tag: "housing",
      time: "2025-10-25T09:00:00",
      excerpt: "Chambre en colocation libre 1er décembre. Appartement meublé, 10 min à pied du campus.",
      image: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg"
    },
    {
      id: 4,
      title: "Nouveau système de parrainage : inscris-toi !",
      tag: "parrain",
      time: "2025-10-23T11:00:00",
      excerpt: "Le programme de parrainage est relancé pour aider les nouveaux étudiants à mieux s'intégrer.",
      image: "https://images.pexels.com/photos/7972980/pexels-photo-7972980.jpeg"
    },
    {
      id: 5,
      title: "Visite guidée du campus dimanche",
      tag: "events",
      time: "2025-10-26T10:00:00",
      excerpt: "Découverte des laboratoires, bibliothèque et cafés locaux — ouverte à tous.",
      image: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
    }
  ];  

  // --- utilitaires ---
  function timeAgo(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.round((now - d) / 1000); // sec
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}j`;
  }

  // --- stockage likes/bookmark ---
  const storage = {
    likes: new Set(JSON.parse(localStorage.getItem('likes') || '[]')),
    bookmarks: new Set(JSON.parse(localStorage.getItem('bookmarks') || '[]')),
    save() {
      localStorage.setItem('likes', JSON.stringify([...this.likes]));
      localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks]));
    }
  };

  // --- rendu du feed ---
  const feedEl = document.getElementById('feed');
  const emptyEl = document.getElementById('empty');

  function renderList(list) {
    feedEl.innerHTML = '';
    if (!list.length) {
      emptyEl.classList.remove('hidden');
      return;
    } else {
      emptyEl.classList.add('hidden');
    }

    list.forEach(a => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="media" style="background-image: url('${a.image}')"></div>
        <div class="card-body">
          <div class="meta">
            <div class="tag">${a.tag}</div>
            <div class="time">${timeAgo(a.time)}</div>
          </div>
          <h3>${a.title}</h3>
          <p class="excerpt">${a.excerpt}</p>
          <div class="actions">
            <button class="action-btn like ${storage.likes.has(String(a.id)) ? 'active' : ''}" data-id="${a.id}" title="Aimer">❤</button>
            <button class="action-btn bookmark ${storage.bookmarks.has(String(a.id)) ? 'active' : ''}" data-id="${a.id}" title="Sauvegarder">🔖</button>
            <button class="action-btn readmore" data-id="${a.id}">Voir</button>
          </div>
        </div>
      `;
      feedEl.appendChild(card);
    });
  }

  // initial render (tri par date desc)
  renderList(articles.sort((x,y)=> new Date(y.time) - new Date(x.time)));

  // --- interactions globales (delegation) ---
  feedEl.addEventListener('click', (ev) => {
    const likeBtn = ev.target.closest('.action-btn.like');
    const bmBtn = ev.target.closest('.action-btn.bookmark');
    const readBtn = ev.target.closest('.action-btn.readmore');

    if (likeBtn) {
      const id = likeBtn.getAttribute('data-id');
      if (storage.likes.has(id)) {
        storage.likes.delete(id);
        likeBtn.classList.remove('active');
      } else {
        storage.likes.add(id);
        likeBtn.classList.add('active');
      }
      storage.save();
    }

    if (bmBtn) {
      const id = bmBtn.getAttribute('data-id');
      if (storage.bookmarks.has(id)) {
        storage.bookmarks.delete(id);
        bmBtn.classList.remove('active');
      } else {
        storage.bookmarks.add(id);
        bmBtn.classList.add('active');
      }
      storage.save();
    }

    if (readBtn) {
      const id = Number(readBtn.getAttribute('data-id'));
      const article = articles.find(a => a.id === id);
      if (article) {
        // simple modal-like detail : remplacer par une vraie page plus tard
        alert(`${article.title}\n\n${article.excerpt}\n\nTag: ${article.tag}`);
      }
    }
  });

  // --- filtres & recherche ---
  const filters = document.querySelectorAll('.filter');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(b=>b.classList.remove('active'));
    f.classList.add('active');
    applyFilterAndSearch();
  }));

  document.getElementById('search').addEventListener('input', applyFilterAndSearch);

  function applyFilterAndSearch() {
    const q = document.getElementById('search').value.trim().toLowerCase();
    const activeFilter = document.querySelector('.filter.active').dataset.filter;

    let list = articles.slice();

    if (activeFilter !== 'all') {
      list = list.filter(a => a.tag.toLowerCase() === activeFilter);
    }

    if (q) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q)
      );
    }

    renderList(list);
  }

  // --- enregistrement du service worker (si non déjà fait dans ton script global) ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  }

});

