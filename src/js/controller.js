import * as todoController from './todoController.js';
import * as todoUIController from './todoUIController.js';

var mode, DOMtodo, clkHandler, btnHandler;
const keyEsc = 27;
const keyEnter = 13;

init();
  
DOMtodo = todoUIController.getDOM();
  
function setupEventListeners() {
  DOMtodo = todoUIController.getDOM();
  
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === keyEnter) {
      addItem();
    }
  })

  document.querySelector(`.${DOMtodo.todoList}`).addEventListener('mouseover', handleMouseOver);
  document.querySelector(`.${DOMtodo.todoList}`).addEventListener('mouseout', handleMouseOut);

  document.querySelector(`.${DOMtodo.todoList}`).addEventListener('click', handleDeleteItemClick);
  document.querySelector(`.${DOMtodo.todoList}`).addEventListener('click', handleChangeStateClick);
  document.querySelector(`.${DOMtodo.todoList}`).addEventListener('dblclick', handleEditTextDbclick);

  document.querySelector(`.${DOMtodo.selectAll}`).addEventListener('click', handleSelectAllClick);
  document.querySelector(`.${DOMtodo.buttonAll}`).addEventListener('click', handleButtonAllClick);
  document.querySelector(`.${DOMtodo.buttonActive}`).addEventListener('click', handleButtonActiveClick);
  document.querySelector(`.${DOMtodo.buttonCompleted}`).addEventListener('click', handleButtonCompletedClick);
  document.querySelector(`.${DOMtodo.buttonClearCompleted}`).addEventListener('click', handleClearCompletedClick);
}

function handleMouseOver() {
  if (event.target.closest(`.${DOMtodo.todoItem}`)) {
    todoUIController.visibleClose(event.target.closest(`.${DOMtodo.todoItem}`).id);
  }
}

function handleMouseOut() {
  todoUIController.hideClose();
}

function handleEditTextDbclick() {
  var itemID, splitID, id, edited, editItem, edit;

  itemID = event.target.parentNode.id;

  if (event.target.classList.contains(`${DOMtodo.todoItemLabel}`)) {
    splitID = itemID.split('-');
    id = parseInt(splitID[1]);
    
    edited = todoUIController.editItem(itemID);
    editItem = edited[0];
    edit = edited[1];

    clkHandler = handlerNoEditClick.bind(null, editItem, edit, id);
    btnHandler = handlerNoEditButton.bind(null, editItem, edit, id);
    window.addEventListener('click', clkHandler);
    window.addEventListener('keydown', btnHandler);
  }
}

function handlerNoEditClick(editItem, edit, id) {
  var text;

  if (!(event.target.classList.contains(`${DOMtodo.todoItemInput}`))) {
    text = edit.value;
     
    todoUIController.saveEdit(editItem, edit);
    todoController.changeText(id, text);
      
    window.removeEventListener('click', clkHandler);
    window.removeEventListener('keydown', btnHandler);
  }
}

function handlerNoEditButton(editItem, edit, id) {
  var text;
  text = edit.value;
    
  if ((event.keyCode === keyEnter) && (document.activeElement === edit)) {
    todoUIController.saveEdit(editItem, edit);
    todoController.changeText(id, text);

    window.removeEventListener('click', clkHandler);
    window.removeEventListener('keydown', btnHandler);

  } else if ((event.keyCode === keyEsc) && (document.activeElement === edit)) {
    todoUIController.noSaveEdit(editItem, edit);

    window.removeEventListener('click', clkHandler);
    window.removeEventListener('keydown', btnHandler);
  }
}

function updateCounter() {
  var count;

  count = todoController.updateCounter();
  todoUIController.updateCounter(count);
}

function handleClearCompletedClick() {
  var completed, itemID;

  completed = todoController.selectCompletedTodos();

  for (var i = 0; i < completed.length; i++) {
    itemID = completed[i].id;
    todoController.deleteItem(itemID);
  }

  updateList();
  displayMode();
}

function updateList() {
  var isSelectAll, todos;

  if (mode === 'All') {
    todos = todoController.selectAllTodos();
  } else if (mode === 'Active') {
    todos = todoController.selectActiveTodos();
  } else if (mode === 'Completed') {
    todos = todoController.selectCompletedTodos();
  }
    
  isSelectAll = todoController.checkSelectAll();
  todoUIController.selectAll(isSelectAll);
  todoUIController.updateTodos(todos);
  todoUIController.changeButtonMode(mode);
  updateCounter();
}

function handleButtonCompletedClick() {
  mode = 'Completed';

  updateList();
}

function handleButtonAllClick() {
  mode = 'All';

  updateList();
}

function handleButtonActiveClick() {
  mode = 'Active';

  updateList();
}

function displayMode() {
  var isEmpty;

  isEmpty = todoController.isEmpty();
  todoUIController.updateDisplayMode(isEmpty);
}

function handleSelectAllClick() {
  var isSelectAll;

  isSelectAll = todoController.selectAll();
  todoUIController.selectAll(isSelectAll);
  updateList();

}

function addItem() {
  var input, newItem;
    
  input = todoUIController.getInput();

  if (input.text !== "") {
    newItem = todoController.addItem(input.text);
    todoUIController.clearInput();

    todoController.changeSelectAll();
    displayMode();
    updateList();
  }
}

function handleDeleteItemClick(event) {
  var itemID, splitID, id;

  itemID = event.target.parentNode.id;
    
  if (event.target.classList.contains(`${DOMtodo.todoItemClose}`)) {
    splitID = itemID.split('-');
    id = parseInt(splitID[1]);

    todoController.deleteItem(id);
    todoUIController.deleteListItem(itemID);

    displayMode();
    updateList();
  }
}

function handleChangeStateClick(event) {
  var itemID, splitID, id;

  itemID = event.target.parentNode.id;

  if (event.target.classList.contains(`${DOMtodo.todoItemCheck}`)) {
    splitID = itemID.split('-');
    id = parseInt(splitID[1]);

    todoController.changeState(id);
    todoController.changeSelectAll();
    todoUIController.changeState(itemID);

    updateList();
  }
}

function LoadData() {
  mode = 'All';
  todoController.LoadData();

  updateList();
  displayMode();
}

function init() {
  LoadData();
  setupEventListeners();
  handleButtonAllClick();
}

