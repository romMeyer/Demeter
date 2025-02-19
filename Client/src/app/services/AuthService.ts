import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoginUserDto } from '../core/Dto/LoginUserDto';
import { RegisterUserDto } from '../core/Dto/RegisterDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../core/enum/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      const role: Role = decodedToken.role;
      this.currentUserSubject.next({ token, role });
      console.log("Utilisateur récupéré depuis le stockage:", { token, role });
    }
  }
  

  login(login: LoginUserDto): void {
    this.http.post<any>(this.apiUrl + "/login", login).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        localStorage.setItem('token', response.token);
  
        // Décoder le token pour obtenir le rôle
        const decodedToken: any = this.jwtHelper.decodeToken(response.token);
        const role: Role = decodedToken.role;  
  
        // Mettre à jour le BehaviorSubject
        this.currentUserSubject.next({ token: response.token, role });
  
        console.log("Utilisateur mis à jour dans AuthService:", { token: response.token, role });
      },
      error: (error) => {
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
        const role: Role = decodedToken.role;  // Assigner à une variable de type UserRole

        // Mettre à jour le BehaviorSubject
        this.currentUserSubject.next({ token: response.token, role });
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription:', error);
      }
    });
  }

  // Méthode pour obtenir le rôle de l'utilisateur depuis le token
  getUserRole(): Role {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log("HAAAAA ", decodedToken)
      return decodedToken.role as Role;  // Retourner le rôle en tant que UserRole
    }
    return Role.GUEST; // Si aucun token n'est présent, retourner un rôle par défaut (ex: GUEST)
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
    this.currentUserSubject.next(null); // Réinitialiser l'utilisateur actuel
  }
}
