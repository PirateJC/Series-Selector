function getSeriesList() {
    const stored = localStorage.getItem('seriesList');
    return stored ? JSON.parse(stored) : [];
}

function setSeriesList(list) {
    localStorage.setItem('seriesList', JSON.stringify(list));
}

function renderSeriesList() {
    const seriesList = getSeriesList();
    const container = document.getElementById('series-list');
    if (seriesList.length === 0) {
        container.innerHTML = "<p>No series added yet.</p>";
        return;
    }
    container.innerHTML = seriesList.map((s, i) => `
        <div class="form-group" style="display:flex;align-items:center;justify-content:space-between;">
            <span>
                <strong>${s.title}</strong> (${s.genre})
                ${s.favorite ? "★" : ""}
                ${s.seen ? "✓" : ""}
            </span>
            <span>
                <button type="button" onclick="editSeries(${i})">Edit</button>
                <button type="button" onclick="deleteSeries(${i})">Delete</button>
            </span>
        </div>
    `).join('');
}

function clearForm() {
    document.getElementById('edit-index').value = "";
    document.getElementById('title').value = "";
    document.getElementById('genre').value = "";
    document.getElementById('favorite').checked = false;
    document.getElementById('seen').checked = false;
}

function editSeries(index) {
    const s = getSeriesList()[index];
    document.getElementById('edit-index').value = index;
    document.getElementById('title').value = s.title;
    document.getElementById('genre').value = s.genre;
    document.getElementById('favorite').checked = s.favorite;
    document.getElementById('seen').checked = s.seen;
}

function deleteSeries(index) {
    if (!confirm("Delete this series?")) return;
    const list = getSeriesList();
    list.splice(index, 1);
    setSeriesList(list);
    renderSeriesList();
    clearForm();
}

document.getElementById('series-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const index = document.getElementById('edit-index').value;
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const favorite = document.getElementById('favorite').checked;
    const seen = document.getElementById('seen').checked;

    if (!title || !genre) return;

    const list = getSeriesList();
    const newSeries = { title, genre, favorite, seen };

    if (index === "") {
        list.push(newSeries);
    } else {
        list[index] = newSeries;
    }
    setSeriesList(list);
    renderSeriesList();
    clearForm();
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    clearForm();
});

document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = "index.html";
});

// Initial render
renderSeriesList();