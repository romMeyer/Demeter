import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanteService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getPlants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api-open/plants`);
  }

  getUserPlants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/plants/user`);
  }
}