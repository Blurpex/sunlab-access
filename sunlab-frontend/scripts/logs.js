window.onload = () => getAllLogs();

let formInput = { id:"", location:"", startTime:"", endTime:"" }

const getLogFormData = () => {
    formInput.id = document.getElementById("id")
    formInput.location = document.getElementById("location")
    formInput.startTime = document.getElementById("start-time")
    formInput.endTime = document.getElementById("end-time")
}

async function fetchLogs(url) {
    const response = await fetch(url);
    const data = await response.json();
    let logs = data['_embedded']
    displayLogs(logs['logs'])
}

const getAllLogs = () => {
    const url = "http://localhost:8080/logs"
    fetchLogs(url)
}

const searchLog = () => {
    getLogFormData();

    let url = "http://localhost:8080/logs/search/searchLogs?"
    Object.keys(formInput).forEach(paramName => {
        let paramValue = formInput[paramName].value
        if(paramValue !== "") url += `${paramName}=${paramValue}&`
    })
    url = url.slice(0, -1);
    fetchLogs(url);
}

const addLog = async () => {
    getLogFormData();
    let url = "http://localhost:8080/users/search/searchUsers?id=" + formInput.id.value
    const response = await fetch(url);
    const data = await response.json();
    let users = data['_embedded']
    let user = (users['users'])[0]
    console.log(user)

    fetch("http://localhost:8080/logs", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            id: user,
            location: "IN",
            time: new Date(),
        })
    }).then(() => getAllLogs())
}

const displayLogs = (logs) => {
    let tableBody = document.getElementById("log-table")
    tableBody.innerHTML = ""
    logs.forEach(log => {
        tableBody.innerHTML +=
            `<tr>
                <td>${log.id}</td>
                <td>${log.location}</td>
                <td>${log.time}</td>
            </tr>`
    })
}

const clearInput = () => {
    getLogFormData();
    Object.keys(formInput).forEach(key => {
        formInput[key].value = ""
    })
}