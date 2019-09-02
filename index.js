//reflection of a dom
const VACATION_DOM = {
  vacation_name: document.getElementById('vacation_name'),
  vacation_image: document.getElementById('vacation_image'),
  vacation_price: document.getElementById('vacation_price'),
  vacation_raiting: document.getElementById('vacation_raiting'),
  vacation_save_btn: document.getElementById('save-btn'),
  vacation_insert: document.getElementById('insert_card'),
  vacation_form: document.getElementById('create_vacation_form')
};
let arrayOfData;
// function constructor
function Vacation(_name, _image, _price, _raiting) {
  this.vacation_name = _name;
  this.vacation_image = _image;
  this.vacation_price = _price;
  this.vacation_raiting = _raiting;
  this.likeCounter = 0;
  this.vacation_id = Math.floor(Math.random() * 10000);
}
//draw
function draw(data) {
  clearTable();
  for (let i = 0; i < data.length; i++) {
    drawRow(data[i]);
  }
}
//draw row
function drawRow(vacation) {
  const { vacation_insert } = VACATION_DOM;
  const vacationCOL = createVacationDivCol(vacation);
  if (!vacationCOL) return;
  vacation_insert.append(vacationCOL);
}
// draw col
function createVacationDivCol(vacation) {
  //validate
  const {
    vacation_name,
    vacation_image,
    vacation_price,
    vacation_raiting
  } = vacation;
  if (!vacation_name || !vacation_image || !vacation_price || !vacation_raiting)
    return;
  //create a col
  const divCol = document.createElement('div');
  divCol.id = vacation_name;
  divCol.classList.add('col-12', 'col-md-4', 'mt-2', 'text-center', 'mb-3');
  //create a card
  const divCard = document.createElement('div');
  divCard.classList.add('card');
  //append card to col
  divCol.append(divCard);
  //create a card img
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.src = vacation_image;
  img.style.width = '100%';
  img.style.height = '200px';
  divCard.append(img);
  //call for a function to create card
  const card = createVacationDivBody(vacation);
  divCard.append(card);
  return divCol;
}

function createVacationDivBody(vacation) {
  //validate
  const {
    vacation_name,
    vacation_image,
    vacation_price,
    vacation_raiting,
    likeCounter
  } = vacation;
  if (!vacation_name || !vacation_image || !vacation_price || !vacation_raiting)
    return;
  //create a card body
  const divBody = document.createElement('div');
  divBody.classList.add('card-body');

  //create card body elements
  //DELETE BUTTON
  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn', 'btn-danger', 'btn-delete');
  btnDelete.innerText = 'Delete';
  btnDelete.addEventListener('click', deleteBtnHandler);
  //LIKE BUTTON
  const btnLike = document.createElement('button');
  btnLike.classList.add('btn', 'btn-success', 'ml-3', 'btn-like');
  btnLike.innerText = 'Like ' + '| ' + likeCounter;
  btnLike.addEventListener('click', likeBtnHandler);
  //create header
  const h3 = document.createElement('h3');
  h3.innerText = vacation_name;
  //create vacation raiting and price
  const p = document.createElement('p');
  p.classList.add('card-text');
  p.innerText = vacation_price + '$ | ' + vacation_raiting;

  const icons = document.createElement('div');
  icons.innerHTML = amountOfStars(vacation_raiting);

  divBody.append(h3, p, icons, btnDelete, btnLike);

  return divBody;
}
function amountOfStars(raiting) {
  switch (raiting) {
    case 'bad':
      return '<i class="icon ion-md-heart"></i>';
    case 'regular':
      return '<i class="icon ion-md-heart"></i><i class="icon ion-md-heart"></i>';
    case 'good':
      return '<i class="icon ion-md-heart"></i><i class="icon ion-md-heart"></i><i class="icon ion-md-heart"></i>';
    case 'excellent':
      return '<i class="icon ion-md-heart"></i><i class="icon ion-md-heart"></i><i class="icon ion-md-heart"></i><i class="icon ion-md-heart"></i>';
    default:
      return 'something wrong';
  }
}
//delete vacation
function deleteBtnHandler() {
  const vacationIndexToDelete = findIndex(
    arrayOfData,
    this.parentElement.parentElement.parentElement.id
  );
  if (vacationIndexToDelete === undefined) return;
  arrayOfData.splice(vacationIndexToDelete, 1);
  saveToLocalStorage('vacationsData', arrayOfData);
  draw(arrayOfData);
}
//like vacation
function likeBtnHandler() {
  const vacationIndexToDelete = findIndex(
    arrayOfData,
    this.parentElement.parentElement.parentElement.id
  );
  if (vacationIndexToDelete === undefined) return;
  arrayOfData[vacationIndexToDelete].likeCounter++;
  saveToLocalStorage('vacationsData', arrayOfData);
  draw(arrayOfData);
}
//find index in array
function findIndex(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].vacation_name === id) {
      return i;
    }
  }
}
//clear data
function clearTable() {
  VACATION_DOM.vacation_insert.innerHTML = '';
}
//save form input
VACATION_DOM.vacation_save_btn.addEventListener('click', function() {
  const {
    vacation_name,
    vacation_image,
    vacation_price,
    vacation_raiting,
    vacation_form
  } = VACATION_DOM;
  if (
    !vacation_name.value ||
    !vacation_image.value ||
    !vacation_price.value ||
    !vacation_raiting.value
  ) {
    alert('have to fill all the data');
    return;
  }
  arrayOfData.push(
    new Vacation(
      vacation_name.value,
      vacation_image.value,
      vacation_price.value,
      vacation_raiting.value
    )
  );
  saveToLocalStorage('vacationsData', arrayOfData);
  draw(arrayOfData);
  vacation_form.reset();
});
//save to local storage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//init
function init() {
  arrayOfData = JSON.parse(localStorage.getItem('vacationsData')) || [];
  draw(arrayOfData);
}
init();
