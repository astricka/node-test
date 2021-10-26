const URL = 'http://localhost:3000';
const groupsContainer = document.querySelector('.container');
const groupFormEl = document.querySelector('#form-group');

async function fetchData() {
    const token = localStorage.getItem('loggedInUserToken');

    const resp = await fetch(`${URL}/accounts`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await resp.json();
    return data.dbResult

}

function generateGroups(arr, dest) {
    dest.innerHTML = arr.map(group => `
    <div class="card">
        <h3><a href="bills.html?groupsId=${group.id}">ID: ${group.id}</h3>
        <h6>${group.name}</h6>
    </div>
    `).join('');
}

groupFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('loggedInUserToken');
    const formData = new FormData(groupFormEl);
    const resp = await fetch(`${URL}/accounts`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await resp.json();
    if (data.msg === 'Success') {
        location.reload();
    }
    console.log(data);
});

async function init() {
    const dataArr = await fetchData();
    generateGroups(dataArr, groupsContainer);
}

init();
