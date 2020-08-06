import * as todoController from './todoController.js';
import * as todoUIController from './todoUIController.js';

var mode, DOMtodo, clkHandler, btnHandler;

init();
  
DOMtodo = todoUIController.getDOM();
  
function setupEventListeners() {
  DOMtodo = todoUIController.getDOM();

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      addItem();
    }
  })

  document.querySelector(DOMtodo.todoList).addEventListener('mouseover', handleMouseOver);
  document.querySelector(DOMtodo.todoList).addEventListener('mouseout', handleMouseOut);

  document.querySelector(DOMtodo.todoList).addEventListener('click', deleteItem);
  document.querySelector(DOMtodo.todoList).addEventListener('click', changeState);
  document.querySelector(DOMtodo.todoList).addEventListener('dblclick', editText);

  document.querySelector(DOMtodo.selectAll).addEventListener('click', selectAllHandler);
  document.querySelector(DOMtodo.buttonAll).addEventListener('click', buttonAllHandler);
  document.querySelector(DOMtodo.buttonActive).addEventListener('click', buttonActiveHandler);
  document.querySelector(DOMtodo.buttonCompleted).addEventListener('click', buttonCompletedHandler);
  document.querySelector(DOMtodo.buttonClearCompleted).addEventListener('click', buttonClearCompletedHandler);
}

function handleMouseOver() {
  if (event.target.closest('.todo-item')) {
    todoUIController.visibleClose(event.target.closest('.todo-item').id);
  }
}

function handleMouseOut() {
  todoUIController.hideClose();
}

function editText() {
  var itemID, splitID, id, edited, editItem, edit;

  itemID = event.target.parentNode.id;

  if (event.target.classList.contains(DOMtodo.todoItemLabel)) {
    splitID = itemID.split('-');
    id = parseInt(splitID[1]);
    
    edited = todoUIController.editItem(itemID);
    editItem = edited[0];
    edit = edited[1];

    clkHandler = clickHandler.bind(null, editItem, edit, id);
    btnHandler = buttonHandler.bind(null, editItem, edit, id);
    window.addEventListener('click', clkHandler);
    window.addEventListener('keydown', btnHandler);
  }
}

function clickHandler(editItem, edit, id) {
  var text;

  if (!(event.target.classList.contains(DOMtodo.todoItemInput))) {
    text = edit.value;
     
    todoUIController.saveEdit(editItem, edit);
    todoController.changeText(id, text);
      
    window.removeEventListener('click', clkHandler);
    window.removeEventListener('keydown', btnHandler);
  }
}

function buttonHandler(editItem, edit, id) {
  var text = edit.value;
    
  if ((event.keyCode === 13) && (document.activeElement === edit)) {
    todoUIController.saveEdit(editItem, edit);
    todoController.changeText(id, text);

    window.removeEventListener('click', clkHandler);
    window.removeEventListener('keydown', btnHandler);

  } else if ((event.keyCode === 27) && (document.activeElement === edit)) {
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

function buttonClearCompletedHandler() {
  var completed, itemID;

  completed = todoController.selectCompletedTodos();

  for (var i = 0; i < completed.length; i++) {
    itemID = completed[i].id;
    todoController.deleteItem(itemID);
  }

  updateList();
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
  todoUIController.updateTodos(todos, mode);
  todoUIController.changeButtonMode(mode);
  updateCounter();
}

function buttonCompletedHandler() {
  mode = 'Completed';

  updateList();
}

function buttonAllHandler() {
  mode = 'All';

  updateList();
}

function buttonActiveHandler() {
  mode = 'Active';

  updateList();
}

function displayMode() {
  var isEmpty;

  isEmpty = todoController.isEmpty();
  todoUIController.updateDisplayMode(isEmpty);
}

function selectAllHandler() {
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

function deleteItem(event) {
  var itemID, splitID, id;

  itemID = event.target.parentNode.id;
    
  if (event.target.classList.contains(DOMtodo.todoItemClose)) {
    splitID = itemID.split('-');
    id = parseInt(splitID[1]);

    todoController.deleteItem(id);
    todoUIController.deleteListItem(itemID);

    displayMode();
    updateList();
  }
}

function changeState(event) {
  var itemID, splitID, id;

  itemID = event.target.parentNode.id;

  if (event.target.classList.contains(DOMtodo.todoItemCheck)) {
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
  buttonAllHandler();
}

