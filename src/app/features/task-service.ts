import { Injectable } from '@angular/core';
import { Task } from '../features/list-task/models/task.model';
import { CreateTaskDto } from '../features/list-task/models/create-task.dto';
import { TaskApiService } from './task-api-service';
import { TaskStore } from '../store/task/task.store';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private store: TaskStore,
    private api: TaskApiService
  ) {
    this.loadAll();
  }

  loadAll(): void {
    this.api.getAll().subscribe(tasks => {
      this.store.setTasks(tasks);
    });
  }

  add(dto: CreateTaskDto): void {
    this.api.create({ title: dto.title, status: "A faire" })
      .subscribe(task => {
        if (task) this.store.add(task);
      });
  }

  updateTitle(id: number, title: string): void {
    this.api.update(id, { title })
      .subscribe(updated => {
        if (updated) {
          this.store.update(id, { title: updated.title });
        }
      });
  }

  toggleStatus(id: number): void {
    const currentTask = this.store.getSnapshot().find(t => t.id === id);
    if (!currentTask) return;

    const newStatus = currentTask.status === "A faire" ? "Terminé" : "A faire";

    this.api.update(id, { status: newStatus })
      .subscribe(updated => {
        if (updated) {
          this.store.update(id, { status: updated.status });
        }
      });
  }

  delete(id: number): void {
    this.api.delete(id).subscribe(() => {
      this.store.remove(id);
    });
  }
}
