// ============================================Reference================================================
const data_kategori = document.getElementById('data_kategori');

// =========================================================function=======================================

// =====================================================fetch==============================================
fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
    .then(subjek => subjek.json())
    .then(datas => {
        document.getElementById('keyword_kategori').innerText=getSlug('kategori').toUpperCase();
        let ambilKategoriArtikel = [];
        let teks = '';
        if(getSlug('kategori') == "terpopuler"){
            let populer = datas.sort((a,b) => {
                return b.komentar.length - a.komentar.length
            })
            ambilKategoriArtikel = populer;
        }
        else if(getSlug('kategori') == "teratas"){
            let teratas = datas.sort((a,b) => {
                return b.like_artikel.length - a.like_artikel.length
            })
            ambilKategoriArtikel = teratas;
        }
        else{
            datas.map((e) => {
                if(e.kategori_artikel == getSlug('')){
                    ambilKategoriArtikel.push(e)
                }
            })
        }

        ambilKategoriArtikel.map((e) => {
            teks += 
                `
                    <div class="row mt-3">
                    <div class="col"></div>
                    <div class="col-9 konten-hal-cari shadow-sm p-3">
                    <div>
                        <img src="${e.gambar_artikel}" class="img-kategori" alt="">
                    </div>
                    <div class="d-flex flex-column">
                        <a href="./detail_artikel.html?slug=${e.slug}">
                        <p class="text-16px fw-bold">${e.judul_artikel}</p>
                        </a>
                        <p>
                        ${e.isi.slice(0,100)}
                        </p>
                        <p class="text-12px"><i>${e.created_at}</i></p>
                    </div>
                    </div>
                    <div class="col"></div>
                    </div>
                `
            })

            data_kategori.innerHTML = teks;
    })