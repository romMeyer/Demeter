import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantUserService {
  waterPlant(id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  addPlantUser(plantId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/plants/user`, `${plantId}`);
  }

  waterPlantUser(plantId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/plants/user`, `${plantId}`);
  }
}