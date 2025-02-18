import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserDto } from '../core/Dto/LoginUserDto';
import { RegisterUserDto } from '../core/Dto/RegisterDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }

  login(login : LoginUserDto): void {
    this.http.post<any>(this.apiUrl + "/login", login).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        localStorage.setItem('token', response.token);
        console.log("Token enregistré:", response.token);
        
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription:', error);
        // Ajoute ici une gestion d'erreur (affichage message, validation...)
      }
    });
  }

  register(register : RegisterUserDto): void {
    this.http.post<any>(this.apiUrl + "/register", register).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        localStorage.setItem('token', response.token);
        console.log("Token enregistré:", response.token);
        
      },
      error: (error) => {
        console.error('Erreur lors de la connnexion:', error);
        // Ajoute ici une gestion d'erreur (affichage message, validation...)
      }
    });
  }
}