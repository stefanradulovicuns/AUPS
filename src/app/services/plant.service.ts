import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../constants';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private httpClient: HttpClient) { }

  getPlants(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<Plant[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<Plant[]>(`${BACKEND_URL}Plant`, { params: queryParams });
  }

  getPlantById(id: string): Observable<Plant> {
    return this.httpClient.get<Plant>(`${BACKEND_URL}Plant/${id}`);
  }

  createPlant(plant: Plant): Observable<Plant> {
    return this.httpClient.post<Plant>(`${BACKEND_URL}Plant`, plant);
  }

  updatePlant(plant: Plant): Observable<Plant> {
    return this.httpClient.put<Plant>(`${BACKEND_URL}Plant`, plant);
  }

  deletePlant(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}Plant/${id}`);
  }
}
