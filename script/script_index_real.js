// ===================================================== Reference ===========================================
const artikel_utama = document.getElementById('artikel_utama');

// ===================================================fetch===================================================
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
        .then(subjek => subjek.json())
        .then(datas => {
            let dataUtama = datas.filter((e) => e.id_artikel == 1)[0];
            let splitTgl = dataUtama.created_at.split(' ')[0]
            let isiDataUtama = `
            <div class="width-100">
                <a href="./public/detail_artikel.html?slug=${dataUtama.slug}">
                    <img src="${dataUtama.gambar_artikel}" class="img-fluid rounded" alt="">
                </a>
            </div>
            <div class="width-100">
                <p class="text-24px fw-bold">${dataUtama.judul_artikel}</p>
                <p class="text-16px">${splitTgl.replace(',','')}</p>
            </div>
            `;

            artikel_utama.innerHTML = isiDataUtama
        })