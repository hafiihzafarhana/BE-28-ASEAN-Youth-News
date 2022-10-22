// ============================================Reference================================================
const data_cari = document.getElementById('data_cari');

// ambil slug
function getSlug(){
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const getSlug = urlParams.get('key')
    return getSlug;
}

// =====================================================fetch==============================================
fetch(encodeURI(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel?judul_artikel=${getSlug()}`))
    .then(subjek => subjek.json())
    .then(datas => {
        document.getElementById('keyword_kategori').innerText=getSlug().toUpperCase();
        let teks = '';
        if(getSlug() != ""){
        datas.map((e) => {
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
        } else{
            teks+="<h3 class='text-center mt-5'>Articles not found</h3>"
        }
        data_cari.innerHTML = teks;
    })