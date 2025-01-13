import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { DailyMenuManagementComponent } from './daily-menu-management/daily-menu-management.component';
import { DishRatingComponent } from './dish-rating/dish-rating.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { 
    path: 'login', 
    component: LoginComponent,
    data: { animation: 'LoginPage' } // Add animation data
  }, 
  { 
    path: 'dish-management', 
    component: DishManagementComponent,
    data: { animation: 'DishManagementPage' } // Add animation data
  },
  { 
    path: 'daily-menu-management', 
    component: DailyMenuManagementComponent,
    data: { animation: 'DailyMenuManagementPage' } // Add animation data
  },
  { 
    path: 'dish-rating', 
    component: DishRatingComponent,
    data: { animation: 'DishRatingPage' } // Add animation data
  },
  { 
    path: 'about-us', 
    component: AboutUsComponent,
    data: { animation: 'AboutUsPage' } // Add animation data
  },
  { 
    path: 'home', 
    component: HomeComponent,
    data: { animation: 'HomePage' } // Add animation data
  },
  { path: '**', redirectTo: '/login' } // Wildcard route for 404
];

export const AppRoutes = RouterModule.forRoot(routes);