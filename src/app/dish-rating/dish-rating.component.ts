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
  searchQuery: string = ''; // Search query for filtering dishes

  // Sample dish data
  dishService = inject(DishService);
  ratingService = inject(RatingService);
  dishes: Dish[] = [];

  ngOnInit(): void {
    this.loadDishes(); // Charger les plats et leurs évaluations
  }

  // Méthode pour charger les plats et leurs évaluations
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
        this.dishes = data; // Stocker les plats récupérés
        this.loadRatings(); // Charger les évaluations pour chaque plat
      });
  }

  // Méthode pour charger les évaluations (moyenne des étoiles) pour chaque plat
  loadRatings(): void {
    this.dishes.forEach((dish) => {
      this.ratingService.getAverageRatingForDish(dish.id).subscribe(
        (averageRating: number) => {
          dish.ratingAverage = averageRating; // Ajouter la moyenne des étoiles au plat
        },
        (error) => {
          console.error('Error fetching rating for dish:', dish.id, error);
        }
      );
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
