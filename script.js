<script>
        document.addEventListener("DOMContentLoaded", () => {
            fetch(`./games.json?v=${new Date().getTime()}`)
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

                const imagePath = game.image.startsWith("./") ? game.image : `./${game.image}`;

                card.innerHTML = `
                    <div class="card-badge">${game.platform || "Game"}</div>
                    <img src="${imagePath}" 
                         alt="${game.title}" 
                         class="game-img" 
                         loading="lazy" 
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/300x180?text=Cover+Image+Not+Found';" />
                    <div class="game-details">
                        <span class="category-tag">${game.category || "General"}</span>
                        <h3>${game.title}</h3>
                        <p>${game.description || ""}</p>
                        <div class="card-action">
                            <span class="price">${game.price}</span>
                            <a href="${game.downloadUrl}" target="_blank" class="btn-download">Buy Now</a>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        }
    </script>
