import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dish } from '../models/dish.type';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  http=inject(HttpClient);
  getDishes() {
   const url="http://localhost:3000/dish/";
    return this.http.get<Array<Dish>>(url);
  } 
}
