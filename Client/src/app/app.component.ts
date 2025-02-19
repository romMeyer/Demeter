import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { PlantesModule } from './pages/plantes/plantes.module';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { Role } from './core/enum/Role';
import { AuthService } from './services/AuthService';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    PlantesModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppComponent {
  title : String = 'Demeter';

  isLoggedIn: boolean = false;
  userRole: Role = Role.GUEST;
  currentUserSubscription!: Subscription;
  cdRef: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Initialisation de la navbar");
    
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userRole = this.authService.getUserRole();
      console.log("Utilisateur déjà connecté:", this.userRole);
    }
  
    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      console.log("Mise à jour de la navbar:", user);
      
      this.isLoggedIn = !!user;
      this.userRole = user ? user.role : Role.GUEST;
    });
    this.cdRef.detectChanges(); // ✅ Force la mise à jour de la navbar
  }
  

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

}




