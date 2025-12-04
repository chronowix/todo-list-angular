import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Task } from '../features/list-task/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private readonly baseUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) { }


  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  create(dto: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, dto);
  }

  update(id: number, changes: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
