import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.type';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/rating/';

  getAverageRatingForDish(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'dish-average/' + id);
  }

  getBestFeedbacks(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.baseUrl + 'top-feedbacks');
  }
  getRatings(id:number): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.baseUrl+'dish/'+id);
  }
}
