// ===================================================== Reference ===========================================
const isi_detail = document.getElementById('isi_detail');
const data_terkini_display = document.getElementById('data_terkini_display');
let edit_data;
let tambahData;
let hapus_data;

// ===================================================== fetch ===============================================

fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/?slug=${getSlug('slug')}`)
    .then(subjek => subjek.json())
    .then(datas => {
        checkUserInWebStorage()
        let detail = datas[0];
        let a = detail.komentar.join(' ')

        let isi = `<p class="fw-bold text-center text-24px">${detail.judul_artikel}</p>
        <p class="text-12px">${detail.created_at}</p>
        <div class="detail_artikel_nama_icon my-2">
            <p class="text-16px">${detail.nama_penulis}</p>
            <div class="d-flex">
                <button class="btn" onClick="edit_data('${detail.id_artikel}')" id="untukLike"><i class="fa-solid fa-thumbs-up"></i> <span id="jumlah_likenya">${detail.like_artikel.length}</span>
                </button>
                

                <div class="btn-group d-flex align-items-center justify-content-center" id="dropdow_profile">
                ${(pengguna_saat_ini?.role == 2 ? (`<button type="button" class="btn dropdown-toggle-split" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical"></i></button>`) : (``))}
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-start mt-2" id="drowdown_list">
                        <li><a href="./edit_artikel.html?slug=${detail.slug}" class="dropdown-item btn">Ubah</a></li>
                        <li><button onClick="hapus_data('${detail.id_artikel}')" class="dropdown-item btn">Hapus</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <img src="${detail.gambar_artikel}" class="img-me" alt="">
        <p class="mt-3 px-2" id="isi_isi">
        </p>
        <p class="btn bg-prima text-white" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Comments (${detail.komentar.length})
        </p>
        <div class="collapse mt-3" id="collapseExample">
            <div class="card card-body">
                <div class="d-flex flex-column" id="isiKomenanOrang">
                    ${detail.komentar.map((e) =>(`
                        <div class="d-flex flex-column">
                            <div class="d-flex gap-2">
                                <p class="fw-bold">${e.username_user}</p>
                            </div>
                            <p>"${e.isiKomen}"</p>
                        </div>`)
                    ).join('')}
                </div>
                <div class="mt-3">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="fillKomen"></textarea>
                        <label for="fillKomen">Enter Comment</label>
                    </div>
                    <button class="btn bg-prima mt-3 text-white text-end" id="tmb_komen" onClick="tambahData('${detail.id_artikel}')">Send</button>
                </div>
            </div>
        </div>`;

        isi_detail.innerHTML=isi
        let isi_isi = document.getElementById('isi_isi');
        isi_isi.innerText = detail.isi

        if(pengguna_saat_ini != null){
            let apakahDiaLike = detail.like_artikel.filter((e) => e.username_user == pengguna_saat_ini.username_user);
            if(apakahDiaLike.length > 0){
                document.getElementById('untukLike').style.color="yellow"
            } else{
                document.getElementById('untukLike').style.color = "black"
            }
        }
    })

    tampilArtikel("detail_artikel");

    edit_data = (id) => {
        if(pengguna_saat_ini != null){
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`)
            .then(subjek => subjek.json())
            .then(dataArtikel => {
                const checkLikeUser = dataArtikel.like_artikel.filter((e) => e.username_user == pengguna_saat_ini.username_user);
                const getDataLikeArtikel = dataArtikel.like_artikel.map(e => {
                    return e;
                })
                let encoded = encodeURI(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`);
                if(checkLikeUser.length > 0){
                    let sisihkanDataUserYangSudahLike = getDataLikeArtikel.filter(e => e.username_user != pengguna_saat_ini.username_user)
                    let data = {
                        like_artikel:sisihkanDataUserYangSudahLike
                    }
                    fetch(encoded,{
                        method: 'put',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify(data)
                    }).then(respon => respon.json())
                    .then(json => {
                        document.getElementById('jumlah_likenya').innerText = json.like_artikel.length;
                        document.getElementById('untukLike').style.color = "black"
                    })
                } else{

                    const dataLikeTerbaru = [...getDataLikeArtikel, { username_user:pengguna_saat_ini.username_user}]

                    let data = {
                        like_artikel:dataLikeTerbaru
                    }

                    fetch(encoded,{
                        method: 'put',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify(data)
                    }).then(respon => respon.json())
                    .then(json => {
                        document.getElementById('jumlah_likenya').innerText = json.like_artikel.length
                        document.getElementById('untukLike').style.color="yellow"
                    })
                }
            })
        } else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You should login !',
            }).then(() => {
                window.location.href = "./login.html";
            })
        }
    }

    tambahData = (id) => {
        if(pengguna_saat_ini != null){
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`)
            .then(subjek => subjek.json())
            .then(data => {
                const getDataKomentar = data.komentar.map(e => {
                    return e;
                })

                if(document.getElementById('fillKomen').value != ""){
                let dataKomenBaru = {
                    id_komentar:data.komentar.length+1,
                    username_user:pengguna_saat_ini.username_user,
                    isiKomen:document.getElementById('fillKomen').value
                }

                let dataMasuk = [...getDataKomentar,dataKomenBaru];

                let encoded = encodeURI(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`);
                fetch(encoded,{
                    method:"put",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({komentar:dataMasuk})
                })
                .then(subjek => subjek.json())
                    .then(datas => {
                        let isiKomenanOrang = document.getElementById('isiKomenanOrang');
                        let isiSemuaKomentar = datas.komentar.map((e) => {
                            return(`
                            <div class="d-flex flex-column">
                                <div class="d-flex gap-2">
                                    <p class="fw-bold">${e.username_user}</p>
                                    <p class="text-12px"><i>21 Desember 2022</i></p>
                                </div>
                                <p>"${e.isiKomen}"</p>
                            </div>`)
                        })

                        isiKomenanOrang.innerHTML = isiSemuaKomentar;
                        document.getElementById('fillKomen').value =""
                    })
                } else{
                    alert("Komentar tidak boleh kosong")
                }
            })
        } else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You should login !',
            }).then(() => {
                window.location.href = "./login.html";
            })
        }
    }

    hapus_data = (id) => {
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`,{
            method:"DELETE"
        })
        .then(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Article was deleted !',
            }).then(() => {
                window.location.href="./../index.html";
            })
        })
    }
