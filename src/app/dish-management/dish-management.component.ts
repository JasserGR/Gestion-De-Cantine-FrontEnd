import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishCardComponent } from "../dish-card/dish-card.component";
import { CommonModule } from '@angular/common';
import { Dish } from '../models/dish.type';
import { DishService } from '../services/dish.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-dish-management',
  standalone: true,
  imports: [DishCardComponent, FormsModule , CommonModule],
  templateUrl: './dish-management.component.html',
  styleUrl: './dish-management.component.css'
})
export class DishManagementComponent {
  searchQuery: string = ''; // Search query for filtering dishes

  // Sample dish data
  dishService=inject(DishService);
  dishes: Dish[] = [];

  ngOnInit(): void {
    this.dishService.getDishes()
    .pipe(
      catchError((error) => {
        console.error('Error fetching dishes:', error);
        throw error;
      }
    ))
    .subscribe((data) => {
      this.dishes = data;
    });
  }

  get filteredDishes() {
    return this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearch() {
    console.log('Search query:', this.searchQuery);
  }

  onModifyDish(dish: any) {
    console.log('Modify dish:', dish.name);
  }

  onDeleteDish(dish: any) {
    console.log('Delete dish:', dish.name);
    // Add your delete logic here
  }
  onAddDish() {
    console.log('Add new dish');
    // Add your logic to add a new dish here
  }
}

