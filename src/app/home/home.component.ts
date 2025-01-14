import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish.type';
import { catchError } from 'rxjs';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RatingService } from '../services/rating.service';
import { Rating } from '../models/rating.type';
import { FeedbackCardComponent } from '../components/feedback-card/feedback-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DishCardComponent, CommonModule, RouterLink, FeedbackCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dishService = inject(DishService);
  ratingService = inject(RatingService);
  dailyDish: Dish[] = [];
  bestRatings: Rating[] = [];
  userRole: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = localStorage.getItem('role');
    }
    this.loadDailyMenu()
    this.loadBestFeedbacks()
  }

  loadDailyMenu(): void {
    this.dishService.getDailyMenu()
      .pipe(
        catchError((error) => {
          console.error('Error fetching Daily Menu:', error);
          throw error;
        }
        ))
      .subscribe((data) => {
        data.map((dish) => {
          this.dailyDish.push(dish);
        });
      })
  }

  loadBestFeedbacks(): void {
    this.ratingService.getBestFeedbacks()
      .pipe(
        catchError((error) => {
          console.error('Error fetching Best Feedbacks:', error);
          throw error;
        }
        ))
      .subscribe((data) => {
        this.bestRatings = data;
      })
  }
}
