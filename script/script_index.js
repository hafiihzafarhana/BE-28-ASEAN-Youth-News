// ===================================================== Reference ===========================================
let pengguna_saat_ini = null;
const search_input_nav = document.getElementById('search_input_nav');
const search_btn_nav = document.getElementById('search_btn_nav');
const search_input_header = document.getElementById('search_input_header');
const search_btn_header = document.getElementById('search_btn_header');

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

  function checkLokasi(){
    let lokasi = window.location.href
    let loakasi_navigasi = lokasi.split('/')

    return loakasi_navigasi;
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

        if(checkLokasi().length == 4){
            elemen_tambah_artikel.innerHTML = `<a class="dropdown-item" href="./public/tambah_artikel.html">Post Article</a>`
        } else{
            elemen_tambah_artikel.innerHTML = `<a class="dropdown-item" href="./tambah_artikel.html">Post Article</a>`
        }
        pengguna_saat_ini.role == 2 ? (drowdown_list.insertBefore(elemen_tambah_artikel, hr_dropwdow)) : ('')

        document.getElementById('logout').href="javascript:logout()";
    } else{
        // hapus tombol user
        document.getElementById('dropdow_profile').remove()
    }
}

// searching di nav
search_btn_nav.addEventListener('click',() => {
    if(checkLokasi().length == 4){
        window.location.href = `./public/pencarian_search.html?key=${search_input_nav.value}`
    } else{
        window.location.href = `./pencarian_search.html?key=${search_input_nav.value}`
    }
})

// searching di header
search_btn_header.addEventListener('click',() => {
    if(checkLokasi().length == 4){
        window.location.href = `./public/pencarian_search.html?key=${search_input_header.value}`
    } else{
        window.location.href = `./pencarian_search.html?key=${search_input_header.value}`
    }
})

// dapat slug
function generateSlug(text){
    return text.toString().toLowerCase()
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/\s+/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/[^\w\-]+/g, '');
}

function orangBiasaDIlarangEdit(halaman=""){
    checkUserInWebStorage()
    if(halaman == "edit"){
        if(pengguna_saat_ini == null || getSlug('slug') == null || pengguna_saat_ini.role == 1)
            window.location.href = './../index.html';
    }
    if(halaman == "tambah"){
        if(pengguna_saat_ini == null || pengguna_saat_ini.role == 1)
            window.location.href = './../index.html';
    }
    if(halaman == "profile"){
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
}

function validasi_edit_artikel(judul, penulis, gambar_artikel, kategori, isi){
    if(kosong(judul) || kosong(penulis) || kosong(gambar_artikel) || kosong(kategori) || kosong(isi)){
        alert('Tidak Boleh Kosong')
        return false;
    }
    return true;
}

function dataUser(posisi){
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
        if(posisi != "profile_user"){
            profile_nama_depan.value = data[0].namaDepan_user;
            profile_nama_belakang.value = data[0].namaBelakang_user;
            profile_foto.value = data[0].fotoProfile_user;
            profile_email.value = data[0].email;
            profile_number.value = data[0].number_user;
            profile_no_id.value = data[0].id_user;
            profile_password.value = data[0].password
        }
    })
}

function tampilArtikel(posisi){
    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
        .then(subjek => subjek.json())
        .then(data => {
        const filterTanpa1 = data.filter((e) => e.id_artikel != 1)
        const terpopuler = filterTanpa1.sort((a,b) => {
            return b.komentar.length - a.komentar.length
        })

        // data populer
        const arrayPopuler = terpopuler.slice(0,3)
        teks1 = "";

        let dataPalingTersisih = filterTanpa1.filter( x => !arrayPopuler.map(e => e.id_artikel).includes(x.id_artikel) );
        const teratas = dataPalingTersisih.sort((a,b) => {
            return b.like_artikel.length - a.like_artikel.length
        })

        // data teratas
        const arrayTeratas = teratas.slice(0,3);
        teks2 = "";

        if(posisi == "index"){
            arrayPopuler.map((e) =>{
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
        
                data_terpopuler_display.innerHTML = teks1;

            arrayTeratas.map((e) =>{
                teks2 += `
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
            data_teratas_display.innerHTML = teks2;
        }


        let dataPalingTersisihPart2 = filterTanpa1.filter( x => !arrayPopuler.map(e => e.id_artikel).includes(x.id_artikel) && !arrayTeratas.map(e => e.id_artikel).includes(x.id_artikel));

        // dataPalingTersisihPart2
        const terkini = dataPalingTersisihPart2.sort((a,b) => {
            return b.id_artikel - a.id_artikel
        })

        const arrayTerkini = terkini.slice(0,3);

        teks3 = "";
        arrayTerkini.map((e) =>{
        teks3 += `
        <div class="col-12">
                <a href="/public/detail_artikel.html?slug=${e.slug}">
                  <div class="card" style="width: 100%;">
                    <img src="${e.gambar_artikel}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${e.judul_artikel.length >= 25 ? (e.judul_artikel.slice(0,25) + ' ...') : (e.judul_artikel)}</h5>
                    </div>
                  </div>
                </a>
              </div>
        `;
        })

        data_terkini_display.innerHTML = teks3
    })
}


function getSlug(ambil) {
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const getSlug = urlParams.get(ambil);
    return getSlug;
  }