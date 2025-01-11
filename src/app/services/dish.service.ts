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
  getDailyMenu():Observable<Dish []>{ 
    return this.http.get<Dish[]>(this.baseUrl+"dailyMenu");
  }
  getDish(id: number):Observable<Dish>{
    return this.http.get<Dish>(this.baseUrl+id);
  }
  
  addDish(dish: Dish):Observable<Dish>{
    return this.http.post<Dish>(this.baseUrl,dish);
  }
  deleteDish(id: number):Observable<Dish>{
    return this.http.delete<Dish>(this.baseUrl+id);
  }

  modifyDish(dish: Dish):Observable<Dish>{
    return this.http.put<Dish>(this.baseUrl+dish.id,dish);
  }

  
}
