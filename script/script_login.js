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
            let fil = datas.filter((data) => {
                return data.username_user == login_input_username.value
            })
            if(fil.length > 0){
                    if(deskripsi_password(fil[0].password) == login_input_password.value){
                        let dataUserMasuk = {username_user:fil[0].username_user, role:fil[0].role_user, id_user:fil[0].id_user}
                        login(dataUserMasuk);
                    } else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Incorrect password !',
                        })
                    }
                } else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username not yet registered !',
                    })
                }
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

function deskripsi_password(db_pass){
    let check = "eZd?k5Prmc%RZCwPA4tTg2QUE*DfzuUpwC&sTQMU%ka+%XHQP#vT2pMh3B+?FYX?n-BrJ"
    var pass12 = CryptoJS.AES.decrypt(db_pass,check);
    return pass12.toString(CryptoJS.enc.Utf8);
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