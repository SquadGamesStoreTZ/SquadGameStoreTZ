let loadedGamesData = [];

document.addEventListener("DOMContentLoaded", () => {
    // Automatically uses gamesData if present, or falls back to games
    const dataToLoad = typeof gamesData !== "undefined" ? gamesData : (typeof games !== "undefined" ? games : null);

    if (dataToLoad) {
        renderGameStore(dataToLoad);
    } else {
        console.error("Game data is not defined. Ensure games-data.js is loaded properly.");
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

        // Dynamic check for free price (handles "FREE", "Free", 0, etc.)
        const priceStr = String(game.price || "").trim().toUpperCase();
        const isFree = priceStr === "FREE" || priceStr === "0" || priceStr.includes("FREE");

        const actionBtnText = isFree ? "Get" : "Buy Now";
        const actionBtnClass = isFree ? "btn-get" : "btn-download";

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
                        <a href="${game.downloadUrl}" target="_blank" class="btn-action ${actionBtnClass}">${actionBtnText}</a>
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

    // Dynamic check for free price in modal
    const priceStr = String(game.price || "").trim().toUpperCase();
    const isFree = priceStr === "FREE" || priceStr === "0" || priceStr.includes("FREE");

    const modalBtnText = isFree ? "Get" : "Buy Now";
    const modalBtnClass = isFree ? "btn-get" : "btn-download";

    document.getElementById("modal-title").innerText = game.title;
    document.getElementById("modal-desc").innerText = game.description || "";
    document.getElementById("modal-req").innerText = game.requirements || "Standard System Requirements";
    document.getElementById("modal-price").innerText = game.price;
    
    const buyBtn = document.getElementById("modal-buy");
    buyBtn.href = game.downloadUrl;
    buyBtn.innerText = modalBtnText;
    buyBtn.className = `btn-action ${modalBtnClass}`;

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
