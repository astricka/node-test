const URL = 'http://localhost:3000';
const groupsContainer = document.querySelector('.container');

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
    <div class="card">
        <h3>ID: ${group.id}</h3>
        <h6>${group.name}</h6>
    </div>
    `).join('');
}

async function init() {
    const dataArr = await fetchData();
    generatePosts(dataArr, groupsContainer);
}

init()
