const URL = 'http://localhost:3000/users';
const loginFormEl = document.getElementById('form-login');

loginFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginFormEl);
    const resp = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = await resp.json();
    if (data.msg === 'login success') {
        localStorage.setItem('loggedInUserToken', data.loggedInUser.token);
        localStorage.setItem('loggedInUserEmail', data.loggedInUser.email);
        location.href = "groups.html";
    }
    console.log(data);
})

