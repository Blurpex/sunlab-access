// create an object to store the references to user inputs
let userInputs = { userId:'', name:'', role:'', status:'' };
let logInputs = { logId:'', location:'', startTime:'', endTime:'' };

// find what page the user is on
window.onload = (e) => {
    let page = window.location.href;
    if(page.includes('users')) setEventListener(userInputs)
    else if(page.includes('logs')) setEventListener(logInputs)
}

// set event listener for given inputs
const setEventListener = (inputs) => {
    Object.keys(inputs).forEach(key => {
        document.getElementById(key).addEventListener('input', (event) =>
            inputs[key] = event.target.value
        );
    });
}

// create url for user and log
const userUrl = 'http://localhost:8080/users/search/searchUsers?';
const logUrl = 'http://localhost:8080/logs/search/searchLogs?';

// handle when user searches for data
const search = (values, url, table) => {
    Object.keys(values).forEach(paramName => {
        let paramValue = values[paramName];
        if(paramValue !== '') url += `${paramName}=${paramValue}&`
    })
    url = url.slice(0, -1);
    fetchUrl(url).then(result =>
        displayData(result, document.getElementById(table))
    )
}

// fetch data from a given url
const fetchUrl = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded[Object.keys(data._embedded)[0]];
}

// display given data to a given table
const displayData = (data, table) => {
    let tableHTML = '';
    data.forEach(row => {
        let block = `<tr>`
        const keys = Object.keys(row);
        for (let i = 0; i < keys.length-1; i++)
            block += `<td>${row[keys[i]]}`
        block += `</tr>`
        tableHTML += block
    });
    table.innerHTML = tableHTML;
}

// add a user from inputs
const addUser = () => {
    if (userInputs.userId === '' || userInputs.name === '' || userInputs.status === '' || userInputs.role === '') {
        alert('Please select all fields!');
        return;
    }
    if (!confirm('Are you sure you want to add this user?')) return;
    fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            id: userInputs.userId,
            name: userInputs.name,
            role: userInputs.role,
            status: userInputs.status
        })
    }).then(() => alert('User ' + userInputs.name + ' was added'));
}

// clear user input
const clearInput = (input) => {
    Object.keys(input).forEach(key =>
        document.getElementById(key).value = ''
    );
}
