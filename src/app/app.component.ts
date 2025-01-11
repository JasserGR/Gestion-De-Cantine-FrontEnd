import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Gestion De Cantine';
  showSidebar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.updateSidebarVisibility(this.router.url);
    }, 0);

    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility(event.url);
      }
    });
  }

  
  updateSidebarVisibility(url: string): void {
    
    const normalizedUrl = url.toLowerCase().trim();


    this.showSidebar = !(normalizedUrl === '/login' || normalizedUrl === '');
  }
}