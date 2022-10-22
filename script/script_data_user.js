// =========================================== Reference ================================================
const profile_tampil_username = document.getElementById('profile_tampil_username');
const profile_tampil_gender = document.getElementById('profile_tampil_gender');
const profile_tampil_email = document.getElementById('profile_tampil_email');
const profile_tampil_number = document.getElementById('profile_tampil_number');
const gambar_profil_img = document.getElementById('gambar_profil_img');
const artikel_yang_dilike = document.getElementById('artikel_yang_dilike');
pengguna_saat_ini = null;

// ==================================================Validasi==============================================

// ada beberap jenis orang yang tidak bisa masuk
function orangBiasaDIlarangEdit(){
    checkUserInWebStorage()
    if(pengguna_saat_ini == null){
        window.location.href = './../index.html';
    }
}

orangBiasaDIlarangEdit()

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
    })

fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
    .then(subjek => subjek.json())
    .then(datas => {
        let azai = []

        let dataLiked = datas.map(datas => datas.like_artikel.map(e => {
            if(e.username_user.includes(pengguna_saat_ini.username_user) == true){
                azai.push(datas)
            }
        }))

        teks1 = "";
        azai.map((e) => {
            teks1 += `
            <div class="col-md-4">
                <a href="./public/detail_artikel.html?slug=${e.slug}">
                    <div class="card" style="width: 100%;">
                        <img src="${e.gambar_artikel}" class="img-zi" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${e.judul_artikel.length >= 25 ? (e.judul_artikel.slice(0,25) + ' ...') : (e.judul_artikel)}</h5>
                        </div>
                    </div>
                </a>
            </div>
        `;
        })

        artikel_yang_dilike.innerHTML = teks1
    })
