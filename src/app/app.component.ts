import { Component ,  OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'




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
  todoDelete: any;
  title = 'Todo';
  updatedlabel = 'Test'; 
 
   
   constructor(public _http: HttpClient){
     this.todos = []
     this.data = {}
     this.clickedTodo = {}
     this.todoDelete = {}
     this.updatedTodo = "";
   };

  loadTodo() {
     this._http.get("http://localhost:3000/todo/getdata",{
      headers: {
        'Content-type': "application/json"
      }
    }).subscribe(response => {
      // console.log("response", response)
      let res = JSON.parse(JSON.stringify(response))
       console.log("res", res)
      if(res.success){
         this.todos = res.data;
      }
      console.log("this.todos", this.todos)
    })
  }
  ngOnInit() {
      this.loadTodo()
   
  }
  addTodo(newTodo) {
    console.log(newTodo)
    let data =  {
          "todo_name": newTodo,
          "status": false
  }
this._http.post("http://localhost:3000/todo/add", data, {
  headers: {
    'Content-type': 'application/json'}}
    ).subscribe(response => {
    console.log("response", response);
     let res = JSON.parse(JSON.stringify(response))
    if(res.success){
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
      let res = JSON.parse(JSON.stringify(response))
    if(res.success){
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
  let res = JSON.parse(JSON.stringify(response))
  if(res.success){
    this.loadTodo();
     $('#exampleModal').modal('hide');
     this.updatedTodo = "";
  }
})
  }
    else{
      alert("Kindly enter something")
    }
  
  }
   confirmDeleteTodo(todo){
    $("#deleteModal").modal('show');
    this.todoDelete = todo;
  }
  deleteTodo(){
    let data = {
      "id": this.todoDelete.id,
      "name": this.todoDelete.todo_name
    };
    this._http.post("http://localhost:3000/todo/delete/" + this.todoDelete.id, data, {
      headers: {
        'Content-type': 'application/json'
      }
    }).subscribe(response => {
       let res = JSON.parse(JSON.stringify(response))
            if(res.success){
        console.log("response", response)
         $("#deleteModal").modal('hide');
        this.loadTodo();
      }
      
    })
  }
}
