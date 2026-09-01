document.addEventListener("DOMContentLoaded", () => {
  fetch("./games.json")
    .then((response) => {
      if (!response.ok) throw new Error("Could not load games.json");
      return response.json();
    })
    .then((games) => {
      renderGameStore(games);
    })
    .catch((error) => console.error("Error loading games:", error));
});

function renderGameStore(games) {
  const container = document.getElementById("game-grid");
  if (!container) return;

  container.innerHTML = ""; 

  games.forEach((game) => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <div class="card-badge">${game.platform || "Game"}</div>
      <img src="${game.image}" alt="${game.title}" class="game-img" loading="lazy" />
      <div class="game-details">
        <span class="category-tag">${game.category || "General"}</span>
        <h3>${game.title}</h3>
        <p>${game.description || ""}</p>
        <div class="card-action">
          <span class="price">${game.price}</span>
          <a href="${game.downloadUrl}" target="_blank" class="btn-download">Get Game</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
