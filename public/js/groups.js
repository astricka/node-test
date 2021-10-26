const URL = 'http://localhost:3000';
const groupsContainer = document.querySelector('.container');
const groupFormEl = document.querySelector('#form-group');

async function fetchData() {
    const token = localStorage.getItem('loggedInUserToken');

    const resp = await fetch(`${URL}/accounts`, {
        method: "GET",
        headers: {
            Authorizations: `Bearer ${token}`,
        },
    });
    const data = await resp.json();
    return data.dbResult

}

function generatePosts(arr, dest) {
    dest.innerHTML = arr.map(group => `
    <div ${group.id} class="card">
        <h3>ID: ${group.id}</h3>
        <h6>${group.name}</h6>
    </div>
    `).join('');
}

groupFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(groupFormEl);
    const resp = await fetch(`${URL}/groups`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await resp.json();
    console.log(data);
});

async function init() {
    const dataArr = await fetchData();
    generatePosts(dataArr, groupsContainer);
}

init();
