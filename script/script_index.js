// ===================================================== Reference ===========================================
let pengguna_saat_ini = null;
const search_input_nav = document.getElementById('search_input_nav');
const search_btn_nav = document.getElementById('search_btn_nav');
const search_input_header = document.getElementById('search_input_header');
const search_btn_header = document.getElementById('search_btn_header');

// ===============================================Validasi===================================================

// Apakah field kosong?
function kosong(str){
    return str === "";
}

// ================================================== function handler ======================================

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

  function checkLokasi(){
    let lokasi = window.location.href
    let loakasi_navigasi = lokasi.split('/')

    return loakasi_navigasi.length;
  }

window.onload = function(e){
    checkUserInWebStorage()
    if(pengguna_saat_ini != null){
        // hapus tombol login
        document.getElementById('btn_login').remove();

        // Buat menampilkan tambah artikel jika itu admin
        let drowdown_list = document.getElementById('drowdown_list');
        let hr_dropwdow = document.getElementById('hr_dropwdow')
        let elemen_tambah_artikel = document.createElement('li')
        let lokasi = window.location.href
        let loakasi_navigasi = lokasi.split('/')
        if(checkLokasi() == 4){
            elemen_tambah_artikel.innerHTML = `<a class="dropdown-item" href="./public/tambah_artikel.html">Post Article</a>`
        } else{
            elemen_tambah_artikel.innerHTML = `<a class="dropdown-item" href="./tambah_artikel.html">Post Article</a>`
        }
        pengguna_saat_ini.role == 2 ? (drowdown_list.insertBefore(elemen_tambah_artikel, hr_dropwdow)) : ('')

        document.getElementById('logout').href="javascript:logout()";
    } else{
        // hapus tombol user
        document.getElementById('dropdow_profile').remove()
    }
}

search_btn_nav.addEventListener('click',() => {
    if(checkLokasi() == 4){
        window.location.href = `./public/pencarian_search.html?key=${search_input_nav.value}`
    } else{
        window.location.href = `./pencarian_search.html?key=${search_input_nav.value}`
    }
})

search_btn_header.addEventListener('click',() => {
    if(checkLokasi() == 4){
        window.location.href = `./public/pencarian_search.html?key=${search_input_header.value}`
    } else{
        window.location.href = `./pencarian_search.html?key=${search_input_header.value}`
    }
})