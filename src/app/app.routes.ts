import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { DailyMenuManagementComponent } from './daily-menu-management/daily-menu-management.component';
import { DishRatingComponent } from './dish-rating/dish-rating.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'dish-management', component: DishManagementComponent },
  { path: 'daily-menu-management', component: DailyMenuManagementComponent },
  { path: 'dish-rating', component:DishRatingComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'Home', component: HomeComponent },
  { path: '**', redirectTo: '/login' } 
];

export const AppRoutes = RouterModule.forRoot(routes); 