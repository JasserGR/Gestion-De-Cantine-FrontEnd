import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.css'
})
export class FeedbackCardComponent {
    @Input() title: string = 'Great Work';
    @Input() nameUser: string = '';
    @Input() feedback: string = '';
    @Input() rating: number = 0;
    @Input() imageUrl: string = '/images/userImage.jpg';
    @Input() cardType: 'homepage' | 'popup' = 'homepage'; 

    stars: number[] = [1, 2, 3, 4, 5]; 

    getStarWidth(starIndex: number): string {
      const starValue = this.rating - starIndex; 
      if (starValue >= 1) {
        return '100%'; 
      } else if (starValue <= 0) {
        return '0%'; 
      } else {
        return `${(starValue * 100).toFixed(2)}%`;
      }
    }

}
