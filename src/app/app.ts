import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTask } from './features/list-task/list-task';
import { TodoItem } from './features/todo-item/todo-item';

@Component({
  selector: 'app-root',
  standalone: true,         
  imports: [RouterOutlet, ListTask],
  templateUrl: './app.html',
  styleUrls: ['./app.css']    
})
export class App {
  protected readonly title = signal('todo-list-app');
}
