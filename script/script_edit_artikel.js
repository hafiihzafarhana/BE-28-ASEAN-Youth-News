// ===================================================== Reference ===========================================
const edit_judul = document.getElementById("edit_judul");
const edit_slug = document.getElementById("edit_slug");
const edit_penulis = document.getElementById("edit_penulis");
const edit_kategori = document.getElementById("edit_kategori");
const edit_isi = document.getElementById("edit_isi");
const edit_gambar = document.getElementById("edit_gambar");
const edit_btn = document.getElementById("edit_btn");

// ==================================================Validasi==============================================

// validasi tambah dan edit artikel
orangBiasaDIlarangEdit("edit");

// ==================================================Event Handler============================================

function ambil_data() {
  fetch(
    `https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel?slug=${getSlug('slug')}`
  )
    .then((subjek) => subjek.json())
    .then((data) => {
      edit_judul.value = data[0].judul_artikel;
      edit_slug.value = data[0].slug;
      edit_penulis.value = data[0].nama_penulis;
      edit_gambar.value = data[0].gambar_artikel;
      edit_kategori.value = data[0].kategori_artikel;
      edit_isi.value = data[0].isi;
      document.getElementById("id_artikel").value = data[0].id_artikel;
    });
}

edit_btn.addEventListener("click", () => {
  if (
    !validasi_edit_artikel(
      edit_judul.value,
      edit_penulis.value,
      edit_gambar.value,
      edit_kategori.value,
      edit_isi.value
    )
  ) {
    return;
  } else {
    fetch("https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel")
      .then((subjek) => subjek.json())
      .then((datas) => {
        let slugNew = datas.filter((e) => {
          return e.slug == edit_slug.value;
        });

        let data = {
          judul_artikel: edit_judul.value,
          slug: slugNew.length > 0 ? edit_slug.value+'-'+Math.floor(Math.random() * (10000 - 1 + 1)) + 1 : edit_slug.value,
          nama_penulis: edit_penulis.value,
          gambar_artikel: edit_gambar.value,
          kategori_artikel: edit_kategori.value,
          isi: edit_isi.value,
        };
        console.log(data)
        fetch(
          `https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${
            document.getElementById("id_artikel").value
          }`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(data),
          }
        ).then(() => {
          window.location.href = `./detail_artikel.html?slug=${getSlug()}`;
        });
      });
  }
});

edit_judul.addEventListener("keyup", (e) => {
  let judul = edit_judul.value;
  edit_slug.value = generateSlug(judul);
});

ambil_data();
