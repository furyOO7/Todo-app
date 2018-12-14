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
  todos: any;
  data: any;
  clickedTodo :any;
  updatedTodo: any;
  title = 'Todo';
  updatedlabel = 'Test'; 
   
   constructor(public _http: HttpClient){
     this.todos = []
     this.data = {}
     this.clickedTodo = {}
     this.updatedTodo = "";

   };

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
    if(todo.status != true){
      $('#exampleModal').modal('show');
      this.clickedTodo = todo;
    }
    else{
      alert("This todo is already completed")
    }
  }

  updateTodo(updatedTodo) {
    let data = {
      "newTodo": updatedTodo,
      "id": this.clickedTodo.id
    }
    if(updatedTodo != undefined){
      console.log(this.clickedTodo)
  console.log(updatedTodo)
  this._http.post("http://localhost:3000/todo/updateTodo", data, {headers:{
    'Content-type': "application/json"
  }
}).subscribe(response => {
  if(response.success){
    this.loadTodo();
     $('#exampleModal').modal('hide');
     this.updatedTodo = "";
  }
})

  }
 /* this.clickedTodo.name = updatedTodo;*/

    else{
      alert("Kindly enter something")
    }
  
  }
}
