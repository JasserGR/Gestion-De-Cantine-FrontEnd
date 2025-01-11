import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';
import { Dish } from '../models/dish.type';
import { DishService } from '../services/dish.service';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-dish-rating',
  standalone: true,
  imports: [DishCardComponent, FormsModule, CommonModule],
  templateUrl: './dish-rating.component.html',
  styleUrl: './dish-rating.component.css',
})
export class DishRatingComponent {
  searchQuery: string = ''; // Search query for filtering dishes
  rating: number = 3.6;

  // Sample dish data
  dishService = inject(DishService);
  dishes: Dish[] = [];

  ngOnInit(): void {
    this.dishService
      .getDishes()
      .pipe(
        catchError((error) => {
          console.error('Error fetching dishes:', error);
          throw error;
        })
      )
      .subscribe((data) => {
        data.map((dish) => {
          this.dishes.push(dish);
        });
      });
  }

  get filteredDishes() {
    return this.dishes.filter((dish) =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearch() {
    console.log('Search query:', this.searchQuery);
  }
}
