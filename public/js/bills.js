const URL = 'http://localhost:3000';
const billsContainerEl = document.querySelector('.table-container');
const billFormEl = document.getElementById('form-bill');

async function addBill() {
    const resp = fetch(`${URL}/bills`, {

    });
}

async function fetchData() {
    const resp = await fetch(`${URL}/bills/`+groupsId);
    const data = await resp.json();
    console.log(data.dbResult[0]);
    return data.dbResult;
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log('params', params);

const groupsId = params.groupsId;

console.log('groupId', groupsId);

function generateBills(arr, dest) {

    dest.innerHTML = arr.map(bill => `
        <tr class="table-content">
            <td>${bill.id}</td>
            <td>${bill.description}</td>
            <td>${bill.amount}</td>
        </tr>   
    `).join('');
}

async function init() {
    const data = await fetchData();
    generateBills(data, billsContainerEl);
}

init();