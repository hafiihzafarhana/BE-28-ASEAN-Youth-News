// ===================================================== Reference ===========================================
const artikel_utama = document.getElementById('artikel_utama');
const data_terpopuler_display = document.getElementById('data_terpopuler_display');
const data_teratas_display = document.getElementById('data_teratas_display');
const data_terkini_display = document.getElementById('data_terkini_display');

// ===================================================fetch===================================================
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/1')
        .then(subjek => subjek.json())
        .then(data => {
            let splitTgl = data.created_at.split(' ')[0]
            let isiDataUtama = `
            <div class="width-100">
                <a href="./public/detail_artikel.html?slug=${data.slug}">
                    <img src="${data.gambar_artikel}" class="img-fluid rounded" alt="">
                </a>
            </div>
            <div class="width-100">
                <p class="text-24px fw-bold">${data.judul_artikel}</p>
                <p class="text-16px">${splitTgl.replace(',','')}</p>
            </div>
            `;

            artikel_utama.innerHTML = isiDataUtama
    })

    tampilArtikel("index")