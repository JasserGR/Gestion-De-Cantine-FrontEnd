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
  
    console.log('Saving dish:', dish);
  
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
