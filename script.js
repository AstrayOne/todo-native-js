var todoController = (function() {

    var Todo = function(id, isActive, text) {
        this.id = id;
        this.isActive = isActive;
        this.text = text;
    };

    var data = {
      allTodoItems: [],
      selectAll: false
    };

    var SaveData = function() {
      localStorage.clear();
      for (var i = 0; i < data.allTodoItems.length; i++) {
        localStorage[i]= JSON.stringify(data.allTodoItems[i]);
      }
    };

    return {
      LoadData: function() {
        var item;
        for (var i = 0; i < localStorage.length; i++) {
          item = JSON.parse(localStorage[i]);
          newItem = new Todo( item.id,  item.isActive,  item.text);
        
          data.allTodoItems.push(newItem);
        }
      },

      changeText: function(id, text) {
        var ids, index;

        ids = data.allTodoItems.map(function(current) {
          return current.id;
        });
        
        index = ids.indexOf(id);
        data.allTodoItems[index].text = text;

        SaveData();
      },

      getItem: function(id) {
        var index;

        ids = data.allTodoItems.map(function(current) {
          return current.id;
        });

        index = ids.indexOf(id);

        return data.allTodoItems[index];
      },

      selectCompletedTodos: function() {
        var selectActiveTodos = [];

        for (var i = 0; i < data.allTodoItems.length; i++) {
          if (data.allTodoItems[i].isActive === false) {
            selectActiveTodos.push(data.allTodoItems[i]);
          }
        }
        return selectActiveTodos;
      },

      selectAllTodos: function() {
        return data.allTodoItems;
      },

      selectActiveTodos: function() {
        var selectActiveTodos = [];
        for (var i = 0; i < data.allTodoItems.length; i++) {
          if (data.allTodoItems[i].isActive === true) {
            selectActiveTodos.push(data.allTodoItems[i]);
          }
        }
        return selectActiveTodos;
      },

      isEmpty: function() {
        if (data.allTodoItems.length === 0) {
          return true;
        }
        else {
          return false;
        }
      },
      
      addItem: function(text) {
        var newItem, ID, isActive;
        if (data.allTodoItems.length > 0) {
          ID = data.allTodoItems[data.allTodoItems.length - 1].id + 1;
        }
        else {
          ID = 0;
        }

        isActive = true;
        newItem = new Todo(ID, isActive, text);
        
        data.allTodoItems.push(newItem);
        
        SaveData();
        return newItem;
      },

      deleteItem: function(id) {
        var index;

        ids = data.allTodoItems.map(function(current) {
          return current.id;
        });

        index = ids.indexOf(id);
        data.allTodoItems.splice(index, 1);

        SaveData();
      },

      changeState: function(id) {
        var index;

        ids = data.allTodoItems.map(function(current) {
          return current.id;
        });

        index = ids.indexOf(id);

        if (data.allTodoItems[index].isActive === true)
        {
          data.allTodoItems[index].isActive = false;
        }
        else{
          data.allTodoItems[index].isActive = true;
        }

        SaveData();
      },

      checkSelectAll: function() {
        for (var i = 0; i < data.allTodoItems.length; i++) {
          if (data.allTodoItems[i].isActive === true) {
            data.selectAll = false;
            return data.selectAll;
          }
        }
        data.selectAll = true;
        return data.selectAll;
      },

      selectAll: function() {
        if (data.selectAll === false) {
          for (var i = 0; i < data.allTodoItems.length; i++) {
            data.allTodoItems[i].isActive = false;
          }
          data.selectAll = true;
        }
        else {
          for (var i = 0; i < data.allTodoItems.length; i++) {
            data.allTodoItems[i].isActive = true;
          }
          data.selectAll = false;
        }

        SaveData();
        return data.selectAll;
      },

      changeSelectAll: function() {
        if (data.selectAll === true) {
          data.selectAll = false;
        }
      },

      updateCounter: function() {
        return this.selectActiveTodos().length;
      }
    }
})();

var todoUIController = (function() {

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

  return {
    getDOM: function() {
      return DOMtodo;
    },

    getInput: function() {
      return {
        text: document.querySelector(DOMtodo.todoInput).value
      };
    },

    addListItem: function(obj) {
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
    },

    deleteListItem: function(itemID) {
      var element = document.getElementById(itemID);

      element.parentNode.removeChild(element);
    },

    clearInput: function() {
      document.querySelector(DOMtodo.todoInput).value = "";
    },

    changeState: function(itemID) {
      var todoItem, todoItemLabel;

      todoItem = document.getElementById(itemID);
    
      todoItemLabel = todoItem.querySelector('.todo-item__label');
  
      todoItem.classList.toggle(DOMtodo.todoItemDone);
      todoItemLabel.classList.toggle(DOMtodo.todoItemLabelDone);
    },

    selectAll: function(isSelectAll) {
      if (isSelectAll === true) {
        document.querySelector(DOMtodo.selectAll).classList.add(DOMtodo.selectAllChecked);
      }
      else {
        document.querySelector(DOMtodo.selectAll).classList.remove(DOMtodo.selectAllChecked);
      }
    },

    updateDisplayMode: function(isEmpty) {
      if (isEmpty === true) {
        document.querySelector(DOMtodo.selectAll).classList.remove(DOMtodo.selectAllVisible);
        document.querySelector(DOMtodo.footer).classList.remove(DOMtodo.footerVisible);
      }
      else {
        document.querySelector(DOMtodo.selectAll).classList.add(DOMtodo.selectAllVisible);
        document.querySelector(DOMtodo.footer).classList.add(DOMtodo.footerVisible);
      }
    },

    updateTodos: function(todos, mode) {

      var list = document.querySelector(DOMtodo.todoList);
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      for (var i = 0; i < todos.length; i++) {
        this.addListItem(todos[i]);
      }
    },

    changeButtonMode: function(mode) {
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
    },

    updateCounter: function(count) {
      var counter = document.querySelector(DOMtodo.counter);

      counter.innerHTML = String(count) + ' items left';
    },

    editItem: function(id) {
      var todoItem, todoItemLabel, edit, todoItemClose;

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
    },

    saveEdit: function(editItem, edit) {
      label = editItem.querySelector('.' + DOMtodo.todoItemLabel);
      label.classList.remove(DOMtodo.todoItemLabelEdited);
      editItem.classList.remove(DOMtodo.todoItemEdited);
      todoItemCheck = editItem.querySelector('.' + DOMtodo.todoItemCheck);
      todoItemCheck.classList.remove(DOMtodo.todoItemCheckEdited);
      closeElement = editItem.querySelector('.' + DOMtodo.todoItemClose);
      closeElement.classList.remove(DOMtodo.todoItemCloseEdited);
      edit.remove();
      label.innerHTML = edit.value;
    },

    noSaveEdit: function(editItem, edit) {
      label = editItem.querySelector('.' + DOMtodo.todoItemLabel);
      label.classList.remove(DOMtodo.todoItemLabelEdited);
      //editItem.querySelector('.todo-item_done');
      editItem.classList.remove(DOMtodo.todoItemEdited);
      todoItemCheck = editItem.querySelector('.' + DOMtodo.todoItemCheck);
      todoItemCheck.classList.remove(DOMtodo.todoItemCheckEdited);
      closeElement = editItem.querySelector('.' + DOMtodo.todoItemClose);
      closeElement.classList.remove(DOMtodo.todoItemCloseEdited);
      edit.remove();
    },

    visibleClose: function(id) {
      var todoItem = document.getElementById(id);

      todoItem.querySelector('.' + DOMtodo.todoItemClose).classList.add('todo-item__close_visible');
    },

    hideClose: function() {
      var allTodoItems = document.querySelectorAll('.todo-item');

      for ( var i = 0; i < allTodoItems.length; i++) {
        allTodoItems[i].querySelector('.' + DOMtodo.todoItemClose).classList.remove('todo-item__close_visible');
      }
    }
  };
})();

var controller = (function(todoController, todoUIController) {
  var mode, DOMtodo, clkHandler, btnHandler;
  
  DOMtodo = todoUIController.getDOM();
  
  var setupEventListeners = function() {
    var DOMtodo = todoUIController.getDOM();

    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        addItem();
      }
    });

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
   
  };

  var handleMouseOver = function() {
    if (event.target.closest('.todo-item')) {
      todoUIController.visibleClose(event.target.closest('.todo-item').id);
    }
  };

  var handleMouseOut = function() {
    todoUIController.hideClose();
  };

  var editText = function() {
    var itemID, splitID, id, editItem, edit;

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
  };

  var clickHandler = function(editItem, edit, id) {
    if (!(event.target.classList.contains(DOMtodo.todoItemInput))) {
      var text = edit.value;
     
      todoUIController.saveEdit(editItem, edit);
      todoController.changeText(id, text);
      
      window.removeEventListener('click', clkHandler);
      window.removeEventListener('keydown', btnHandler);
    }
  };

  var buttonHandler = function(editItem, edit, id) {
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
    
  };

  var updateCounter = function() {
    var count;

    count = todoController.updateCounter();
    todoUIController.updateCounter(count);
  };

  var buttonClearCompletedHandler = function() {
    var completed, itemID;

    completed = todoController.selectCompletedTodos();

    for (var i = 0; i < completed.length; i++) {
      itemID = completed[i].id;
      todoController.deleteItem(itemID);
    }

    updateList();
  };

  var updateList = function() {
    var isSelectAll;

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
  };

  var buttonCompletedHandler = function() {
    mode = 'Completed';

    updateList();
  };

  var buttonAllHandler = function() {
    mode = 'All';

    updateList();
  };

  var buttonActiveHandler = function() {
    mode = 'Active';

    updateList();
  };

  var displayMode = function() {
    var isEmpty;

    isEmpty = todoController.isEmpty();
    todoUIController.updateDisplayMode(isEmpty);
  };

  var selectAllHandler = function() {
    var isSelectAll;

    isSelectAll = todoController.selectAll();
    todoUIController.selectAll(isSelectAll);
    updateList();

  };

  var addItem = function() {
    var input, newItem;
    
    input = todoUIController.getInput();

    if (input.text !== "") {
      newItem = todoController.addItem(input.text);
      todoUIController.clearInput();

      todoController.changeSelectAll();
      displayMode();
      updateList();
    }
  };

  var deleteItem = function(event) {
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
  };

  var changeState = function(event) {
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
  };

  var LoadData = function() {
    mode = 'All';
    todoController.LoadData();

    updateList();
    displayMode();
  };

  return {
    init: function() {
      LoadData();
      setupEventListeners();
      buttonAllHandler();
    }
  };

})(todoController, todoUIController);

controller.init();