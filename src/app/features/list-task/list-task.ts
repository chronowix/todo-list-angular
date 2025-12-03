import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../task-service';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [FormsModule, AsyncPipe, TodoItem],
  templateUrl: './list-task.html',
  styleUrls: ['./list-task.css']
})
export class ListTask {

  tasks$;    // <-- déclaré mais non initialisé ici
  newTaskTitle = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;   // <-- initialisation ICI
  }


  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.add({ title: this.newTaskTitle });
    this.newTaskTitle = '';
  }

  deleteTask(id: number) {
    this.taskService.delete(id);
  }

  toggleTaskStatus(id: number) {
    this.taskService.toggleStatus(id);
  }
}
