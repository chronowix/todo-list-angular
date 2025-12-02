import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { TaskService } from '../task-service';
import { TodoItem } from '../todo-item/todo-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [TodoItem, FormsModule],
  templateUrl: './list-task.html',
  styleUrls: ['./list-task.css'],
  providers: [TaskService]
})
export class ListTask {
  tasks: Task[] = [];
    newTaskTitle = "";

  constructor(private taskService: TaskService) {
  }  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
  }
  
  addTask(title: string) {
    this.taskService.add({ title });
    this.tasks = this.taskService.getAll();
  }

  toggleTaskStatus(id: number) {
    this.taskService.toggleStatus(id);
    this.tasks = this.taskService.getAll();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getAll();

  }

  // handler pour le clic sur le bouton de l'enfant
  onTaskClicked(task: Task) {
    this.toggleTaskStatus(task.id);
  }
}
