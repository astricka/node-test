const URL = 'http://localhost:3000/users';

const formEl = document.getElementById('form-register');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const resp = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await resp.json();
    if (data.msg === 'success') {
        location.href = "login.html";
    }

    if (data.msg === 'bad pass') {
        const errorEl = document.createElement("h2");
        errorEl.innerText = `Pass don't match`;
        document.querySelector('.errorEl').appendChild(errorEl);
    }
    console.log(data);
});

