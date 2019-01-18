const DOG_API = 'http://localhost:3000/dogs/';
const tableBodyEl = document.querySelector('#table-body');
const dogFormEl = document.querySelector('#dog-form');
const inputNameEl = document.querySelector('[name="name"]');
const inputBreedEl = document.querySelector('[name="breed"]');
const inputSexEl = document.querySelector('[name="sex"]');

function init() {
  allDogs()
  editDog()
}


function dogApi() {
  return fetch(DOG_API)
    .then(response => response.json())
}

function allDogs() {
  dogApi().then(data => {
    data.forEach(dog => {
      tableBodyEl.innerHTML += renderDog(dog);
    })
  })
}

function renderDog(dog) {
  return `<tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-id="${dog.id}" class="edit-btn">Edit</button></td>
          </tr>`
}
function editDog() {
  document.addEventListener('click', (e) => {
    if (e.target.className === "edit-btn") {
      let id = e.target.dataset.id
      fetch(DOG_API + `${id}`)
      .then(res => res.json())
      .then(data => {
          inputNameEl.value = data.name;
          inputBreedEl.value = data.breed;
          inputSexEl.value = data.sex;
          dogFormEl.dataset.id = data.id;
          dogFormEl.addEventListener('submit', (event) => {
            event.preventDefault();
            tableBodyEl.innerHTML = '';
            const newData = {
              name: inputNameEl.value,
              breed: inputBreedEl.value,
              sex: inputSexEl.value,
              id: data.id
            }
          editDogToApi(newData);
          dogFormEl.reset();
        })
      })
      }
  })
}

function editDogToApi(dog) {
  return fetch(DOG_API + `${dog.id}`, {
    method: 'PATCH',
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(dog)
  }).then(res => res.json()).then(allDogs)
  dogFormEl.removeEventListener('click', editDog)
}

document.addEventListener('DOMContentLoaded', init)
