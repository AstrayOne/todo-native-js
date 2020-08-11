function Todo(id, isActive, text) {
  this.id = id;
  this.isActive = isActive;
  this.text = text;
};

var data = {
  allTodoItems: [],
  selectAll: false
};

function SaveData() {
  localStorage.clear();
  
  data.allTodoItems.forEach(function(current, index) {
    localStorage[index] = JSON.stringify(current);
  });
};

function LoadData() {
  var item, newItem;
  for (var i = 0; i < localStorage.length; i++) {
   item = JSON.parse(localStorage[i]);
   newItem = new Todo(item.id,  item.isActive,  item.text);
  
   data.allTodoItems.push(newItem);
  }
}

function changeText(id, text) {
  var ids, index;

  ids = data.allTodoItems.map(function(current) {
    return current.id;
  });
  
  index = ids.indexOf(id);
  data.allTodoItems[index].text = text;

  SaveData();
}

function getItem(id) {
  var index, ids;

  ids = data.allTodoItems.map(function(current) {
    return current.id;
  });

  index = ids.indexOf(id);

  return data.allTodoItems[index];
}

function selectCompletedTodos() {
  var selectCompletedTodos = [];

  data.allTodoItems.forEach(function(current) {
    if (current.isActive === false) {
      selectCompletedTodos.push(current);
    }
  });

  return selectCompletedTodos;
}

function selectAllTodos() {
  return data.allTodoItems;
}

function selectActiveTodos() {
  var selectActiveTodos = [];

  data.allTodoItems.forEach(function(current) {
    if (current.isActive === true) {
      selectActiveTodos.push(current);
    }
  });

  return selectActiveTodos;
}

function isEmpty() {
  return (data.allTodoItems.length === 0);
}
      
function addItem(text) {
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
}

function deleteItem(id) {
  var index, ids;

  ids = data.allTodoItems.map(function(current) {
    return current.id;
  });

  index = ids.indexOf(id);
  data.allTodoItems.splice(index, 1);

  SaveData();
}

function changeState(id) {
  var index, ids, isActive;

  ids = data.allTodoItems.map(function(current) {
    return current.id;
  });

  index = ids.indexOf(id);
  isActive = data.allTodoItems[index].isActive;
  isActive === true ? isActive = false : isActive = true;
  data.allTodoItems[index].isActive = isActive;

  SaveData();
}

function checkSelectAll() {

  for (var i = 0; i < data.allTodoItems.length; i++) {
    if (data.allTodoItems[i].isActive === true) {
      data.selectAll = false;
      return data.selectAll;
    }
  }

  data.selectAll = true;
  return data.selectAll;
}

function selectAll() {
  if (data.selectAll === false) {
    data.allTodoItems.forEach(function(current, index) {
      data.allTodoItems[index].isActive = false;
    });
    data.selectAll = true;
  }
  else {
    data.allTodoItems.forEach(function(current, index) {
      data.allTodoItems[index].isActive = true;
    });
    data.selectAll = false;
  }

  SaveData();
  return data.selectAll;
}

function changeSelectAll() {
  if (data.selectAll === true) {
    data.selectAll = false;
  }
}

function updateCounter() {
  return selectActiveTodos().length;
}

export {LoadData, changeText, getItem, selectCompletedTodos, 
  selectAllTodos, selectActiveTodos, isEmpty, addItem, deleteItem, changeState,
  checkSelectAll, selectAll, changeSelectAll, updateCounter}
