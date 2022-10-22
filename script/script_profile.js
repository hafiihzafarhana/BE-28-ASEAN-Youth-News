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

// ada beberap jenis orang yang tidak bisa masuk
function orangBiasaDIlarangEdit(){
    checkUserInWebStorage()
    if(pengguna_saat_ini == null){
        window.location.href = './../index.html';
    }

    if(pengguna_saat_ini.role == 2){
        let a_dashboard = document.createElement('a');
        a_dashboard.classList = "btn bg-light text-dark mt-3"
        a_dashboard.href="./admin/dash_admin.html"
        a_dashboard.innerHTML = `<i class="fa-solid fa-user-lock"></i> Admin`
        profile_kiri.append(a_dashboard)
    }
}

orangBiasaDIlarangEdit()

function kosongAtauAdaSpasi(str){
    return str === "" || str.match(/^ *$/) !== null;
}

function kosong(str){
    return str === "";
}

// memvalidasi setiap field 
function Validasi(){
    let nama_regex = /^[a-zA-Z]+$/; //abc ABC
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

fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/users?username_user=${pengguna_saat_ini.username_user}`)
    .then(subjek => subjek.json())
    .then(data => {
        profile_tampil_username.innerText = data[0].username_user;
        profile_tampil_gender.innerText = data[0].gender;
        profile_tampil_email.innerText = data[0].email
        if(data[0].number_user != ""){
            profile_tampil_number.innerText = data[0].number_user
        } else{
            profile_tampil_number.innerText = "Not Yet"
        }

        if(data[0].fotoProfile_user != ""){
            gambar_profil_img.src=data[0].fotoProfile_user;
        } else{
            gambar_profil_img.src="https://th.bing.com/th/id/OIP.ybB2a0HimX1I-ybBY4pOPwHaHa?pid=ImgDet&rs=1";
        }

        profile_nama_depan.value = data[0].namaDepan_user;
        profile_nama_belakang.value = data[0].namaBelakang_user;
        profile_foto.value = data[0].fotoProfile_user;
        profile_email.value = data[0].email;
        profile_number.value = data[0].number_user;
        profile_no_id.value = data[0].id_user;
        profile_password.value = data[0].password
    })


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