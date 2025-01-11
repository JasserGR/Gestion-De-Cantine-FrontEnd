import { Component } from '@angular/core';


import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { DishCardComponent } from "../dish-card/dish-card.component";
import { CommonModule } from '@angular/common';

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
  dishes = [
    {
      imageUrl: '/images/plat.png',
      type: 'Entele',
      name: 'Fresh Strawberries'
    },
    {
      imageUrl: '/images/plat.png',
      type: 'Dessert',
      name: 'Chocolate Cake'
    },
    {
      imageUrl: '/images/plat.png',
      type: 'Pizza',
      name: 'Margherita Pizza'
    },
    {
      imageUrl: '/images/plat.png',
      type: 'Burger',
      name: 'Cheeseburger'
    },
    // Add more dishes here
  ];

  // Get filtered dishes based on search query
  get filteredDishes() {
    return this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Handle search input
  onSearch() {
    console.log('Search query:', this.searchQuery);
  }

  // Handle modify button click
  onModifyDish(dish: any) {
    console.log('Modify dish:', dish.name);
    // Add your modify logic here
  }

  // Handle delete button click
  onDeleteDish(dish: any) {
    console.log('Delete dish:', dish.name);
    // Add your delete logic here
  }
}

