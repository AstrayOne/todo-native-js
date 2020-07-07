let input = document.querySelector('.js-new-todo');
let list = document.querySelector('.js-todo-list');
let items = list.children;
let checkSelectAll = document.querySelector('.js-select-all__checkbox');
let selectAll = document.querySelector('.js-select-all');

let counter = document.querySelector('.js-counter');
let footer = document.querySelector('.js-footer');
let clearCompleted = document.querySelector('.js-button_clear-сompleted');
clearCompleted.addEventListener('click', () => clearCompletedButtonHandler());


selectAll.addEventListener('click', () => selectAllButtonHandler(selectAll));
document.addEventListener('keydown', handleKey);

let buttonAll = document.querySelector('.js-button_all');
let buttonActive = document.querySelector('.js-button_active');
let buttonCompleted = document.querySelector('.js-button_completed');

buttonAll.addEventListener('click', () => buttonAllHandler(buttonAll));
buttonActive.addEventListener('click', () => buttonActiveHandler(buttonActive));
buttonCompleted.addEventListener('click', () => buttonCompletedHandler(buttonCompleted));

let buttonAllCheckbox = document.querySelector('.js-button_all__checkbox');
let buttonActiveCheckbox = document.querySelector('.js-button_active__checkbox');
let buttonCompletedCheckbox = document.querySelector('.js-button_completed__checkbox');

buttonAll.checked = true;
buttonAll.classList.add('button_selected');

function selectAllButtonHandler(selectAll) {
  //items = list.children;
  checks = document.querySelectorAll('.todo-item__check');
  
  if (checkSelectAll.checked) {
    selectAll.classList.remove('select-all_checked');
    for(let i = 0; i < items.length; i++)
    {
      items[i].classList.add('todo-item_active');
      items[i].classList.remove('todo-item_done');

      let label = items[i].querySelector('.todo-item__label');
      label.classList.remove('todo-item__label_done');
      
      checks[i].checked = false;
    }
    checkSelectAll.checked = false;

  }
  else {
    selectAll.classList.add('select-all_checked');
    for(let i = 0; i < items.length; i++)
    {
      items[i].classList.remove('todo-item_active');
      items[i].classList.add('todo-item_done');

      let label = items[i].querySelector('.todo-item__label');
      label.classList.add('todo-item__label_done');

      checks[i].checked = true;
    }
    checkSelectAll.checked = true;
  }

  refreshCounter();
}

function clearCompletedButtonHandler() {
  allDoneItems = document.querySelectorAll('.todo-item_done');
  
  for (let i = 0; i < allDoneItems.length; i++) {
    allDoneItems[i].remove();
  }
}

function closeButtonHandler(item) {
  item.remove();

  refreshCounter();
}

function checkButtonHandler(checkButton, item) {
  let label = item.querySelector('.todo-item__label');
  
  if (!checkButton.checked) {
    item.classList.remove('todo-item_done');
    item.classList.add('todo-item_active');
    label.classList.remove('todo-item__label_done');
  }

  else {
    item.classList.add('todo-item_done');
    item.classList.remove('todo-item_active');
    label.classList.add('todo-item__label_done');
  }

  refreshCounter();
}

function handleMouseOver(item) {
  let closeItem = item.querySelector('.todo-item__close');
  closeItem.classList.add('todo-item__close_visible');
}

function handleMouseOut(item) {
  let closeItem = item.querySelector('.todo-item__close');
  closeItem.classList.remove('todo-item__close_visible');
}

function addCheckHandler(item) {
  item.addEventListener('mouseover', () => handleMouseOver(item));
  item.addEventListener('mouseout', () => handleMouseOut(item));

  let label = item.querySelector('.todo-item__label');
  label.addEventListener('dblclick', () => editTask(label, item));

  let closeButton = item.querySelector('.todo-item__close');
  closeButton.addEventListener('click', () => closeButtonHandler(item));

  let checkButton = item.querySelector('.todo-item__check');
 
  checkButton.addEventListener('click', () => checkButtonHandler(checkButton, item));

  refreshCounter();
}

function editTask(label, item) {
  label.classList.add('todo-item__label_edited');

  item.classList.add('todo-item_editd');

  closeElement = item.querySelector('.todo-item__close');
  closeElement.classList.add('todo-item__close_edited');

  let edit = document.createElement('input');
  edit.type = 'text';
  edit.classList.add('todo-item__input');
  item.appendChild(edit);
  edit.value = label.innerHTML;
  edit.focus();
  window.addEventListener('click', () => clickHandler( item, edit));
  window.addEventListener('keydown', () => buttonHandler( item, edit));
}

function buttonHandler(item, edit) {
  if((event.keyCode == 13) && (document.activeElement == edit)){
    refreshString(item, edit)
  }
}

function refreshString(item, edit) {
  label = item.querySelector('.todo-item__label');
  label.classList.remove('todo-item__label_edited');
  item.querySelector('.todo-item_done');
  item.classList.remove('todo-item_editd');
  closeElement = item.querySelector('.todo-item__close');
  closeElement.classList.remove('todo-item__close_edited');
  edit.remove();
  label.innerHTML = edit.value;
}

function clickHandler(item, edit) {
  if(!(event.target.classList.contains('todo-item__input'))) {
    refreshString(item, edit)
  }
}

function handleKey(e) {
  if ((e.keyCode == 13) && (document.activeElement == input)) {
    let element = document.createElement('li');
    element.classList.add('todo-item');
    element.classList.add('todo-item_active');
    let taskText = input.value;
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-item__check');
    let label = document.createElement('label');
    label.classList.add('todo-item__label');
    label.innerHTML = taskText;
    let div = document.createElement('div');
    div.classList.add('todo-item__close');
  
    element.appendChild(checkbox);
    element.appendChild(label);
    element.appendChild(div);

    addCheckHandler(element);

    list.appendChild(element);
    
    input.value = '';

    refreshCounter();
  }
}

function refreshCounter() {
  let itemsActive = document.querySelectorAll('.todo-item_active');
  counter.innerHTML = String(itemsActive.length) + " items left";

  if(items.length > 0) {
    selectAll.classList.add('select-all_visible');
    footer.classList.add('hide_footer');
  }
  else {
    selectAll.classList.remove('select-all_visible');
    footer.classList.remove('hide_footer');
  }

  let itemsDone = document.querySelectorAll('.todo-item_done');
  let buttonClearCompleted = document.querySelector('.js-button_clear-сompleted');
  if(itemsDone.length > 0) {
    buttonClearCompleted.classList.add('show_button_clear-сompleted');
  }
  else {
    buttonClearCompleted.classList.remove('show_button_clear-сompleted');
  }
}

function buttonAllHandler(buttonAll) {
  if (!buttonAllCheckbox.checked) {
    buttonAllCheckbox.checked = true;
    buttonActiveCheckbox.checked = false;
    buttonCompletedCheckbox.checked = false;

    buttonAll.classList.add('button_selected');
    buttonActive.classList.remove('button_selected');
    buttonCompleted.classList.remove('button_selected');
  }

  for(let i = 0; i < items.length; i++) {
    items[i].classList.remove('todo-item_nodisplay');
  }
}

function buttonActiveHandler(buttonActive) {
  if (!buttonActiveCheckbox.checked) {
    buttonAllCheckbox.checked = false;
    buttonActiveCheckbox.checked = true;
    buttonCompletedCheckbox.checked = false;

    buttonAll.classList.remove('button_selected');
    buttonActive.classList.add('button_selected');
    buttonCompleted.classList.remove('button_selected');
  }

  allDoneItems = document.querySelectorAll('.todo-item_done');
 
  for (let i = 0; i < allDoneItems.length; i++) {
    allDoneItems[i].classList.add('todo-item_nodisplay');
  }

  allActiveItems = document.querySelectorAll('.todo-item_active');
  for (let i = 0; i < allActiveItems.length; i++) {
    allActiveItems[i].classList.remove('todo-item_nodisplay');
  }
}

function buttonCompletedHandler(buttonCompleted) {
  if (!buttonCompletedCheckbox.checked) {
    buttonAllCheckbox.checked = false;
    buttonActiveCheckbox.checked = false;
    buttonCompletedCheckbox.checked = true;

    buttonAll.classList.remove('button_selected');
    buttonActive.classList.remove('button_selected');
    buttonCompleted.classList.add('button_selected');
  }

  allDoneItems = document.querySelectorAll('.todo-item_done');

  for (let i = 0; i < allDoneItems.length; i++) {
    allDoneItems[i].classList.remove('todo-item_nodisplay');
  }

  allActiveItems = document.querySelectorAll('.todo-item_active');
  for (let i = 0; i < allActiveItems.length; i++) {
    allActiveItems[i].classList.add('todo-item_nodisplay');
  } 
}
