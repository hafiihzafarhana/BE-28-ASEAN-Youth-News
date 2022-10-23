// ===================================================== Reference ===========================================
const regist_username = document.getElementById('regist_username');
const regist_email = document.getElementById('regist_email');
const regist_born = document.getElementById('regist_born');
const regist_password = document.getElementById('regist_password');
const regist_btn = document.getElementById('regist_btn');
const regist_negara = document.getElementById('regist_negara');
const regist_gender = document.getElementById('regist_gender');
const role = 1;
let pengguna_saat_ini = null;

// ===============================================Validasi===================================================

// Apakah field kosong?
function kosongAtauAdaSpasi(str){
    return str === null || str.match(/^ *$/) !== null;
}

// memvalidasi setiap field
function Validasi(){
    let nama_regex = /^[a-zA-Z ]+$/; //abc ABC
    let email_regex = /^[a-zA-Z0-9]+@(gmail)\.com$/; //abc ABC 123@gmail.com
    let username_regex = /^[a-zA-Z0-9]{5,}$/; //abc ABC 123 (minimal 5 karakter tanpa maksimum karakter)
    let password_regex = /^[a-zA-Z0-9]{8,}$/;

    if(kosongAtauAdaSpasi(regist_username.value) || kosongAtauAdaSpasi(regist_email.value) || kosongAtauAdaSpasi(regist_born.value) || kosongAtauAdaSpasi(regist_password.value)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Should not be empty !',
        })
        return false;
    }

    if(!username_regex.test(regist_username.value)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The username format is incorrect. Valid format: abc/ABC/123 !',
        })
        return false;
    }

    if(!password_regex.test(regist_password.value)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The password must be greater than equal to 8 characters !',
        })
        return false;
    }

    if(!email_regex.test(regist_email.value)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The email format is incorrect. Valid format: abc/ABC/123@gmail.com !',
        })
        return false;
    }

    if(regist_negara.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The country should not be empty !',
        })
        return false;
    }

    if(regist_gender.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The gender should not be empty !',
        })
        return false;
    }

    return true;
}

// ================================================Event handler======================================================

// Registrasi user
function userRegist(){
    if(!Validasi()){
        return;
    } else{
            fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/users')
            .then(subjek => subjek.json())
            .then(datas => {

                let apakahAdaUsernameSama = datas.filter(e => e.username_user == regist_username.value)

                if(apakahAdaUsernameSama.length < 1){
                // username_user: "hafiihza"
                const ids = datas.map((e) => {
                    return e.id_user
                })

                const max = Math.max(...ids);
                const dataMasuk = {
                    role_user: 1,
                    created_at: new Date().toLocaleString(),
                    namaDepan_user: "",
                    namaBelakang_user: "",
                    username_user: regist_username.value,
                    tanggal_lahir: regist_born.value,
                    negara: regist_negara.value,
                    password: enkripsi_password(),
                    id_user: max + 1,
                    fotoProfile_user: "",
                    number_user:"",
                    email:regist_email.value,
                    gender:regist_gender.value
                }
                console.log(dataMasuk)
                fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/users',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body:JSON.stringify(dataMasuk)
                    })
                    .then(() =>{
                        Swal.fire({
                            title: "Good job!",
                            text: "Success adding your account !",
                            icon: "success",
                        })
                        .then(() => {
                            window.location.href = './login.html';
                        })
                    })

                } else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This username has been registered !',
                    })
                }
            })
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

function enkripsi_password(){
    let check = "eZd?k5Prmc%RZCwPA4tTg2QUE*DfzuUpwC&sTQMU%ka+%XHQP#vT2pMh3B+?FYX?n-BrJ"
    var pass12 = CryptoJS.AES.encrypt(regist_password.value,check);
    return pass12.toString()
  }

// ===================================================== Event ======================================================

regist_btn.addEventListener('click', userRegist)

window.onload = function(){
    checkUserInWebStorage()
    if(pengguna_saat_ini != null){
        window.location.href = "./../index.html";
    }
}

