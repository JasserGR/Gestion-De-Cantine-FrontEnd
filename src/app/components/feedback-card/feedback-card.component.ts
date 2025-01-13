import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.css'
})
export class FeedbackCardComponent {
    @Input() title: string = 'Great Work';
    @Input() nameUser: string = '';
    @Input() feedback: string = '';
    @Input() imageUrl: string = '/images/userImage.jpg';

}
