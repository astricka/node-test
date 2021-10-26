const URL = 'http://localhost:3000/users';

const formEl = document.getElementById('form-register');
const errorEel = document.querySelector('.errorEl');

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
    if (data.error === 'Invalid credentials') {
        const errorEl = document.createElement("h2");
        errorEl.innerText = 'Email exists';
        document.querySelector('.errorEl').appendChild(errorEl);
    }
    if (data.msg === 'bad pass') {
        const errorEl = document.createElement("h2");
        errorEl.innerText = 'Bad credentials';
        document.querySelector('.errorEl').appendChild(errorEl);
    }
    console.log(data);
});

