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
    const data = resp.json();
    if (data.msg === 'success') {
        location.href = "login.html";
    }
    console.log(data);
});