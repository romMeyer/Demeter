import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanteCatalogueDto, PlanteDto } from '../core/Dto/PlanteDto';

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

  getPlantById(plantId: number): Observable<PlanteDto> {
    return this.http.get<PlanteDto>(`${this.apiUrl}/api-open/plants/${plantId}`)
  }
}