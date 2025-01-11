import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent {
  @Input() imageUrl: string = ''; 
  @Input() type: string = 'Dessert'; 
  @Input() name: string = 'Fresh Strawberries'; 

  @Output() modify = new EventEmitter<void>(); 
  @Output() delete = new EventEmitter<void>(); 

  
  typeIcons: { [key: string]: string } = {
    Entele: 'fa-utensils',
    Dessert: 'fa-ice-cream',
    Pizza: 'fa-pizza-slice',
    Burger: 'fa-hamburger'
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