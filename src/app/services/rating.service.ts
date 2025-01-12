import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/rating/';

  getAverageRatingForDish(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'dish-average/' + id);
  }
  constructor() {}
}
