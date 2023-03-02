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
const removeBtn = document.querySelector('.fa-xmark')
const toolBoxColors = document.querySelectorAll('.toolbox-color-container>*');

const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1];
var isModalPresent = false;
var isRemoveBtnActive = false;
var ticketsArr = [];

//display modal container
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
    createTicket(modalPriorityColor, textareaContainer.value);
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


function createTicket(ticketColor, data, ticketId) {
  //generate uid
  var id = ticketId || uid();

  var ticketContainer = document.createElement('div');
  ticketContainer.setAttribute('class', 'ticket-container');
  ticketContainer.innerHTML = `
    <div class = "ticket-color ${ticketColor}"></div>
    <div class = "ticket-id">#${id}</div>
    <div class = "task-area">${data}</div>
    <div class = "ticket-lock">
      <i class="fa-solid fa-lock"></i>
    </div>
  `;

  mainContainer.appendChild(ticketContainer);
  //if ticket is generated first time than we will store in local Storage
  if (!ticketId) {
    ticketsArr.push({
      ticketId: id,
      ticketColor, //i can put variables without key value pair
      ticketTask: data,
    });
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  }

  handleRemoval(ticketContainer, id);
  
}

// In case of rerendering we take out data from local Storage
if (localStorage.getItem("tickets")) {
  ticketsArr = JSON.parse(localStorage.getItem("tickets"));
  ticketsArr.forEach(ticketObj => createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId));
  
}

// Change the color of Remove button on clicking
removeBtn.addEventListener('click', function () {
  if (!isRemoveBtnActive) {
    isRemoveBtnActive = true;
    removeBtn.style.color = 'red';
  } else {
    isRemoveBtnActive = false;
    removeBtn.style.color = 'white';
  }
})


for (let i = 0; i < toolBoxColors.length; i++) {
  //display ticket on the basis of color selected in toolbox color container
  toolBoxColors[i].addEventListener('click', function () {
    let currentColor = toolBoxColors[i].classList[0];
    //filter tickets which we need to display 
    let filteredTickets = ticketsArr.filter(ticketObj => 
      ticketObj.ticketColor == currentColor
    );
    //select all tickets displayed in maincontainer and remove them
    let allTickets = document.querySelectorAll('.ticket-container');
    allTickets.forEach((ticket) => ticket.remove());

    //display filtered tickets
    filteredTickets.forEach((ticket) => createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId));
  });
  //display all ticket on the basis of double click in toolbox color container
  toolBoxColors[i].addEventListener('dblclick', function() {
    //remove tickets shown of specific color
    let allTickets = document.querySelectorAll('.ticket-container');
    allTickets.forEach((ticket) => ticket.remove());
    //show all tickets
    ticketsArr.forEach((ticket) => createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId));
  })
}

function handleRemoval (ticketContainer, id) {
  ticketContainer.addEventListener('click', function () {
    if (!isRemoveBtnActive) {
      return;
    }
    let idx = getTicketIdx(id);
    ticketsArr.splice(idx, 1);
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    ticketContainer.remove();
  });
}

function getTicketIdx(id) {
  let idx = ticketsArr.findIndex((ticketObj) => ticketObj.ticketId == id);
  return idx;
}