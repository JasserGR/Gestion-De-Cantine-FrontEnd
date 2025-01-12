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
  isEditMode: boolean = false; // Flag to distinguish between add and edit modes
  selectedDishIndex: number | null = null; // Track the index of the dish being edited

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
      this.isEditMode = false; // Reset to add mode
      this.selectedDishIndex = null; // Clear the selected dish index
    }
  }

  onSearch(): void {
    console.log('Search query:', this.searchQuery);
  }

  onModifyDish(dish: Dish): void {
    // Pre-fill the form with existing dish data
    this.newDish = { ...dish }; // Clone to avoid modifying the original object
    this.isEditMode = true; // Indicate edit mode
    this.selectedDishIndex = this.dishes.indexOf(dish); // Track the dish being edited
    this.showForm = true; // Open the form
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
  
    if (this.isEditMode && this.selectedDishIndex !== null) {
      // Edit mode: Update the existing dish
      dish.id = this.dishes[this.selectedDishIndex!].id; // Assign the existing ID
      this.dishService.modifyDish(dish)
        .pipe(
          catchError((error) => {
            console.error('Error updating dish:', error);
            alert('Failed to update the dish. Please try again later.'); // Notify the user
            throw error; // Re-throw the error for further handling if needed
          })
        )
        .subscribe(() => {
          console.log('Dish successfully updated!');
          this.dishes[this.selectedDishIndex!] = dish; // Update the dish in the list
          this.toggleForm(); // Close the form after saving
        });
    } else {
      // Add mode: Add a new dish
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
}