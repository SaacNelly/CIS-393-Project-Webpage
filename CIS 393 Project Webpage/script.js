function insertUser() 
{
    const data = 
    { 
        name: document.getElementById('name').value, 
        age: document.getElementById('age').value, 
        dob: document.getElementById('dob').value 
    };

    console.log("insertUser() data: " + data.name);

    fetch('http://localhost:5500/users', 
    { method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => document.getElementById('result').innerText = JSON.stringify(data))
        .catch(error => console.error('Error:', error));
}

function updateUser() 
{
    const data = 
    {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        dob: document.getElementById('dob').value
    };

    fetch('http://localhost:5500/users/update', 
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => document.getElementById('result').innerText = 'User updated successfully')
    .catch(error => console.error('Error:', error));
}

function deleteUser() 
{
    const name = document.getElementById('name').value;

    fetch(`http://localhost:5500/users/delete/${name}`, 
    {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => document.getElementById('result').innerText = 'User deleted successfully')
    .catch(error => console.error('Error:', error));
}

function searchUser() 
{
    const name = document.getElementById('name').value;

    fetch(`http://localhost:5500/users/${name}`, 
    {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => document.getElementById('result').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
}

function displayUsers() 
{
    fetch('http://localhost:5500/users', 
    {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => document.getElementById('result').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
}

