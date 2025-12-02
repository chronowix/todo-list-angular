import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css']
})
export class TodoItem {
  @Input() id!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: string;
  
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.id);
  }

  onToggle() {
    this.toggle.emit(this.id);
  }
}
