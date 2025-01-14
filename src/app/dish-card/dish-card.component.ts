import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FeedbackCardComponent } from '../components/feedback-card/feedback-card.component';
import { Rating } from '../models/rating.type';
import { RatingService } from '../services/rating.service';
import { catchError } from 'rxjs';
import { Dish } from '../models/dish.type';
import { DishService } from '../services/dish.service';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
  imports: [CommonModule, FeedbackCardComponent,FormsModule],
  
})
export class DishCardComponent implements OnInit {
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
  dishService = inject(DishService);
  userRole: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object ) { }
  showForm: boolean = false;
  newFeedback = {idDish:0, nbStars:0, feedback:'', idUser:0};
  dishes: Dish[] = [];
  idUser: number = 0;
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = localStorage.getItem('role');
      const token=localStorage.getItem('access_token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.idUser = decodedToken.sub;
      }
    }
    this.loadDishes(); 
  }
  loadDishes(): void {
    this.dishService.getDishes().subscribe(
      (data) => {
        this.dishes = data;
      },
      (error) => {
        console.error('Error fetching dishes:', error);
      }
    );
  }
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

  toggleForm(): void {
    this.closePopup();
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newFeedback = {idDish:0, nbStars:0, feedback:'', idUser:0};
    }
  }

  onSaveFeedback(): void {
    if ( this.newFeedback.nbStars === 0 || !this.newFeedback.feedback) {
      alert('Please fill out all required fields.');
      return;
    }
     this.newFeedback.idDish = this.id;
     this.newFeedback.idUser = this.idUser;
     console.log('newFeedback:', this.newFeedback);
    this.ratingService.addRating(this.newFeedback).subscribe(
      (response) => {
        console.log('Feedback saved successfully:', response);
        this.toggleForm(); 
      },
      (error) => {
        console.error('Error saving feedback:', error);
        alert('Failed to save feedback. Please try again.');
      }
    );
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
