// ===================================================== Reference ===========================================
const tambah_judul = document.getElementById('tambah_judul');
const tambah_slug = document.getElementById('tambah_slug');
const tambah_penulis = document.getElementById('tambah_penulis');
const tambah_kategori = document.getElementById('tambah_kategori');
const tambah_isi = document.getElementById('tambah_isi');
const tambah_gambar = document.getElementById('tambah_gambar');
const tambah_btn = document.getElementById('tambah_btn');

// =================================================validasi================================================
function validasi_edit_artikel(){
    if(kosong(tambah_judul.value) || kosong(tambah_penulis.value) || kosong(tambah_gambar.value) || kosong(tambah_kategori.value) || kosong(tambah_isi.value)){
        alert('Tidak Boleh Kosong')
        return false;
    }
    return true;
}

// ======================================================function============================================
function generateSlug(text){
    return text.toString().toLowerCase()
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/\s+/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/[^\w\-]+/g, '');
}

// ==================================================== EVent ===============================================
tambah_btn.addEventListener('click',() => {
    if(!validasi_edit_artikel()){ return }
    else{
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
        .then(subjek => subjek.json())
        .then(datas => {
            const ids = datas.map((e) => {
                return e.id_artikel
            })

            const max = Math.max(...ids);
            let data = {
                id_artikel:max + 1,
                created_at:new Date().toLocaleString(),
                nama_penulis:tambah_penulis.value,
                gambar_artikel:tambah_gambar.value,
                judul_artikel:tambah_judul.value,
                like_artikel:[],
                isi:tambah_isi.value,
                slug:tambah_slug.value,
                komentar:[],
                kategori_artikel:tambah_kategori.value
            }

            datas.map((e) => {
                if(e.slug.includes(tambah_slug.value) == true){
                        console.log(tambah_slug.value+'-'+Math.floor(Math.random() * (10000 - 1 + 1)) + 1)
                        data = {
                            id_artikel:max + 1,
                            created_at:new Date().toLocaleString(),
                            nama_penulis:tambah_penulis.value,
                            gambar_artikel:tambah_gambar.value,
                            judul_artikel:tambah_judul.value,
                            like_artikel:[],
                            isi:tambah_isi.value,
                            slug:tambah_slug.value+'-'+Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
                            komentar:[],
                            kategori_artikel:tambah_kategori.value
                        }

                        return;
                }
            })

            fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel',{
                method:"POST",
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body:JSON.stringify(data)
            })
            .then(() => {
                tambah_penulis.value = "";
                tambah_gambar.value = "";
                tambah_judul.value = "";
                tambah_isi.value = "";
                tambah_slug.value = "";
                tambah_kategori.value = "";
            })
        })
    }
})

tambah_judul.addEventListener('keyup',(e) => {
   let judul = tambah_judul.value;
   tambah_slug.value = generateSlug(judul)
})