// ===================================================== Reference ===========================================
const isi_detail = document.getElementById('isi_detail');
const data_terkini_display = document.getElementById('data_terkini_display');
let edit_data;
let tambahData;
let hapus_data;

// ===================================================== fetch ===============================================
function getSlug(){
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const getSlug = urlParams.get('slug')
    return getSlug;
}

fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel?slug=${getSlug()}`)
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
                <button class="btn"><i class="fa-solid fa-share"></i></button>

                <div class="btn-group d-flex align-items-center justify-content-center" id="dropdow_profile">
                ${(pengguna_saat_ini.role == 2 ? (`<button type="button" class="btn dropdown-toggle-split" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical"></i></button>`) : (``))}
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
            Komentar (${detail.komentar.length})
        </p>
        <div class="collapse mt-3" id="collapseExample">
            <div class="card card-body">
                <div class="d-flex flex-column" id="isiKomenanOrang">
                    ${detail.komentar.map((e) =>(`
                        <div class="d-flex flex-column">
                            <div class="d-flex gap-2">
                                <p class="fw-bold">${e.username_user}</p>
                                <p class="text-12px"><i>21 Desember 2022</i></p>
                            </div>
                            <p>"${e.isiKomen}"</p>
                        </div>`)
                    )}
                </div>
                <div class="mt-3">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="fillKomen"></textarea>
                        <label for="fillKomen">Tulis komentar ...</label>
                    </div>
                    <button class="btn bg-prima mt-3 text-white text-end" id="tmb_komen" onClick="tambahData('${detail.id_artikel}')">Kirim</button>
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

    fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
        .then(subjek => subjek.json())
        .then(data => {
        const filterTanpa1 = data.filter((e) => e.id_artikel != 1)
        const terpopuler = filterTanpa1.sort((a,b) => {
            return b.komentar.length - a.komentar.length
        })

        // data populer
        const arrayPopuler = terpopuler.slice(0,3)

        let dataPalingTersisih = filterTanpa1.filter( x => !arrayPopuler.map(e => e.id_artikel).includes(x.id_artikel) );
        const teratas = dataPalingTersisih.sort((a,b) => {
            return b.like_artikel.length - a.like_artikel.length
        })

        // data teratas
        const arrayTeratas = teratas.slice(0,3);

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


    edit_data = (id) => {
        if(pengguna_saat_ini != null){
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel?id_artikel=${id}`)
            .then(subjek => subjek.json())
            .then(dataArtikel => {
                const checkLikeUser = dataArtikel[0].like_artikel.filter((e) => e.username_user == pengguna_saat_ini.username_user);
                const getDataLikeArtikel = dataArtikel[0].like_artikel.map(e => {
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
            window.location.href = "./login.html";
        }
    }

    tambahData = (id) => {
        if(pengguna_saat_ini != null){
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel?id_artikel=${id}`)
            .then(subjek => subjek.json())
            .then(data => {
                const getDataKomentar = data[0].komentar.map(e => {
                    return e;
                })

                if(document.getElementById('fillKomen').value != ""){
                let dataKomenBaru = {
                    id_komentar:data[0].komentar.length+1,
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
            window.location.href = "./login.html";
        }
    }

    hapus_data = (id) => {
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`,{
            method:"DELETE"
        })
        .then(() => {
            window.location.href="./../index.html";
        })
    }
