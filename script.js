let loadedGamesData = [];

document.addEventListener("DOMContentLoaded", () => {
    if (typeof gamesData !== "undefined") {
        renderGameStore(gamesData);
    } else {
        console.error("gamesData is not defined. Ensure games-data.js is loaded first.");
    }
});

function renderGameStore(games) {
    loadedGamesData = games;
    const container = document.getElementById("game-grid");
    if (!container) return;

    container.innerHTML = "";

    games.forEach((game, index) => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        card.innerHTML = `
            <div class="card-badge">${game.platform || "Game"}</div>
            <img src="${game.image}" 
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
                    <div class="action-group">
                        <button class="btn-details" onclick="openDetails(${index})">Details</button>
                        <a href="${game.downloadUrl}" target="_blank" class="btn-download">Buy Now</a>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function openDetails(index) {
    const game = loadedGamesData[index];
    if (!game) return;

    document.getElementById("modal-title").innerText = game.title;
    document.getElementById("modal-desc").innerText = game.description || "";
    document.getElementById("modal-req").innerText = game.requirements || "Standard System Requirements";
    document.getElementById("modal-price").innerText = game.price;
    document.getElementById("modal-buy").href = game.downloadUrl;

    const gallery = document.getElementById("modal-gallery");
    gallery.innerHTML = "";

    if (game.screenshots && game.screenshots.length > 0) {
        game.screenshots.forEach((imgSrc) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Screenshot";
            img.onerror = function () {
                this.src = "https://via.placeholder.com/300x180?text=Image+Not+Found";
            };
            img.onclick = function () {
                openFullScreen(imgSrc);
            };
            gallery.appendChild(img);
        });
    } else {
        const img = document.createElement("img");
        img.src = game.image;
        img.onclick = function () {
            openFullScreen(game.image);
        };
        gallery.appendChild(img);
    }

    document.getElementById("details-modal").classList.add("active");
}

function closeModal(event) {
    if (event.target.classList.contains("modal-overlay")) {
        closeModalDirect();
    }
}

function closeModalDirect() {
    document.getElementById("details-modal").classList.remove("active");
}

function openFullScreen(imgSrc) {
    const fullImg = document.getElementById("fullscreen-img");
    fullImg.src = imgSrc;
    document.getElementById("fullscreen-modal").classList.add("active");
}

function closeFullScreen() {
    document.getElementById("fullscreen-modal").classList.remove("active");
}
