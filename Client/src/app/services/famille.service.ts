import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilleDto } from '../core/Dto/FamilleDto';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getFamilles(): Observable<FamilleDto[]>{
    return this.http.get<FamilleDto[]>(`${this.apiUrl}/api/familles`);
  }
}
