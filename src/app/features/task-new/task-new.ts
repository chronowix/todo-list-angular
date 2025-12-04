import { Component } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { TaskService } from '../task-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [CommonModule, TaskForm],
  template: `
    <h2>Nouvelle tâche</h2>
    <app-task-form (taskCreated)="createTask($event)"></app-task-form>
  `
})
export class TaskNew {

  constructor(private taskService: TaskService) { }

  // Méthode correctement déclarée en dehors du constructeur
  createTask(task: { title: string; desc?: string }) {
    this.taskService.add({
      title: task.title,       
      desc: task.desc ?? '' 
    });
  }
}
