import { Component, inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish.type';
import { catchError } from 'rxjs';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DishCardComponent , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
      dishService=inject(DishService);
      dailyDish: Dish[] = [];
    
      ngOnInit(): void {
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
