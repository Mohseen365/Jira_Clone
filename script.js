// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
// const { 
//   v1: uuidv1,
//   v4: uuidv4,
// } = require('uuid');

var uid = new ShortUniqueId(); //we have not installed npm so we use cdn for browser in index.html

const addBtn = document.querySelector('.add-btn');
const modalContainer = document.querySelector('.modal-container')
const textareaContainer = document.querySelector('.textarea-container');
const allPriorityColors = document.querySelectorAll('.priority-color');
const mainContainer = document.querySelector('.main-container');

const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1];
var isModalPresent = false;

addBtn.addEventListener('click', function ( ) {
  if (isModalPresent == false) {
    modalContainer.style.display = 'flex';
    isModalPresent = true;
  } else {
    modalContainer.style.display = 'none';
    isModalPresent = false;
  }
});

textareaContainer.addEventListener('keydown', function ( event ) {
  if (event.key == 'Shift') {
    console.log('textareaContainer : ', textareaContainer.value);
    createTicket();
    modalContainer.style.display = 'none';
    isModalPresent = false;
    textareaContainer.value = '';
  }
});
allPriorityColors.forEach(colorElement => {
  colorElement.addEventListener('click', function () {
    allPriorityColors.forEach(color => {
      color.classList.remove("active");
    });
    
    colorElement.classList.add("active"); //classlist is used to add custom class in elements
    modalPriorityColor = colorElement.classList[0];
  });

});


function createTicket() {
  var value = textareaContainer.value;
  var color = modalPriorityColor;
  var id = uid();

  var ticketContainer = document.createElement('div');
  ticketContainer.setAttribute('class', 'ticket-container');
  ticketContainer.innerHTML = `
    <div class = "ticket-color ${color}"></div>
    <div class = "ticket-id">#${id}</div>
    <div class = "task-area">${value}</div>
    <div class = "ticket-lock">
      <i class="fa-solid fa-lock"></i>
    </div>
  `;
  mainContainer.appendChild(ticketContainer);
}


