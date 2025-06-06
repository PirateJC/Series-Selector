function getSeriesList() {
    const stored = localStorage.getItem('seriesList');
    return stored ? JSON.parse(stored) : [];
}

function setSeriesList(list) {
    localStorage.setItem('seriesList', JSON.stringify(list));
}

function populateGenreDropdown(selected = "") {
    const seriesList = getSeriesList();
    const genres = [...new Set(seriesList.map(s => s.genre))].sort();
    const genreSelect = document.getElementById('genre');
    genreSelect.innerHTML = `<option value="">Select genre</option>`;
    genres.forEach(genre => {
        const opt = document.createElement('option');
        opt.value = genre;
        opt.textContent = genre;
        if (genre === selected) opt.selected = true;
        genreSelect.appendChild(opt);
    });
    // Add option for new genre
    const newOpt = document.createElement('option');
    newOpt.value = "__new__";
    newOpt.textContent = "Add new genre...";
    genreSelect.appendChild(newOpt);
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
                ${s.favorite ? "❤️" : ""}
                ${s.new ? "🆕" : ""}
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
    populateGenreDropdown();
    document.getElementById('favorite').checked = false;
    document.getElementById('new').checked = false;
    document.getElementById('genre-new')?.remove();
}

window.editSeries = function(index) {
    const s = getSeriesList()[index];
    document.getElementById('edit-index').value = index;
    document.getElementById('title').value = s.title;
    populateGenreDropdown(s.genre);
    document.getElementById('favorite').checked = s.favorite;
    document.getElementById('new').checked = s.new;
    document.getElementById('genre-new')?.remove();
};

window.deleteSeries = function(index) {
    if (!confirm("Delete this series?")) return;
    const list = getSeriesList();
    list.splice(index, 1);
    setSeriesList(list);
    renderSeriesList();
    clearForm();
};

// Handle genre dropdown for adding new genre
document.getElementById('genre').addEventListener('change', function() {
    if (this.value === "__new__") {
        // Add a new input for genre
        if (!document.getElementById('genre-new')) {
            const input = document.createElement('input');
            input.type = "text";
            input.id = "genre-new";
            input.name = "genre-new";
            input.placeholder = "Enter new genre";
            input.required = true;
            this.parentNode.appendChild(input);
        }
    } else {
        document.getElementById('genre-new')?.remove();
    }
});

document.getElementById('series-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const index = document.getElementById('edit-index').value;
    const title = document.getElementById('title').value.trim();
    let genre = document.getElementById('genre').value;
    const genreNewInput = document.getElementById('genre-new');
    if (genre === "__new__" && genreNewInput) {
        genre = genreNewInput.value.trim();
    }
    const favorite = document.getElementById('favorite').checked;
    const newVar = document.getElementById('new').checked;

    if (!title || !genre) return;

    const list = getSeriesList();
    const newSeries = { title, genre, favorite, new: newVar };

    if (index === "") {
        list.push(newSeries);
    } else {
        list[index] = newSeries;
    }
    setSeriesList(list);
    renderSeriesList();
    clearForm();
});

document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = "index.html";
});

// Initial render
populateGenreDropdown();
renderSeriesList();