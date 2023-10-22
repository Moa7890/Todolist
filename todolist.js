const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let todoList = [];

function displayTodoList() {
  console.log('Todo List:');
  todoList.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
  console.log();
}  

function addTask(task) {
  todoList.push(task);
  console.log(`Task "${task}" added to the todo list.`);
}

function deleteTask(index) {
  if (index >= 0 && index < todoList.length) {
    const deletedTask = todoList.splice(index, 1);
    console.log(`Task "${deletedTask}" deleted from the todo list.`);
  } else {
    console.log('Invalid task index.');
  }
}

function updateTask(index, task) {
  if (index >= 0 && index < todoList.length) {
    todoList[index] = task;
    console.log(`Task "${task}" updated.`);
  } else {
    console.log('Invalid task index.');
  }
}

function handleUserInput() {
  rl.question('Enter a command (add/update/delete/exit): ', (command) => {
    switch (command) {
      case 'add':
        rl.question('Enter the task to add: ', (task) => {
          addTask(task);
          displayTodoList();
          handleUserInput();
        });
        break;
      case 'update':
        rl.question('Enter the task index to update: ', (index) => {
          rl.question('Enter the updated task: ', (task) => {
            updateTask(index - 1, task);
            displayTodoList();
            handleUserInput();
          });
        });
        break;
      case 'delete':
        rl.question('Enter the task index to delete: ', (index) => {
          deleteTask(index - 1);
          displayTodoList();
          handleUserInput();
        });
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('Invalid command. Please try again.');
        handleUserInput();
        break;
    }
  });
}

module.exports = {
  handleUserInput
};