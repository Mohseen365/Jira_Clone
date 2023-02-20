const addBtn = document.querySelector('.add-btn');
const modalContainer = document.querySelector('.modal-cont')
const textareaContainer = document.querySelector('.textarea-cont');

var isModalPresent = false;

addBtn.addEventListener('click', showModalContainer);
textareaContainer.addEventListener('keydown', createTask)

function showModalContainer( event ) {
  console.log('event : ', event);
  if (isModalPresent == false) {
    modalContainer.style.display = 'flex';
    isModalPresent = true;
  } else {
    modalContainer.style.display = 'none';
    isModalPresent = false;
  }
}

function createTask ( event ) {
  if (event.key == 'Shift') {
    console.log('textareaContainer : ', textareaContainer.value);
    createTicket();
    modalContainer.style.display = 'none';
    isModalPresent = false;
    textareaContainer.value = '';
  }
}