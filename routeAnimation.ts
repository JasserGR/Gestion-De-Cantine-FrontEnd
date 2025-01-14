import { trigger, transition, style, query, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }),
    ], { optional: true }), 
    query(':enter', [
      animate('0.3s ease-in', style({ opacity: 1 })),
    ], { optional: true }),
  ]),
]);