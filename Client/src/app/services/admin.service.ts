import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../core/Dto/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/api-admin/users`);
  }

  setUser(user: UserDto): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.apiUrl}/api-admin/user`, user);
  }

  deleteUser(user: UserDto): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api-admin/user`, {body: user});
  }
}