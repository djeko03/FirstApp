let firstName = document.querySelector('.person__name');
let lastName = document.querySelector('.person__lastname');
let tel = document.querySelector('.person__tel');
let age = document.querySelector('.person__age');
let gen = document.querySelector('#memberTrue');
let users = document.querySelector('.users');
let person = document.querySelectorAll('.person');

let addName = document.querySelector('#reUserName');
let addLastName = document.querySelector('#reUserLastName');
let addPhone = document.querySelector('#userPhone');
let addAge = document.querySelector('#userAge');
let addGender = document.querySelector('#memberTrue');

let showBtn = document.querySelector('.btns__start')
let deleteBtn = document.querySelectorAll('.person__delete')
let addBtn = document.querySelector('.add__btn')



// Post

addBtn.addEventListener('click', postRequest)

const obj = {
    name: 'Имя',
    lastName: 'Фамилия',
    phone: 'телефон',
    age: 4,
    gender: 'пол',
}

function postRequest () {
    let reobj = Object.assign({}, obj);
    reobj.name = addName.value
    reobj.lastName = addLastName.value
    reobj.phone = addPhone.value
    reobj.age = addAge.value
    if (gen.checked) {
        reobj.gender = 'мужской';
    } else {reobj.gender = 'женский';}

    axios({
        method: 'POST',
        url: 'http://localhost:5000/api/posts',
        data: {
            name: reobj.name,
            lastName: reobj.lastName,
            phone: reobj.phone,
            age: reobj.age,
            gender: reobj.gender,
        }
    })
    .then((response) => {
        setTimeout(() => {
            document.location.href = 'http://localhost:5000'
        }, 1500);
    })
    .catch((e) => {
        console.log(e.response.data);
        const respDiv = document.querySelector('.response')
        respDiv.innerHTML = e.response.data.message
        respDiv.style.color = 'red'
        respDiv.style.marginTop = '15px'
    })
}
