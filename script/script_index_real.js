// ===================================================== Reference ===========================================
const artikel_utama = document.getElementById('artikel_utama');
const data_terpopuler_display = document.getElementById('data_terpopuler_display');
const data_teratas_display = document.getElementById('data_teratas_display');
const data_terkini_display = document.getElementById('data_terkini_display');

// ===================================================fetch===================================================
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/1')
        .then(subjek => subjek.json())
        .then(data => {
            // let dataUtama = datas.filter((e) => e.id_artikel == 1)[0];
            // if(dataUtama != undefined){
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

    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
        .then(subjek => subjek.json())
        .then(data => {
        const filterTanpa1 = data.filter((e) => e.id_artikel != 1)
        const terpopuler = filterTanpa1.sort((a,b) => {
            return b.komentar.length - a.komentar.length
        })

        // data populer
        const arrayPopuler = terpopuler.slice(0,3)
        teks1 = "";
        arrayPopuler.map((e) =>{
        teks1 += `
        <div class="col-md-4">
            <a href="./public/detail_artikel.html?slug=${e.slug}">
                <div class="card" style="width: 100%;">
                    <img src="${e.gambar_artikel}" class="img-zi" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${e.judul_artikel.length >= 25 ? (e.judul_artikel.slice(0,25) + ' ...') : (e.judul_artikel)}</h5>
                    </div>
                </div>
            </a>
        </div>
        `;
        })

        data_terpopuler_display.innerHTML = teks1;

        let dataPalingTersisih = filterTanpa1.filter( x => !arrayPopuler.map(e => e.id_artikel).includes(x.id_artikel) );
        const teratas = dataPalingTersisih.sort((a,b) => {
            return b.like_artikel.length - a.like_artikel.length
        })

        // data teratas
        const arrayTeratas = teratas.slice(0,3);
        teks2 = "";
        arrayTeratas.map((e) =>{
        teks2 += `
        <div class="col-md-4">
            <a href="./public/detail_artikel.html?slug=${e.slug}">
                <div class="card" style="width: 100%;">
                    <img src="${e.gambar_artikel}" class="img-zi" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.judul_artikel.length >= 25 ? (e.judul_artikel.slice(0,25) + ' ...') : (e.judul_artikel)}</h5>
                    </div>
                </div>
            </a>
        </div>
        `;
    })

        data_teratas_display.innerHTML = teks2;

        let dataPalingTersisihPart2 = filterTanpa1.filter( x => !arrayPopuler.map(e => e.id_artikel).includes(x.id_artikel) && !arrayTeratas.map(e => e.id_artikel).includes(x.id_artikel));

        // dataPalingTersisihPart2
        const terkini = dataPalingTersisihPart2.sort((a,b) => {
            return b.id_artikel - a.id_artikel
        })

        const arrayTerkini = terkini.slice(0,3);

        teks3 = "";
        arrayTerkini.map((e) =>{
        teks3 += `
        <div class="col-12">
                <a href="/public/detail_artikel.html?slug=${e.slug}">
                  <div class="card" style="width: 100%;">
                    <img src="${e.gambar_artikel}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${e.judul_artikel.length >= 25 ? (e.judul_artikel.slice(0,25) + ' ...') : (e.judul_artikel)}</h5>
                    </div>
                  </div>
                </a>
              </div>
        `;
        })

        data_terkini_display.innerHTML = teks3
    })