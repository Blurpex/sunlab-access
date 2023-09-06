async function getUsers() {
    const url = "http://localhost:8080/users"
    const response = await fetch(url);
    const data = await response.json();

    let tempUsers = data['_embedded']
    let users = tempUsers['users']

    let tableBody = document.getElementById("user-table")
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
