import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanteService {
  private jsonUrl = './assets/plantes.json';

  constructor(private http: HttpClient) { }

  getPlantes(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}