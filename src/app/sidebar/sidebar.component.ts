import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  // Handle logout button click
  onLogout() {
    console.log('User logged out');
    // Add your logout logic here (e.g., clear session, redirect to login page)
    this.router.navigate(['/login']);
  }
}
