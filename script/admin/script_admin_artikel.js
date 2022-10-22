// ============================================== Reference ========================================
const data_table_admin = document.getElementById('data_table_admin');
let hapus_data;

fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel')
    .then(subjek => subjek.json())
    .then(datas => {
        let teks = '';
        datas.map((e,i) => {
            teks+= `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${e.judul_artikel}</td>
            <td>
                <a href="./../edit_artikel.html?slug=${e.slug}" class="btn btn-warning badge">Edit</a>
                <a onClick="hapus_data('${e.id_artikel}')" class="btn btn-danger badge">Delete</a>
            </td>
          </tr>
            `;
        })

        data_table_admin.innerHTML = teks;
    })

    hapus_data = (id) => {
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/artikel/${id}`,{
            method:"DELETE"
        })
        .then(() => {
            window.location.href = './dash_admin_artikel.html'
        })
    }