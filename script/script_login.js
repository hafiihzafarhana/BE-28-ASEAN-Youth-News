// ===================================================== Reference ===========================================
const login_input_username = document.getElementById('login_input_username');
const login_input_password = document.getElementById('login_input_password');
const login_btn = document.getElementById('login_btn');
const login_ingat_saya = document.getElementById("login_ingat_saya");
let pengguna_saat_ini = null;

// ===================================================== Event ===============================================
login_btn.addEventListener('click',userLogin)

// ================================================== function handler ======================================

// Pengguna yang akan mendapat validasi setelah memasukan username dan password
function userLogin(){
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/users')
        .then((subjek) => subjek.json())
        .then(datas => {
            datas.map((data) => {
                if(data.username_user == login_input_username.value){
                    if(data.password == login_input_password.value){
                        let dataUserMasuk = {username_user:data.username_user}
                        login(dataUserMasuk);
                    }
                }
            })
        })
}

// Pengguna yang username dan passwordnya benar maka akan menuju fungsi ini
function login(dataUser){
    let tetapLogin = login_ingat_saya.checked;
    if(tetapLogin){
        localStorage.setItem('tetap_login',"benar");
        localStorage.setItem('dataUser',JSON.stringify(dataUser));
        window.location = "./../index.html";
    } else{
        sessionStorage.setItem('dataUser',JSON.stringify(dataUser));
        window.location = "./../index.html";
    }
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

// ====================================================== windows load pertama ===================================
window.onload = function(){
    checkUserInWebStorage()
    if(pengguna_saat_ini != null){
        login_input_username.disabled = true;
        login_input_password.disabled = true;
        window.location.href = "./../index.html";
    }
}