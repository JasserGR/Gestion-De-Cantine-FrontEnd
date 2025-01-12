import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
  imports: [CommonModule],
})
export class DishCardComponent {
  @Input() imageUrl: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() attribut: string = '';
  @Input() rating: number = 0; // Note du plat

  @Output() modify = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  stars: number[] = [1, 2, 3, 4, 5]; // Nombre d'étoiles disponibles

  typeIcons: { [key: string]: string } = {
    Appetizers: 'fas fa-utensils fa-bounce',
    Desserts: 'fas fa-ice-cream fa-bounce',
    'Main Course': 'fas fa-pizza-slice fa-bounce',
  };

  getStarWidth(starIndex: number): string {
    const starValue = this.rating - starIndex; // Calculer la valeur de l'étoile actuelle
    if (starValue >= 1) {
      return '100%'; // Étoile pleine
    } else if (starValue <= 0) {
      return '0%'; // Étoile vide
    } else {
      return `${(starValue * 100).toFixed(2)}%`; // Partie remplie en pourcentage
    }
  }

  get typeIconClass() {
    return this.typeIcons[this.type] || 'fa-utensils';
  }

  onModify() {
    this.modify.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/plat.png';
  }
}
