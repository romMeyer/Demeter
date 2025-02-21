import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantUserService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  addPlantUser(plantId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/plants/user`, `${plantId}`);
  }

  waterPlantUser(plantId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/plants/user`, `${plantId}`);
  }

  deletePlantUser(plantId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/plants/user/${plantId}`);
  }
}