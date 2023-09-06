window.onload = () => getAllUsers();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

async function getAllUsers() {
    const url = "http://localhost:8080/users"
    const response = await fetch(url);
    const data = await response.json();
    let users = data['_embedded']
    displayUsers(users['users'])
}

const displayUsers = (users) => {
    let tableBody = document.getElementById("user-table")
    tableBody.innerHTML = ""
    users.forEach(user => {
        tableBody.innerHTML +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
            </tr>`;
    })
}

const addUser = () => {

    if (!confirm("Are you sure you want to add this user?")) return;

    let id = document.getElementById("id").value
    let name = document.getElementById("name").value
    let status = document.getElementById("status").value
    let role = document.getElementById("role").value

    if (!id || !name || !status || !role) {
        alert("Please select all fields!");
        return;
    }

    fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({id: id, name: name, role: role, status: status})
    }).then(r => getAllUsers());


}
