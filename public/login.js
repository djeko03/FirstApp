
const username = document.querySelector('#UserName')
const userpassword = document.querySelector('#UserPassword')
const entranceBtn = document.querySelector('.add__entrance')
const registrationDiv = document.querySelector('.registration')
const loginDiv = document.querySelector('.add__login')
const loginStatus = document.querySelector('.add__login-status')




function getLogin() {
    axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/login',
        data: {
            username: username.value,
            password: userpassword.value,
        }
    })
    .then((response) => {
        console.log(response);
        loginStatus.innerHTML = "Добро пожаловать"
        loginStatus.style.color = 'blue'
        loginStatus.style.fontSize = '30px'
        setTimeout(() => {
            document.location.href = 'http://localhost:5000'
        }, 1500);
    })
    .catch((e) => {
        console.log(e.response);
        loginStatus.style.color = 'red'
        loginStatus.innerHTML += e.response.data.message
    })
}




entranceBtn.addEventListener('click', getLogin)







