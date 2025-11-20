import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoginUserDto } from '../core/Dto/LoginUserDto';
import { RegisterUserDto } from '../core/Dto/RegisterDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../core/enum/Role';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<Role>(Role.GUEST);
  public observable$ = this.currentUserSubject.asObservable();
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient, private router: Router, private toastService: ToastService) {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      const roles: Role = decodedToken.roles;
      this.currentUserSubject.next(roles);
      console.log("Utilisateur récupéré depuis le stockage:", { token, roles });
    }

  }


  login(login: LoginUserDto): void {
    this.http.post<any>(this.apiUrl + "/login", login).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        // Décoder le token pour obtenir le rôle
        const decodedToken: any = this.jwtHelper.decodeToken(response.token);
        const roles: Role = decodedToken.roles;

        // Mettre à jour le BehaviorSubject
        this.currentUserSubject.next(roles);
        this.router.navigate(['/plantes']);
      },
      error: (error) => {
        this.toastService.error('mauvais identifiant');
        console.error('Erreur lors de la connexion:', error);
      }
    });
  }

  register(register : RegisterUserDto): void {
    this.http.post<any>(this.apiUrl + "/register", register).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        console.log("Token enregistré:", response.token);

        // Décoder le token pour obtenir le rôle
        const decodedToken: any = this.jwtHelper.decodeToken(response.token);
        const roles: Role = decodedToken.roles;  // Assigner à une variable de type UserRole

        // Mettre à jour le BehaviorSubject
        this.currentUserSubject.next(roles);
        this.router.navigate(['/plantes']);
      },
      error: (error) => {
        this.toastService.error('Internal Server Error');
        console.error('Erreur lors de l’inscription:', error);
      }
    });
  }


  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Méthode pour récupérer l'Observable qui émet l'utilisateur actuel
  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/catalogue']);
    this.currentUserSubject.next(Role.GUEST); // Réinitialiser l'utilisateur actuel
  }

}
