const URL = 'http://localhost:3000';

async function test() {
    const resp = await fetch(`${URL}/bills/3`);
    const data = await resp.json();
    console.log(data);
}

test();