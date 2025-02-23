import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantUserService {
  private apiUrl = 'http://localhost:8080'; 
  private plantNeedWateringSubject: BehaviorSubject<any> = new BehaviorSubject<Boolean>(false);
  public plantNeedWatering$ = this.plantNeedWateringSubject.asObservable();

  constructor(private http: HttpClient) { }

  addPlantUser(plantId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/plants/user`, `${plantId}`);
  }

  waterPlantUser(plantId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/plants/user`, `${plantId}`);
  }

  deletePlantUser(plantId: number): Observable<any> {
    this.getNumberPlantUserNeedWatering();
    return this.http.delete<any>(`${this.apiUrl}/api/plants/user/${plantId}`);
  } 

  getNumberPlantUserNeedWatering(): void {
    this.http.get<any>(`${this.apiUrl}/api/plants/user/notice`).subscribe({
      next:(response) => {
        this.plantNeedWateringSubject.next(response);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    });
  }
}