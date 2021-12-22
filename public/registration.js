const registrationLogin = document.querySelector('.registration__login')
const registrationPassword = document.querySelector('.registration__password')
const registrationName = document.querySelector('.registration__name')
const registrationLastname = document.querySelector('.registration__lastname')
const registrationPhone = document.querySelector('.registration__phone')
const registrationCompleteBtn = document.querySelector('.registration__btn')
const registrationStatus = document.querySelector('.registration__status')


function getRegistration() {
    axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/registration',
        data: {
            username: registrationLogin.value,
            password: registrationPassword.value,
            phone: registrationPhone.value,
            name: registrationName.value,
            lastname: registrationLastname.value,

        }
    })
    .then((response) => {
            registrationStatus.innerHTML += response.data.message
    })
    .catch((e) => {
        registrationStatus.style.color = 'red'
        registrationStatus.innerHTML += e.response.data.message + `: ${e.response.data.errors.errors[0].msg}.`
    })
}



registrationCompleteBtn.addEventListener('click', getRegistration)