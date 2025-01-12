import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishCardComponent } from "../dish-card/dish-card.component";
import { CommonModule } from '@angular/common';
import { Dish } from '../models/dish.type';
import { DishService } from '../services/dish.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-dish-management',
  standalone: true,
  imports: [DishCardComponent, FormsModule, CommonModule],
  templateUrl: './dish-management.component.html',
  styleUrls: ['./dish-management.component.css']
})
export class DishManagementComponent implements OnInit {
  searchQuery: string = '';
  showForm: boolean = false; // Controls the form visibility
  newDish = {
    name: '',
    type: '',
    imageUrl: '',
  };
  dishes: Dish[] = [];
  dishService = inject(DishService);

  ngOnInit(): void {
    this.dishService.getDishes()
      .pipe(
        catchError((error) => {
          console.error('Error fetching dishes:', error);
          throw error;
        })
      )
      .subscribe((data) => {
        this.dishes = data;
      });
  }

  get filteredDishes() {
    return this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      // Reset form when closing
      this.newDish = { name: '', type: '', imageUrl: '' };
    }
  }

  onSearch(): void {
    console.log('Search query:', this.searchQuery);
  }

  onModifyDish(dish: any): void {
    console.log('Modify dish:', dish.name);
  }

  onDeleteDish(dish: any): void {
    console.log('Delete dish:', dish.name);
    this.dishes = this.dishes.filter(d => d !== dish);
  }

  onSaveDish(): void {
    // Ensure the new dish has all required properties
    const dish: Dish = {
      name: this.newDish.name.trim(), // Trim to avoid leading/trailing spaces
      type: this.newDish.type || 'Unknown', // Default type if none is provided
      imageUrl: this.newDish.imageUrl?.trim() || 'default-image-url.png', // Use default if no image is provided
      quantity: 0, // Default quantity
      checked: false // Default checked status
    };
  
    if (!dish.name || !dish.type) {
      console.error('Dish name and type are required!');
      alert('Dish name and type are required to save the dish.'); // Notify the user
      return;
    }
  
    console.log('Saving dish:', dish);
  
    this.dishService.addDish(dish)
      .pipe(
        catchError((error) => {
          console.error('Error saving dish:', error);
          alert('Failed to save the dish. Please try again later.'); // Notify the user
          throw error; // Re-throw the error for further handling if needed
        })
      )
      .subscribe(() => {
        console.log('Dish successfully saved!');
        this.dishes.push(dish); // Add the new dish to the list
        this.toggleForm(); // Close the form after saving
      });
  }
  
  
}
