import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  ]
})
export class AppComponent {
  title = 'Todo';
  updatedlabel = 'Test'; 
   clickedTodo = "";
  todos = [
  {
  "label": "Take Printouts",
  "done": false
  },
  {
  "label": "Boil Milk",
  "done": false
  },
  {
  "label": "Paint Wall",
  "done": false
  },
  {
  "label": "Preapare bed",
  "done": false
  },
  {
  "label": "Watch Young Sheldon",
  "done": false
  }
  ];
  addTodo(newTodo) {
  console.log(newTodo.value)
  var newTodo = {
  "label": newTodo.value,
  "done": false
  }
  this.todos.push(newTodo)
  };
  
  doneTodo(todo){
  todo.done = !todo.done
  };
 
  storeTodo(todo){
  if(todo.done == false){
  $('#exampleModal').modal('show')
  this.clickedTodo = todo;
   console.log(this.clickedTodo)
  }
  else{
  alert("Todo already completed")
  }  
  }
  updateTodo(updatedTodo) {
  console.log(this.clickedTodo)
  console.log(updatedTodo)
  this.clickedTodo.label = updatedTodo;
  $('#exampleModal').modal('hide')

  }
}
