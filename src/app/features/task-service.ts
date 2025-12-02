import { Injectable } from '@angular/core';
import { Task } from './list-task/models/task.model';
import { CreateTaskDto } from './list-task/models/create-task.dto';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(){
    this.tasks = [
      {id: this.nextId++, title: "Manger des pommes", status: 'A faire'  },
      {id: this.nextId++, title: "Travailler sur Angular", status: 'Terminé'  },
      {id: this.nextId++, title: "Faire dodo", status: 'A faire'  }
    ];
  }

  getAll(): Task[] {
    return [...this.tasks];
  }

  //ajout nouvelle tâche
  add(taskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: taskDto.title,
      status: "A faire",
    };
    this.tasks.push(newTask);
    return newTask;
  }

  //update
  updateTitle(id: number, title: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
    } else {
      console.warn(`Tâche avec id ${id} non trouvée.`);
    }
  }

  //inverser statut
  toggleStatus(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task){
      task.status = task.status === "A faire" ? "Terminé" : "A faire";
    } else {
      console.warn(`Tâche avec id ${id} non trouvée.`);
    }
  }

  //suppr
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

 
}
