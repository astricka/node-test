const URL = 'http://localhost:3000';
const billsContainerEl = document.querySelector('.table-container');
const billFormEl = document.getElementById('form-bill');

billFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formData = new FormData(billFormEl);
    const resp = await fetch(`${URL}/bills`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await resp.json();
    console.log(data);
});

async function fetchData() {
    const resp = await fetch(`${URL}/bills/`+groupsId);
    const data = await resp.json();
    return data.dbResult;
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const groupsId = params.groupsId;

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