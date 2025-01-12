import { Component, inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish.type';
import { catchError } from 'rxjs';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-menu-management',
  standalone: true,
  imports: [DishCardComponent , CommonModule,FormsModule],
  templateUrl: './daily-menu-management.component.html',
  styleUrl: './daily-menu-management.component.css'
})
export class DailyMenuManagementComponent implements OnInit {
  searchQuery: string = ''; 
  dishService = inject(DishService);
  dishes: Dish[] = [];
  dailyDish: Dish[] = [];

  ngOnInit(): void {
    this.loadDishes();
    this.loadDailyMenu();
  }
  loadDishes(): void {
    this.dishService.getDishes()
    .pipe(
      catchError((error) => {
        console.error('Error fetching Daily Menu Management:', error);
        throw error;
      }
      ))
    .subscribe((data) => {
      this.dishes = data.map((dish) => ({
        ...dish,
        isEditing: false, 
      }));
    })

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
  toggleInMenu(dish: Dish): void {
    dish.checked = !dish.checked;
    this.saveQuantity(dish);
  }

  toggleEdit(dish: Dish): void {
    if (dish.isEditing) {
      this.saveQuantity(dish);
    }
    dish.isEditing = !dish.isEditing;
  }

  saveQuantity(dish: Dish): void {
    this.dishService.modifyDish(dish).subscribe({
      next: (response) => {
        console.log('Quantity updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating quantity:', error);
      },
    });
  }

  get filteredDishes() {
    return this.dishes.filter((dish) =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
