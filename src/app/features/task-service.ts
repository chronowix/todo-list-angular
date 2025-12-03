import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../features/list-task/models/task.model';
import { CreateTaskDto } from '../features/list-task/models/create-task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // BehaviorSubject interne privé
  private _tasks = new BehaviorSubject<Task[]>([
    { id: 1, title: "Manger des pommes", status: "A faire" },
    { id: 2, title: "Travailler sur Angular", status: "Terminé" },
    { id: 3, title: "Faire dodo", status: "A faire" }
  ]);

  // Observable 
  tasks$: Observable<Task[]> = this._tasks.asObservable();

  // Getter 
  private get tasks(): Task[] {
    return this._tasks.value;
  }

  add(dto: CreateTaskDto) {
    const newTask: Task = {
      id: Date.now(),
      title: dto.title,
      status: "A faire"
    };
    this._tasks.next([...this.tasks, newTask]);
  }

  updateTitle(id: number, title: string) {
    const updated = this.tasks.map(t => t.id === id ? { ...t, title } : t);
    this._tasks.next(updated);
  }

  toggleStatus(id: number) {
    const updated = this.tasks.map(t =>
      t.id === id ? { ...t, status: t.status === "Terminé" ? "A faire" : "Terminé" }: t);
    this._tasks.next(updated);
  }

  delete(id: number) {
    const updated = this.tasks.filter(t => t.id !== id);
    this._tasks.next(updated);
  }
}
