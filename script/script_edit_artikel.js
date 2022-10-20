// ===================================================== Reference ===========================================
let pengguna_saat_ini = null;
const edit_judul = document.getElementById('edit_judul');
const edit_slug = document.getElementById('edit_slug');
const edit_penulis = document.getElementById('edit_penulis');
const edit_kategori = document.getElementById('edit_kategori');
const edit_isi = document.getElementById('edit_isi');
const edit_gambar = document.getElementById('edit_gambar');
const edit_btn = document.getElementById('edit_btn');

// ======================================================function============================================
function generateSlug(text){
    return text.toString().toLowerCase()
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/\s+/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/[^\w\-]+/g, '');
}

// ==================================================Validasi==============================================

// ada beberap jenis orang yang tidak bisa masuk
function orangBiasaDIlarangEdit(){
    if(pengguna_saat_ini == null || getSlug() == null){
        if(pengguna_saat_ini?.role == 1){
            window.location.href = './../index.html';
        }
        window.location.href = './../index.html';
    }
}

// Apakah field kosong?
function kosong(str){
    return str === "";
}

// validasi tambah dan edit artikel
function validasi_edit_artikel(){
    if(kosong(edit_judul.value) || kosong(edit_penulis.value) || kosong(edit_gambar.value) || kosong(edit_kategori.value) || kosong(edit_isi.value)){
        alert('Tidak Boleh Kosong')
        return false;
    }
    return true;
}

// periksa apakah ada data di local atau session
function checkUserInWebStorage(){
    let check_user = localStorage.getItem('tetap_login');
    if(check_user == "benar"){
        pengguna_saat_ini = JSON.parse(localStorage.getItem('dataUser'));
    } else{
        pengguna_saat_ini = JSON.parse(sessionStorage.getItem('dataUser'));
    }
}

// User ketika ingin logout
function logout(){
    sessionStorage.removeItem("dataUser");
    localStorage.removeItem("dataUser");
    localStorage.removeItem("tetap_login");
    let lokasi = window.location.href
    let loakasi_navigasi = lokasi.split('/')
    if(loakasi_navigasi.length == 4){
        window.location = "./index.html";
    } else{
        window.location = './../index.html'
    }
  }

// ==================================================Event Handler============================================
window.onload = function(e){
    checkUserInWebStorage()
    orangBiasaDIlarangEdit()
    if(pengguna_saat_ini != null){
        ambil_data()
        // hapus tombol login
        document.getElementById('btn_login').remove();

        // Buat menampilkan tambah artikel jika itu admin
        let drowdown_list = document.getElementById('drowdown_list');
        let hr_dropwdow = document.getElementById('hr_dropwdow')
        let elemen_tambah_artikel = document.createElement('li')
        let lokasi = window.location.href
        let loakasi_navigasi = lokasi.split('/')
        if(loakasi_navigasi.length == 4){
            elemen_tambah_artikel.innerHTML = `<a class="dropdown-item" href="./public/tambah_artikel.html">Tambah Data</a>`
        } else{
            elemen_tambah_artikel.innerHTML = `<a class="dropdown-item" href="./tambah_artikel.html">Tambah Data</a>`
        }
        pengguna_saat_ini.role == 2 ? (drowdown_list.insertBefore(elemen_tambah_artikel, hr_dropwdow)) : ('')

        document.getElementById('logout').href="javascript:logout()";
    } else{
        // hapus tombol user
        document.getElementById('dropdow_profile').remove()
    }
}

function getSlug(){
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const getSlug = urlParams.get('slug')
    return getSlug;
}

function ambil_data(){
fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel?slug=${getSlug()}`)
    .then(subjek => subjek.json())
    .then(data => {
        edit_judul.value = data[0].judul_artikel;
        edit_slug.value = data[0].slug;
        edit_penulis.value = data[0].nama_penulis;
        edit_gambar.value = data[0].gambar_artikel;
        edit_kategori.value = data[0].kategori_artikel
        edit_isi.value = data[0].isi;
        document.getElementById('id_artikel').value = data[0].id_artikel;
    })
}

    edit_btn.addEventListener('click',() => {
        if(!validasi_edit_artikel()){
            return;
        } else{
        let data = {
            judul_artikel:edit_judul.value,
            slug:edit_slug.value,
            nama_penulis:edit_penulis.value,
            gambar_artikel:edit_gambar.value,
            kategori_artikel:edit_kategori.value,
            isi:edit_isi.value
        }

        console.log(data)
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${document.getElementById('id_artikel').value}`,{
            method:"PUT",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            // body:JSON.stringify(data)
        })
            .then(() => {
                // window.location.href = `./detail_artikel.html?slug=${getSlug()}`;
            })
        }
    })

    edit_judul.addEventListener('keyup',(e) => {
        let judul = edit_judul.value;
        edit_slug.value = generateSlug(judul)
     })