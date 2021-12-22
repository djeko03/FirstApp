let firstName = document.querySelector('.person__name');
let lastName = document.querySelector('.person__lastname');
let tel = document.querySelector('.person__tel');
let age = document.querySelector('.person__age');
let gen = document.querySelector('#memberTrue');
let users = document.querySelector('.users');
let usersSearch = document.querySelector('.usersSearch')
let person = document.querySelectorAll('.person');
let usersInner = users.children

let addName = document.querySelector('#reUserName');
let addLastName = document.querySelector('#reUserLastName');
let addPhone = document.querySelector('#userPhone');
let addAge = document.querySelector('#userAge');
let addGender = document.querySelector('#memberTrue');

let showBtn = document.querySelector('.btns__logIn');
let del = document.createElement('button');

let searchInput = document.querySelector('#search');
let startBtn = document.querySelector('#searchStart');

let cabinet = document.querySelector('.cabinet')



 function sayHello() {
     axios.get('http://localhost:5000/auth/users')
    .then((res) => {
        console.log(res);
        const cabName = document.querySelector('.cabinet__name')
        const cabLastName = document.querySelector('.cabinet__lastname')
        const cabPhone = document.querySelector('.cabinet__phone')
        if(res.data[0].roles === "ADMIN") {
            cabName.innerHTML += 'Server'
            cabLastName.innerHTML += 'Admin'
            cabPhone.innerHTML += '-'
        } else {
            cabName.innerHTML += res.data[0].name
            cabLastName.innerHTML += res.data[0].lastname
            cabPhone.innerHTML += res.data[0].phone
        }
    })
    .catch((e) => {
        console.log(e);
    })
}
sayHello()





function getRequest () {
    axios.get('http://localhost:5000/api/posts')
.then(({data}) => {
    for (const key in data) {
        users.insertAdjacentHTML('beforeend',
            `<div class="person"> 
            <div class="person__table">
                <div class="person__attributes">
                    <span>Имя</span>
                    <span>Фамилия</span>
                    <span>Телефон</span>
                    <span>Возраст</span>
                    <span>Пол</span>
                </div>
                <div class="person__data">
                    <input class="person__name" autocomplete="none" type="text" value="${data[key].name}"> 
                    <input class="person__lastname" autocomplete="none" type="text" value="${data[key].lastName}"> 
                    <input class="person__tel" autocomplete="none" type="text" value="${data[key].phone}"> 
                    <input class="person__age" autocomplete="none" type="text" value="${data[key].age}"> 
                    <input class="person__gen" autocomplete="none" type="text" value="${data[key].gender}"> 
                </div>
            </div>
            <button class="person__put">V</button>
            <button class="person__delete">X</button>
            </div>`
            );
            let usersLast = users.lastElementChild
            let delBtn = usersLast.lastElementChild
            let firstName = document.querySelector('.person__name');
            let lastName = document.querySelector('.person__lastname');
            let tel = document.querySelector('.person__tel');
            let age = document.querySelector('.person__age');
            let gen = document.querySelector('.person__gen');


         
            const cabName = document.querySelector('.cabinet__name')
            if(cabName.innerHTML.length == 5) {
                
                const addBtn = document.querySelectorAll('.btns__add');
                addBtn[0].style.display = 'none'
                
            }
            if(cabName.innerHTML === "name:Server") {
                delBtn.style.display = 'block'
                usersLast.children[1].style.display = 'block'
            }
            

            
            usersLast.children[1].addEventListener('click', () =>{
                
                axios.put('http://localhost:5000/api/posts', {_id: data[key]._id, name: String(firstName.value), lastName: String(lastName.value), phone: String(tel.value), age: Number(age.value), gender: String(gen.value)})
                .then(({data}) => {
                    console.log(data);
                }) 
                .catch((e) => {
                    console.log(e);
                })
            })



            delBtn.addEventListener('click', () => {
                let url = 'http://localhost:5000/api/posts/' + data[key]._id;
                axios.delete(url)
                .then((res) => {
                    console.log(res.status)
                })
                .catch((e) => {
                    console.log(e);
                })
                usersLast.remove()
            })
    }

showBtn.removeEventListener('click', getRequest)
})
.catch((e) => {
    console.log(e);
})
}

getRequest ()

// SEARCH

startBtn.addEventListener('click', findItem)

function findItem() {
    axios.get('http://localhost:5000/api/posts')
    .then(({data}) => {
        users.remove()
            data.forEach(item => {
                if (item.name === searchInput.value || item.lastName === searchInput.value) {
                    usersSearch.insertAdjacentHTML('beforeend',
                    `<div class="person"> 
            <div class="person__table">
                <div class="person__attributes">
                    <span>Имя</span>
                    <span>Фамилия</span>
                    <span>Телефон</span>
                    <span>Возраст</span>
                    <span>Пол</span>
                </div>
                <div class="person__data">
                    <input class="person__name" autocomplete="none" type="text" value="${item.name}"> 
                    <input class="person__lastname" autocomplete="none" type="text" value="${item.lastName}"> 
                    <input class="person__tel" autocomplete="none" type="text" value="${item.phone}"> 
                    <input class="person__age" autocomplete="none" type="text" value="${item.age}"> 
                    <input class="person__gen" autocomplete="none" type="text" value="${item.gender}"> 
                </div>
            </div>
            <button class="person__put">V</button>
            <button class="person__delete">X</button>
            </div>`
                    );
                }
            });
        

    startBtn.removeEventListener('click', findItem)
    })
    .catch((e) => {
        console.log(e);
    })
}



