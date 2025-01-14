import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FeedbackCardComponent } from '../components/feedback-card/feedback-card.component';
import { Rating } from '../models/rating.type';
import { RatingService } from '../services/rating.service';
import { catchError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
  imports: [CommonModule, FeedbackCardComponent],
})
export class DishCardComponent  {
  @Input() id: number = 0;
  @Input() imageUrl: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() attribut: string = '';
  @Input() rating: number = 0;
  @Output() modify = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  stars: number[] = [1, 2, 3, 4, 5];
  showPopup: boolean = false;
  ratings: Rating[] = [];
  ratingService = inject(RatingService);

  
  loadRatings(): void {

    this.ratingService.getRatings(this.id)
      .pipe(
        catchError((error) => {
          console.error('Error fetching ratings:', error);
          throw error;
        })
      )
      .subscribe((data) => {
        this.ratings = data;
      });
  }
  openPopup() {
    this.showPopup = true;
    if (this.id <= 0) {
      console.error('Invalid dish ID:', this.id);
    }else
    this.loadRatings();

  }

  closePopup() {
    this.showPopup = false;
  }

  typeIcons: { [key: string]: string } = {
    Appetizers: 'fas fa-utensils fa-bounce',
    Desserts: 'fas fa-ice-cream fa-bounce',
    'Main Course': 'fas fa-pizza-slice fa-bounce',
  };

  getStarWidth(starIndex: number): string {
    const starValue = this.rating - starIndex;
    if (starValue >= 1) {
      return '100%';
    } else if (starValue <= 0) {
      return '0%';
    } else {
      return `${(starValue * 100).toFixed(2)}%`;
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
