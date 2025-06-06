// Example starter data
const defaultSeries = [
    { title: "Stranger Things", genre: "Sci-Fi", favorite: true, seen: true },
    { title: "The Office", genre: "Comedy", favorite: false, seen: true },
    { title: "Breaking Bad", genre: "Drama", favorite: true, seen: false },
    { title: "The Mandalorian", genre: "Sci-Fi", favorite: false, seen: false },
    { title: "Brooklyn Nine-Nine", genre: "Comedy", favorite: true, seen: true }
];

// Load or initialize series list
function getSeriesList() {
    const stored = localStorage.getItem('seriesList');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('seriesList', JSON.stringify(defaultSeries));
    return defaultSeries;
}

function setSeriesList(list) {
    localStorage.setItem('seriesList', JSON.stringify(list));
}

// Populate genre dropdown
function populateGenres() {
    const seriesList = getSeriesList();
    const genres = [...new Set(seriesList.map(s => s.genre))];
    const genreSelect = document.getElementById('genre');
    genres.forEach(genre => {
        const opt = document.createElement('option');
        opt.value = genre;
        opt.textContent = genre;
        genreSelect.appendChild(opt);
    });
}

// Pick a random series based on filters
function pickSeries() {
    const genre = document.getElementById('genre').value;
    const favorite = document.getElementById('favorite').checked;
    const seen = document.getElementById('seen').checked;

    let seriesList = getSeriesList();

    if (genre) seriesList = seriesList.filter(s => s.genre === genre);
    if (favorite) seriesList = seriesList.filter(s => s.favorite);
    if (seen) seriesList = seriesList.filter(s => s.seen);

    const resultDiv = document.getElementById('result');
    if (seriesList.length === 0) {
        resultDiv.textContent = "No series found matching your criteria.";
        return;
    }
    const picked = seriesList[Math.floor(Math.random() * seriesList.length)];
    resultDiv.textContent = `🎬 ${picked.title} (${picked.genre})${picked.favorite ? " ★" : ""}${picked.seen ? " ✓" : ""}`;
}

// Navigation to Edit page (to be created)
function goToEditPage() {
    window.location.href = "add-edit.html";
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateGenres();
    document.getElementById('pick-series').addEventListener('click', pickSeries);
    document.getElementById('edit-page-btn').addEventListener('click', goToEditPage);
});