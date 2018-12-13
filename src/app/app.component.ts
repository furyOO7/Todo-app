import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  ]
})
export class AppComponent implements OnInit{
  storeResponse: any;
  title = 'Todo';
  updatedlabel = 'Test'; 
   clickedTodo = {
     "name": ""
   };
   /*addnewTodo = {
   "todo_name": "",
   "status": false
   };
   */
   constructor(public _http: HttpClient){
     this.todos = []
   };
 /* todos = [
  {
  "name": "Take Printouts",
  "done": false
  },
  {
  "name": "Boil Milk",
  "done": false
  },
  {
  "name": "Paint Wall",
  "done": false
  },
  {
  "name": "Preapare bed",
  "done": false
  },
  {
  "name": "Watch Young Sheldon",
  "done": false
  }
  ];*/
  loadTodo() {
     this._http.get("http://localhost:3000/todo/getdata",{
      headers: {
        'Content-type': "application/json"
      }
    }).subscribe(response => {
      //console.log("response", response)
      if(response.success){
         this.todos = response.data;
      }
      console.log("this.todos", this.todos)
    })
  }
  ngOnInit() {
      this.loadTodo()
   
  }
  addTodo(newTodo) {
    console.log(newTodo.value)
    let data =  {
  "todo_name": newTodo.value,
  "status": false
  }
this._http.post("http://localhost:3000/todo/add", data, {
  headers: {
    'Content-type': 'application/json'}}
    ).subscribe(response => {
    console.log("response", response);
    if(response.success){
      this.loadTodo()
    }else{
      console.log("error")
    }
  })
  }

 /* console.log(newTodo.value)
   this.addnewTodo ={
  "label": newTodo.value,
  "done": false
  }
  this.todos.push(this.addnewTodo)
  };*/
  
  doneTodo(todo){
   console.log(todo)
    let data =  {
  "id": todo.id,
  "status": !todo.status
  }
  this._http.post("http://localhost:3000/todo/changeStatus", data, {
  headers: {
    'Content-type': 'application/json'}}
    ).subscribe(response => {
    if(response.success){
      console.log(response)
      todo.status = !todo.status
    }else{
      console.log("error")
    }
  })
  }
 
  storeTodo(todo){
    console.log(todo)
  /*if(todo.status){
    this.clickedTodo = todo;
   console.log(this.clickedTodo);
   }else{
    alert("This Todo is already completed");
   }
  }
  updateTodo(updatedTodo) {
  console.log(this.clickedTodo)
  console.log(updatedTodo)
  this.clickedTodo.name = updatedTodo;
  $('#exampleModal').modal('hide')

  }*/
}
}
