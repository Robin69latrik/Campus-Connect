document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".conversation-card");

  cards.forEach(card => {
    card.addEventListener("mousedown", () => {
      card.classList.add("clicked");
    });

    card.addEventListener("mouseup", () => {
      card.classList.remove("clicked");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("clicked");
    });
  });
});
