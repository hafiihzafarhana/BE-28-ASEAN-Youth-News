// ===================================================== Reference ===========================================
let pengguna_saat_ini = null;

// periksa apakah ada data di local atau session
function checkUserInWebStorage(){
    let check_user = localStorage.getItem('tetap_login');
    if(check_user == "benar"){
        pengguna_saat_ini = JSON.parse(localStorage.getItem('dataUser'));
    } else{
        pengguna_saat_ini = JSON.parse(sessionStorage.getItem('dataUser'));
    }
}

window.onload = function(){
    checkUserInWebStorage()
    if(pengguna_saat_ini != null){
        // hapus tombol login
        document.getElementById('btn_login').remove();

        // Buat profile
        let profilePengguna = document.createElement('p');
        profilePengguna.innerHTML = "Pengguna"
        document.getElementById('nav-atas').append(profilePengguna)
    }
}