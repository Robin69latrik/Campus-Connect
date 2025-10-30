document.addEventListener('DOMContentLoaded', () => {
  const sports = [
    {id:1,name:"Football",image:"https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",page:"football.html"},
    {id:2,name:"Basketball",image:"https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1780",page:"basketball.html"},
    {id:3,name:"Tennis",image:"https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"},
    {id:4,name:"Natation",image:"https://plus.unsplash.com/premium_photo-1664475361436-e37f6f2ba407?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"},
    {id:5,name:"Volley-ball",image:"https://images.unsplash.com/photo-1562552052-c72ceddf93dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"},
    {id:6,name:"Handball",image:"https://images.unsplash.com/photo-1513028738826-f000cded30a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1744"},
    {id:7,name:"Badminton",image:"https://plus.unsplash.com/premium_photo-1663036882455-adbf89485e51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"},
    {id:8,name:"Escalade",image:"https://images.unsplash.com/photo-1549057736-889b732754a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1488"},
    {id:9,name:"Course à pied",image:"https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670"},
    {id:10,name:"Yoga",image:"https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"}
  ];

  const listEl = document.getElementById('sports-list');
  const storage = {
    likes: new Set(JSON.parse(localStorage.getItem('sportsLikes') || '[]')),
    save() {
      localStorage.setItem('sportsLikes', JSON.stringify([...this.likes]));
    }
  };

  sports.forEach(s => {
    const li = document.createElement('li');
    li.className = 'sport-item';
    li.innerHTML = `
      <a href="${s.page || '#'}">
        <img src="${s.image}" alt="${s.name}" style="width:40px;height:40px;border-radius:4px;margin-right:10px;">
        ${s.name}
      </a>
      <button class="fav-btn ${storage.likes.has(String(s.id)) ? 'active' : ''}" data-id="${s.id}">❤</button>
    `;
    listEl.appendChild(li);
  });

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.fav-btn');
    if(btn){
      const id = btn.getAttribute('data-id');
      if(storage.likes.has(id)){
        storage.likes.delete(id);
        btn.classList.remove('active');
      } else {
        storage.likes.add(id);
        btn.classList.add('active');
      }
      storage.save();
    }
  });
});
