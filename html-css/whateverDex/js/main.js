let currentPage = 1;
const itemsPerPage = 8;
let currentList = mangas;

const container = document.getElementById('manga-container');
const paginationContainer = document.querySelector('.pagination');
const searchInput = document.getElementById('search-input');
const filterLinks = document.querySelectorAll('.filter-link');

const renderCards = (items) => {
    container.innerHTML = items.map(manga => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card manga-card h-100 border-0 shadow-sm">
                <img src="${manga.img}" class="card-img-top" alt="${manga.titulo}" style="height: 550px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title fw-semibold mb-2">${manga.titulo}</h5>
                    <p class="text-secondary small">${manga.descricao}</p>
                    <div class="row row-cols-2 small mt-3 text-nowrap">
                        <div class="mb-2"><span class="text-muted small">Autor</span><span class="fw-medium d-block">${manga.autor}</span></div>
                        <div class="mb-2"><span class="text-muted small">Capítulos</span><span class="fw-medium d-block">${manga.capitulos}</span></div>
                        <div class="mb-2"><span class="text-muted small">Nota</span><span class="fw-medium d-block">⭐ ${manga.nota}</span></div>
                        <div class="mb-2"><span class="text-muted small">Ano</span><span class="fw-medium d-block">${manga.ano}</span></div>
                    </div>
                    <div class="d-flex flex-wrap gap-2 mt-2">
                        <span class="badge bg-danger-subtle text-danger">${manga.genero}</span>
                        <span class="badge bg-success-subtle text-success">${manga.statusManga}</span>
                        <span class="badge bg-primary-subtle text-primary">${manga.statusLeitura}</span>
                        ${manga.marcador ? `<span class="badge bg-warning-subtle text-dark">${manga.marcador}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// Pagination
const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let html = '';

    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo;</a>
             </li>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                 </li>`;
    }

    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&raquo;</a>
             </li>`;

    paginationContainer.innerHTML = html;
};
const displayMangas = (list = mangas) => {
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = list.slice(start, start + itemsPerPage);
    renderCards(paginated);
    renderPagination(list.length);
    currentList = list;
};
const changePage = (page) => {
    currentPage = page;
    displayMangas(currentList);
};

// Search
searchInput?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    currentPage = 1;
    displayMangas(mangas.filter(m =>
        m.titulo.toLowerCase().includes(term) ||
        m.autor.toLowerCase().includes(term) ||
        m.genero.toLowerCase().includes(term)
    ));
});

// Filters
filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = 1;
        filterLinks.forEach(f => f.classList.remove('active'));
        link.classList.add('active');

        const filter = link.dataset.filter;
        const filtered = filter === "Todos" ? mangas :
            filter === "Favorito" ? mangas.filter(m => m.marcador === "Favorito") :
                mangas.filter(m => m.statusLeitura === filter || m.statusManga === filter);
        displayMangas(filtered);
    });
});

document.addEventListener('DOMContentLoaded', () => displayMangas());