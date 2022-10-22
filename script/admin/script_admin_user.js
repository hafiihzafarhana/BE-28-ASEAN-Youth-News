// ============================================== Reference ========================================
const data_table_users = document.getElementById('data_table_users');
let hapus_data;

fetch('https://634be8e9317dc96a308d3518.mockapi.io/ayf/users')
    .then(subjek => subjek.json())
    .then(datas => {
        let teks = '';
        datas.map((e,i) => {
            teks+= `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${e.username_user}</td>
            <td>
                <a href="./dash_edit_user.html?id_user=${e.id_user}" class="btn btn-warning badge">Edit</a>
                <a onClick="hapus_data('${e.id_user}')" class="btn btn-danger badge">Delete</a>
            </td>
          </tr>
            `;
        })

        data_table_users.innerHTML = teks;
    })

    hapus_data = (id) => {
        fetch(`https://634be8e9317dc96a308d3518.mockapi.io/ayf/users/${id}`,{
            method:"DELETE"
        })
        .then(() => {
            window.location.href = './dash_admin_user.html'
        })
    }