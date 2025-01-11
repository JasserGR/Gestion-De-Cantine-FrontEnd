import { Component, inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish.type';
import { catchError } from 'rxjs';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-menu-management',
  standalone: true,
  imports: [DishCardComponent , CommonModule],
  templateUrl: './daily-menu-management.component.html',
  styleUrl: './daily-menu-management.component.css'
})
export class DailyMenuManagementComponent implements OnInit {

  dishService = inject(DishService);
  dishes: Dish[] = [];
  dailyDish: Dish[] = [];

  ngOnInit(): void {
    this.dishService.getDishes()
      .pipe(
        catchError((error) => {
          console.error('Error fetching Daily Menu Management:', error);
          throw error;
        }
        ))
      .subscribe((data) => {
        data.map((dish) => {
          this.dishes.push(dish);
        });
      })

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
}
