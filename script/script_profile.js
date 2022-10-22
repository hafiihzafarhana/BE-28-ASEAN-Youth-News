// =========================================== Reference ================================================
const profile_nama_depan = document.getElementById('profile_nama_depan');
const profile_nama_belakang = document.getElementById('profile_nama_belakang');
const profile_foto = document.getElementById('profile_foto');
const profile_email = document.getElementById('profile_email');
const profile_number = document.getElementById('profile_number');
const profile_save_btn = document.getElementById('profile_save_btn');
const profile_tampil_username = document.getElementById('profile_tampil_username');
const profile_tampil_gender = document.getElementById('profile_tampil_gender');
const profile_tampil_email = document.getElementById('profile_tampil_email');
const profile_tampil_number = document.getElementById('profile_tampil_number');
const profile_no_id = document.getElementById('profile_no_id');
const profile_password = document.getElementById('profile_password');
const gambar_profil_img = document.getElementById('gambar_profil_img');

const profile_kiri = document.getElementById('profile_kiri');

pengguna_saat_ini = null;
// ==================================================Validasi==============================================

orangBiasaDIlarangEdit("profile");

function kosongAtauAdaSpasi(str){
    return str === "" || str.match(/^ *$/) !== null;
}

// memvalidasi setiap field 
function Validasi(){
    let nama_regex = /^[a-zA-Z ]+$/; //abc ABC
    let email_regex = /^[a-zA-Z0-9]+@(gmail)\.com$/; //abc ABC 123@gmail.com
    let password_regex = /^[a-zA-Z0-9]{8,}$/;
    let number_regex = /^[0-9]{10,}$/;
    if(kosong(profile_nama_depan.value) || kosong(profile_nama_belakang.value) || kosongAtauAdaSpasi(profile_email.value) || kosongAtauAdaSpasi(profile_number.value) || kosong(profile_password.value)){
        alert("Tidak Boleh Kosong atau ada spasi");
        return false;
    }

    if(!nama_regex.test(profile_nama_depan.value) || !nama_regex.test(profile_nama_belakang.value)){
        alert('Format nama salah. Harus abc / ABC / 0-9')
        return false;
    }

    if(!password_regex.test(profile_password.value)){
        alert('Password tidak boleh kurang dari 8 karakter')
        return false;
    }

    if(!email_regex.test(profile_email.value)){
        alert('Format email salah. Harus abc / ABC / 123@gmail.com')
        return false;
    }

    if(!number_regex.test(profile_number.value)){
        alert("Nomor harus angka")
        return false;
    }

    return true;
}

// =================================================handler====================================================

dataUser("profile")

// ==================================================== Event ==========================================

function edit_profile(){
    if(!Validasi()){
        return;
    } else{
        let dataMasuk = {
            namaDepan_user:profile_nama_depan.value,
            namaBelakang_user:profile_nama_belakang.value,
            fotoProfile_user:profile_foto.value,
            email:profile_email.value,
            number_user:profile_number.value,
            password:profile_password.value
        }
        let encoded = encodeURI(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/users/${profile_no_id.value}`);
        fetch(encoded,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(dataMasuk)
        })
        .then(subjek => subjek.json())
        .then(data => {
            profile_tampil_number.innerHTML = data.number_user;
            profile_tampil_email.innerHTML = data.email;
            gambar_profil_img.src=data.fotoProfile_user;
        })
    }
}

profile_save_btn.addEventListener('click',edit_profile)