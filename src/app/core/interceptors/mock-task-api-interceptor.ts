import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockTaskApiInterceptor implements HttpInterceptor {

  private tasks = [
    { id: 1, title: "Manger des pommes", status: "A faire" },
    { id: 2, title: "Travailler sur Angular", status: "Terminé" },
    { id: 3, title: "Faire dodo", status: "A faire" }
  ];

  private nextId = 4;

  //intercepts the http request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("INTERCEPTED:", req.url);
    const { method, url } = req;

    if (!url.startsWith('/api/tasks')) {
      return next.handle(req);
    }

    //GET : get all tasks
    if (method === 'GET' && url === '/api/tasks') {
      return of(
        new HttpResponse({
          status: 200,
          body: [...this.tasks]
        })
      );
    }

    //POST: create the task
    if (method === 'POST' && url === '/api/tasks') {
      const newTask = { id: this.nextId++, ...req.body };
      this.tasks.push(newTask);

      return of(
        new HttpResponse({
          status: 201,
          body: newTask
        })
      );
    }

    //PATCH: update the task
    const idMatch = url.match(/\/api\/tasks\/(\d+)/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      const task = this.tasks.find(t => t.id === id);

      if (!task) {
        return of(new HttpResponse({ status: 404 }));
      }

      if (method === 'PUT' || method === 'PATCH') { //if request is PUT or PATCH (both are used for updates)
        Object.assign(task, req.body);

        return of(
          new HttpResponse({
            status: 200,
            body: task
          })
        );
      }

      //DELETE: deletes the task
      if (method === 'DELETE') {
        this.tasks = this.tasks.filter(t => t.id !== id);

        return of(
          new HttpResponse({
            status: 204
          })
        );
      }
    }

    return next.handle(req);
  }
}
