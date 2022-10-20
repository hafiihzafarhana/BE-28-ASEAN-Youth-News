// ===================================================== Reference ===========================================
let pengguna_saat_ini = null;
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