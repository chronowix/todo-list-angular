import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Task } from '../features/list-task/models/task.model';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private tasks: Task[] = [
    { id: 1, title: "Manger des pommes", status: "A faire" },
    { id: 2, title: "Travailler sur Angular", status: "Terminé" },
    { id: 3, title: "Faire dodo", status: "A faire" }
  ];

  private nextId = 4;

  getAll(): Observable<Task[]> {
    return of([...this.tasks]).pipe(delay(200));
  }

  create(task: Omit<Task, "id">): Observable<Task> {
    const newTask: Task = { id: this.nextId++, ...task };
    this.tasks.push(newTask);
    return of(newTask).pipe(delay(200));
  }

  update(id: number, changes: Partial<Task>): Observable<Task | undefined> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return of(undefined).pipe(delay(200));

    this.tasks[index] = { ...this.tasks[index], ...changes };
    return of(this.tasks[index]).pipe(delay(200));
  }

  delete(id: number): Observable<boolean> {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(this.tasks.length < before).pipe(delay(200));
  }
}
