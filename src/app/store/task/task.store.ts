import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Task } from "../../features/list-task/models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskStore {

    private _tasks = new BehaviorSubject<Task[]>([]);

    readonly tasks$: Observable<Task[]> = this._tasks.asObservable();

    getSnapshot(): Task[] {
        return this._tasks.getValue();
    }

    setTasks(tasks: Task[]): void {
        this._tasks.next([...tasks]);
    }

    add(task: Task): void {
        this._tasks.next([...this._tasks.getValue(), task]);
    }

    update(id: number, changes: Partial<Task>): void {
        this._tasks.next(
            this._tasks.getValue().map(t =>
                t.id === id ? { ...t, ...changes } : t
            )
        );
    }

    remove(id: number): void {
        this._tasks.next(
            this._tasks.getValue().filter(t => t.id !== id)
        );
    }
}
