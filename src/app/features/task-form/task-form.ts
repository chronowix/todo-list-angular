import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskForm {
  @Output() taskCreated = new EventEmitter<{ title: string; desc?: string }>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      desc: new FormControl(''), //optionnel
    });
  }

  submit(): void{
    if (this.form.invalid) return;
    this.taskCreated.emit(this.form.value);
    this.form.reset(); //optionnel mais permet un reset du form
  }
}
