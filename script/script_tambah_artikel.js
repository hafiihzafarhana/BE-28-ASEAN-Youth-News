// ===================================================== Reference ===========================================
const tambah_judul = document.getElementById('tambah_judul');
const tambah_slug = document.getElementById('tambah_slug');
const tambah_penulis = document.getElementById('tambah_penulis');
const tambah_kategori = document.getElementById('tambah_kategori');
const tambah_isi = document.getElementById('tambah_isi');
const tambah_gambar = document.getElementById('tambah_gambar');
const tambah_btn = document.getElementById('tambah_btn');

// ==================================================== EVent ===============================================
orangBiasaDIlarangEdit("tambah");

tambah_btn.addEventListener('click',() => {
    if(!validasi_edit_artikel(tambah_judul.value, tambah_penulis.value, tambah_gambar.value, tambah_kategori.value, tambah_isi.value)){ return }
    else{
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
        .then(subjek => subjek.json())
        .then(datas => {
            const ids = datas.map((e) => {
                return e.id_artikel
            })

            const max = Math.max(...ids);

            let slugNew = datas.filter(e => {
                return (e.slug == tambah_slug.value);
            })

            let data = {
                id_artikel:max + 1,
                created_at:new Date().toLocaleString(),
                nama_penulis:tambah_penulis.value,
                gambar_artikel:tambah_gambar.value,
                judul_artikel:tambah_judul.value,
                like_artikel:[],
                isi:tambah_isi.value,
                slug: slugNew.length > 0 ? tambah_slug.value+'-'+Math.floor(Math.random() * (10000 - 1 + 1)) + 1 : tambah_slug.value,
                komentar:[],
                kategori_artikel:tambah_kategori.value
            }

            fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel',{
                method:"POST",
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body:JSON.stringify(data)
            })
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Data was uploaded !",
                    icon: "success",
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
        })
    }
})

tambah_judul.addEventListener('keyup',(e) => {
   let judul = tambah_judul.value;
   tambah_slug.value = generateSlug(judul)
})