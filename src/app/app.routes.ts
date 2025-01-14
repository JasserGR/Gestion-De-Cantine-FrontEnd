import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { DailyMenuManagementComponent } from './daily-menu-management/daily-menu-management.component';
import { DishRatingComponent } from './dish-rating/dish-rating.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { 
    path: 'login', 
    component: LoginComponent,
    data: { animation: 'LoginPage' } 
  }, 
  { 
    path: 'dish-management', 
    component: DishManagementComponent,
    data: { animation: 'DishManagementPage' } 
  },
  { 
    path: 'daily-menu-management', 
    component: DailyMenuManagementComponent,
    data: { animation: 'DailyMenuManagementPage' } 
  },
  { 
    path: 'dish-rating', 
    component: DishRatingComponent,
    data: { animation: 'DishRatingPage' } 
  },
  { 
    path: 'about-us', 
    component: AboutUsComponent,
    data: { animation: 'AboutUsPage' } 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    data: { animation: 'HomePage' } 
  },
  { path: '**', redirectTo: '/login' } 
];

export const AppRoutes = RouterModule.forRoot(routes);