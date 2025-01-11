import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent {
  @Input() imageUrl: string = ''; 
  @Input() type: string = ''; 
  @Input() name: string = ''; 

  @Output() modify = new EventEmitter<void>(); 
  @Output() delete = new EventEmitter<void>(); 

  
  typeIcons: { [key: string]: string } = {
    Appetizers: 'fas fa-utensils fa-bounce', 
    Desserts: 'fas fa-ice-cream fa-bounce', 
    "Main Course": 'fas fa-pizza-slice fa-bounce', 
};

  
  get typeIconClass() {
    return this.typeIcons[this.type] || 'fa-utensils'; 
  }

  
  onModify() {
    this.modify.emit();
  }


  onDelete() {
    this.delete.emit();
  }
}