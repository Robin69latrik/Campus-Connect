document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const popup = document.getElementById("popup");

  if (form && popup) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      popup.classList.remove("hidden");

      // Redirection après 2 secondes
      setTimeout(() => {
        popup.classList.add("hidden");
        window.location.href = "home.html";
      }, 2000);
    });
  }
});
