var DOMtodo =  {
    todoInput: '.js-new-todo',
    todoList: '.js-todo-list',
    selectAll: '.js-select-all',
    counter: '.js-counter',
    footer: '.js-footer',
    clearCompleted: '.js-button_clear-сompleted',
    todoItem: 'todo-item',
    todoItemClose: 'js-todo-item__close',
    todoItemLabel: 'js-todo-item__label',
    todoItemCheck: 'js-todo-item__check',
    todoItemDone: 'todo-item_done',
    todoItemInput: 'todo-item__input',
    todoItemLabelDone: 'todo-item__label_done',
    buttonAll: '.js-button_all',
    buttonActive: '.js-button_active',
    buttonCompleted: '.js-button_completed',
    buttonClearCompleted: '.js-button_clear-сompleted',
    footerVisible: 'footer_visible',
    buttonSelected: 'button_selected',
    selectAllVisible: 'select-all_visible',
    selectAllChecked: 'select-all_checked',
    todoItemLabelEdited: 'todo-item__label_edited',
    todoItemCheckEdited: 'todo-item__check_edited',
    todoItemCloseEdited: 'todo-item__close_edited',
    todoItemEdited: 'todo-item_edited'
};

function getDOM() {
    return DOMtodo;
}

function getInput() {
  return {
    text: document.querySelector(DOMtodo.todoInput).value
  }
}

function addListItem(obj) {
  var element, html, newHtml;

  element = DOMtodo.todoList;

  if (obj.isActive === true) {
    html = '<li class="todo-item" id="todo-%id%">\
    <div class="todo-item__check js-todo-item__check"></div>\
    <label class="todo-item__label js-todo-item__label">%text%</label>\
    <div class="todo-item__close js-todo-item__close"></div></li>';
  }
  else {
    html = '<li class="todo-item todo-item_done" id="todo-%id%">\
    <div class="todo-item__check js-todo-item__check"></div>\
    <label class="todo-item__label js-todo-item__label todo-item__label_done">%text%</label>\
    <div class="todo-item__close js-todo-item__close"></div></li>';
  }

  newHtml = html.replace('%id%', obj.id);
  newHtml = newHtml.replace('%text%', obj.text);
  document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  }

function deleteListItem(itemID) {
  var element = document.getElementById(itemID);

  element.parentNode.removeChild(element);
  }

function clearInput() {
  document.querySelector(DOMtodo.todoInput).value = "";
  }

function changeState(itemID) {
  var todoItem, todoItemLabel;

  todoItem = document.getElementById(itemID);
    
  todoItemLabel = todoItem.querySelector('.todo-item__label');

  todoItem.classList.toggle(DOMtodo.todoItemDone);
  todoItemLabel.classList.toggle(DOMtodo.todoItemLabelDone);
  }

function selectAll(isSelectAll) {
  if (isSelectAll === true) {
    document.querySelector(DOMtodo.selectAll).classList.add(DOMtodo.selectAllChecked);
  }
  else {
    document.querySelector(DOMtodo.selectAll).classList.remove(DOMtodo.selectAllChecked);
  }
}

function updateDisplayMode(isEmpty) {
  if (isEmpty === true) {
    document.querySelector(DOMtodo.selectAll).classList.remove(DOMtodo.selectAllVisible);
    document.querySelector(DOMtodo.footer).classList.remove(DOMtodo.footerVisible);
  }
  else {
    document.querySelector(DOMtodo.selectAll).classList.add(DOMtodo.selectAllVisible);
    document.querySelector(DOMtodo.footer).classList.add(DOMtodo.footerVisible);
  }
}

function updateTodos(todos, mode) {

  var list = document.querySelector(DOMtodo.todoList);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (var i = 0; i < todos.length; i++) {
    addListItem(todos[i]);
  }
}

function changeButtonMode(mode) {
  if (mode === 'All') {
    document.querySelector(DOMtodo.buttonAll).classList.add(DOMtodo.buttonSelected);
    document.querySelector(DOMtodo.buttonActive).classList.remove(DOMtodo.buttonSelected);
    document.querySelector(DOMtodo.buttonCompleted).classList.remove(DOMtodo.buttonSelected);
  }
  else if (mode === 'Active') {
    document.querySelector(DOMtodo.buttonAll).classList.remove(DOMtodo.buttonSelected);
    document.querySelector(DOMtodo.buttonActive).classList.add(DOMtodo.buttonSelected);
    document.querySelector(DOMtodo.buttonCompleted).classList.remove(DOMtodo.buttonSelected);
  }
  else if (mode === 'Completed') {
    document.querySelector(DOMtodo.buttonAll).classList.remove(DOMtodo.buttonSelected);
    document.querySelector(DOMtodo.buttonActive).classList.remove(DOMtodo.buttonSelected);
    document.querySelector(DOMtodo.buttonCompleted).classList.add(DOMtodo.buttonSelected);
  }
}

function updateCounter(count) {
  var counter = document.querySelector(DOMtodo.counter);

  counter.innerHTML = String(count) + ' items left';
}

function editItem(id) {
  var todoItem, todoItemLabel, todoItemCheck, edit, todoItemClose;

  todoItem = document.getElementById(id);
  todoItemLabel = todoItem.querySelector('.' + DOMtodo.todoItemLabel);
  todoItemLabel.classList.add(DOMtodo.todoItemLabelEdited);
  todoItemCheck = todoItem.querySelector('.' + DOMtodo.todoItemCheck);
  todoItemCheck.classList.add(DOMtodo.todoItemCheckEdited);
  todoItemClose = todoItem.querySelector('.' + DOMtodo.todoItemClose);
  todoItemClose.classList.add(DOMtodo.todoItemCloseEdited);
  todoItem.classList.add(DOMtodo.todoItemEdited);
  edit = document.createElement('input');
  edit.type = 'text';
  edit.classList.add(DOMtodo.todoItemInput);

  todoItem.appendChild(edit);
  edit.value = todoItemLabel.innerHTML;
  edit.focus();
    
  return [todoItem, edit];
}

function saveEdit(editItem, edit) {
  var label, todoItemCheck, closeElement;

  label = editItem.querySelector('.' + DOMtodo.todoItemLabel);
  label.classList.remove(DOMtodo.todoItemLabelEdited);
  editItem.classList.remove(DOMtodo.todoItemEdited);
  todoItemCheck = editItem.querySelector('.' + DOMtodo.todoItemCheck);
  todoItemCheck.classList.remove(DOMtodo.todoItemCheckEdited);
  closeElement = editItem.querySelector('.' + DOMtodo.todoItemClose);
  closeElement.classList.remove(DOMtodo.todoItemCloseEdited);
  edit.remove();
  label.innerHTML = edit.value;
}

function noSaveEdit(editItem, edit) {
  var label, todoItemCheck, closeElement;

  label = editItem.querySelector('.' + DOMtodo.todoItemLabel);
  label.classList.remove(DOMtodo.todoItemLabelEdited);
  editItem.classList.remove(DOMtodo.todoItemEdited);
  todoItemCheck = editItem.querySelector('.' + DOMtodo.todoItemCheck);
  todoItemCheck.classList.remove(DOMtodo.todoItemCheckEdited);
  closeElement = editItem.querySelector('.' + DOMtodo.todoItemClose);
  closeElement.classList.remove(DOMtodo.todoItemCloseEdited);
  edit.remove();
}

function visibleClose(id) {
  var todoItem = document.getElementById(id);

  todoItem.querySelector('.' + DOMtodo.todoItemClose).classList.add('todo-item__close_visible');
}

function hideClose() {
  var allTodoItems = document.querySelectorAll('.todo-item');

  for ( var i = 0; i < allTodoItems.length; i++) {
    allTodoItems[i].querySelector('.' + DOMtodo.todoItemClose).classList.remove('todo-item__close_visible');
  }
}

export {getDOM, getInput, addListItem, deleteListItem, clearInput, changeState,
  selectAll, updateDisplayMode, updateTodos, changeButtonMode, updateCounter,
  editItem, saveEdit, noSaveEdit, visibleClose, hideClose}
