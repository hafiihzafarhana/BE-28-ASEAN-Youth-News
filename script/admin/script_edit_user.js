// ==================================================Reference===========================================
const edit_role = document.getElementById('edit_role');
const edit_first_name = document.getElementById('edit_first_name');
const edit_last_name = document.getElementById('edit_last_name');
const edit_username = document.getElementById('edit_username');
const edit_gender = document.getElementById('edit_gender');
const created_at = document.getElementById('created_at');
const edit_born = document.getElementById('edit_born');
const edit_negara_user = document.getElementById('edit_negara_user');
const edit_password = document.getElementById('edit_password');
const edit_email = document.getElementById('edit_email');
const edit_foto_profile = document.getElementById('edit_foto_profile');
const edit_btn_user = document.getElementById('edit_btn_user');

function getId(){
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const getSlug = urlParams.get('id_user')
    return getSlug;
}

fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/users/${getId()}`)
    .then(subjek => subjek.json())
    .then(data => {
        edit_role.value = data.role_user;
        edit_first_name.value = data.namaDepan_user;
        edit_last_name.value = data.namaBelakang_user;
        edit_username.value = data.username_user;
        edit_gender.value = data.gender;
        created_at.value = data.created_at;
        edit_born.value = data.tanggal_lahir;
        edit_negara_user.value = data.negara;
        edit_password.value = deskripsi_password(data.password);
        edit_email.value = data.email;
        edit_foto_profile.value = data.fotoProfile_user
    })

function updateSaved(){

    let data = {
        role_user:edit_role.value,
        namaDepan_user:edit_first_name.value,
        namaBelakang_user:edit_last_name.value,
        username_user:edit_username.value,
        gender:edit_gender.value,
        tanggal_lahir:edit_born.value,
        negara:edit_negara_user.value,
        password:enkripsi_password(edit_password.value),
        email:edit_email.value,
        fotoProfile_user:edit_foto_profile.value
    }

    fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/users/${getId()}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
    })
    .then(() => {
        window.location.reload();
    })
}

edit_btn_user.addEventListener('click',updateSaved);