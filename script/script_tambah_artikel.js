// ===================================================== Reference ===========================================
const tambah_judul = document.getElementById('tambah_judul');
const tambah_slug = document.getElementById('tambah_slug');
const tambah_penulis = document.getElementById('tambah_penulis');
const tambah_kategori = document.getElementById('tambah_kategori');
const tambah_isi = document.getElementById('tambah_isi');
const tambah_gambar = document.getElementById('tambah_gambar');
const tambah_btn = document.getElementById('tambah_btn');

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
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/users')
        .then(subjek => subjek.json())
        .then(datas => {
            const ids = datas.map((e) => {
                return e.id_user
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

            console.log(JSON.stringify(data))

            fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel',{
                method:"POST",
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body:JSON.stringify(data)
            })
        })
})

tambah_judul.addEventListener('keyup',(e) => {
   let judul = tambah_judul.value;
   tambah_slug.value = generateSlug(judul)
})