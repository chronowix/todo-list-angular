import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../task-service';
import { TaskStore } from '../../store/task/task.store';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [FormsModule, AsyncPipe, TodoItem],
  templateUrl: './list-task.html',
  styleUrls: ['./list-task.css']
})
export class ListTask {

  tasks$;
  newTaskTitle = "";

  constructor(
    private service: TaskService,
    private store: TaskStore
  ) {
    this.tasks$ = this.store.tasks$;
  }


  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.service.add({ title: this.newTaskTitle });
    this.newTaskTitle = '';
  }

  deleteTask(id: number) {
    this.service.delete(id);
  }

  toggleTaskStatus(id: number) {
    this.service.toggleStatus(id);
  }
}
