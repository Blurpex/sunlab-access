// load all users when the page is initially loaded
window.onload = () => getAllUsers();

// fill select form with given data
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

// keep track of current user form data
let formInput = { id:"", name:"", role:"", status:"" }

// get the current form data
const getUserFormData = () => {
    formInput.id = document.getElementById("id").value
    formInput.name = document.getElementById("name").value
    formInput.role = document.getElementById("role").value
    formInput.status = document.getElementById("status").value
}

// get users from a given url
async function fetchUsers(url) {
    const response = await fetch(url);
    const data = await response.json();
    let users = data['_embedded']
    displayUsers(users['users'])
}

// get all users
function getAllUsers() {
    const url = "http://localhost:8080/users"
    fetchUsers(url);
}

// search users by filters
const searchUser = () => {
    getUserFormData();

    let url = "http://localhost:8080/users/search/searchUsers?"
    Object.keys(formInput).forEach(paramName => {
        let paramValue = formInput[paramName]
        if(paramValue !== "") url += `${paramName}=${paramValue}&`
    })
    url = url.slice(0, -1);
    fetchUsers(url);
}

// add user from given data
const addUser = () => {
    getUserFormData()
    if (formInput.id === "" || formInput.name === "" || formInput.status === "" || formInput.role === "") {
        alert("Please select all fields!");
        return;
    }
    if (!confirm("Are you sure you want to add this user?")) return;

    fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({id: formInput.id, name: formInput.name, role: formInput.role, status: formInput.status})
    }).then(() => getAllUsers());
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
