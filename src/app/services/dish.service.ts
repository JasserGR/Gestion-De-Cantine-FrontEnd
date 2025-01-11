import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dish } from '../models/dish.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  http=inject(HttpClient);
  private baseUrl ="http://localhost:3000/dish/";
  getDishes():Observable<Dish []>{ 
    return this.http.get<Dish[]>(this.baseUrl);
  } 
}
