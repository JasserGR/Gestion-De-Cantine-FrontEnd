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
  showForm: boolean = false; 
  newDish = {
    name: '',
    type: '',
    imageUrl: '',
  };
  dishes: Dish[] = [];
  dishService = inject(DishService);
  isEditMode: boolean = false; 
  selectedDishIndex: number | null = null; 

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
      this.newDish = { name: '', type: '', imageUrl: '' };
      this.isEditMode = false; // Reset to add mode
      this.selectedDishIndex = null; // Clear the selected dish index
    }
  }

  onModifyDish(dish: Dish): void {
    this.newDish = { ...dish }; 
    this.isEditMode = true; 
    this.selectedDishIndex = this.dishes.indexOf(dish); 
    this.showForm = true; 
  }

  onDeleteDish(id:number): void {
    this.dishService.deleteDish(id)
    .pipe(
      catchError((error) => {
        console.error('Error deleting dish:', error);
        alert('Failed to delete the dish. Please try again later.');
        throw error;
      })
    )
    .subscribe((data) => {
      console.log('Dish successfully deleted!');
      this.dishes=this.dishes.filter( (dish) => dish.id !== id); 
    });
  }

  onSaveDish(): void {
    const dish: Omit<Dish, 'id'> = {
      name: this.newDish.name.trim(), 
      type: this.newDish.type || 'Unknown', 
      imageUrl: this.newDish.imageUrl?.trim() || 'default-image-url.png',
      quantity: 0,
      checked: false
    };
  
    if (!dish.name || !dish.type) {
      console.error('Dish name and type are required!');
      alert('Dish name and type are required to save the dish.'); 
      return;
    }
  
    if (this.isEditMode && this.selectedDishIndex !== null) {
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
      this.dishService.addDish(dish)
        .pipe(
          catchError((error) => {
            console.error('Error saving dish:', error);
            alert('Failed to save the dish. Please try again later.');
            throw error; 
          })
        )
        .subscribe((data) => {
          console.log('Dish successfully saved!');
          this.dishes.push(data);
          this.toggleForm(); 
        });
      }
  }
}