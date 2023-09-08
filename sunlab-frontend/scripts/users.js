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
    formInput.id = document.getElementById("id")
    formInput.name = document.getElementById("name")
    formInput.role = document.getElementById("role")
    formInput.status = document.getElementById("status")
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
        let paramValue = formInput[paramName].value
        if(paramValue !== "") url += `${paramName}=${paramValue}&`
    })
    url = url.slice(0, -1);
    fetchUsers(url);
}

// add user from given data
const addUser = () => {
    getUserFormData()
    if (formInput.id.value === "" || formInput.name.value === "" || formInput.status.value === "" || formInput.role.value === "") {
        alert("Please select all fields!");
        return;
    }
    if (!confirm("Are you sure you want to add this user?")) return;

    fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            id: formInput.id.value,
            name: formInput.name.value,
            role: formInput.role.value,
            status: formInput.status.value
        })
    }).then(() => getAllUsers());
}

// display given users to the table
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

// clear all inputs
const clearInput = () => {
    getUserFormData();
    Object.keys(formInput).forEach(key => {
        formInput[key].value = ""
    })

}
