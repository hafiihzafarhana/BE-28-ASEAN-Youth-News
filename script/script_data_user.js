// =========================================== Reference ================================================
const profile_tampil_username = document.getElementById('profile_tampil_username');
const profile_tampil_gender = document.getElementById('profile_tampil_gender');
const profile_tampil_email = document.getElementById('profile_tampil_email');
const profile_tampil_number = document.getElementById('profile_tampil_number');
const gambar_profil_img = document.getElementById('gambar_profil_img');
const artikel_yang_dilike = document.getElementById('artikel_yang_dilike');

const profile_kiri = document.getElementById('profile_kiri');

// ==================================================Validasi==============================================
// ada beberap jenis orang yang tidak bisa masuk
orangBiasaDIlarangEdit("profile");

// =================================================handler====================================================

dataUser("profile_user")

fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
    .then(subjek => subjek.json())
    .then(datas => {
        let azai = []

        datas.map(datas => datas.like_artikel.map(e => {
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
