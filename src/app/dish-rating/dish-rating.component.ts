import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';
import { Dish } from '../models/dish.type';
import { DishService } from '../services/dish.service';
import { catchError } from 'rxjs';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-dish-rating',
  standalone: true,
  imports: [DishCardComponent, FormsModule, CommonModule],
  templateUrl: './dish-rating.component.html',
  styleUrl: './dish-rating.component.css',
})
export class DishRatingComponent {
  searchQuery: string = ''; 

  dishService = inject(DishService);
  ratingService = inject(RatingService);
  dishes: Dish[] = [];

  showFilter: boolean = false;
  filterTypes: string[] = ['Main Course', 'Appetizers', 'Desserts']; 
  selectedTypes: string[] = [];

  get filteredDishes() {
    return this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedTypes.length === 0 || this.selectedTypes.includes(dish.type))
    );
  }
  toggleFilter(): void {
    this.showFilter = !this.showFilter; 
  }
  ngOnInit(): void {
    this.loadDishes(); 
  }

  loadDishes(): void {
    this.dishService
      .getDishes()
      .pipe(
        catchError((error) => {
          console.error('Error fetching dishes:', error);
          throw error;
        })
      )
      .subscribe((data) => {
        this.dishes = data; 
        this.loadRatings(); 
      });
  }

  loadRatings(): void {
    this.dishes.forEach((dish) => {
      this.ratingService.getAverageRatingForDish(dish.id).subscribe(
        (averageRating: number) => {
          dish.ratingAverage = averageRating; 
        },
        (error) => {
          console.error('Error fetching rating for dish:', dish.id, error);
        }
      );
    });
  }
  onTypeSelect(type: string): void {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
  }

  onSearch() {
    console.log('Search query:', this.searchQuery);
  }
}
