import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // It async return promise
    //this.todos = this.todoService.getTodos();
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  deleteTodo(todo: Todo) {
    //Delete from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);

    //Delete from Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
