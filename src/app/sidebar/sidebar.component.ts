import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  userRole: string | null = null;

  constructor(private router: Router) {}
  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userRole = decodedToken.role;
      
    }
  }
  onLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
