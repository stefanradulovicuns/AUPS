import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../constants';
import { ProductionPlan } from '../models/productionPlan';

@Injectable({
  providedIn: 'root'
})
export class ProductionPlanService {

  constructor(private httpClient: HttpClient) { }

  getProductionPlans(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<ProductionPlan[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<ProductionPlan[]>(`${BACKEND_URL}ProductionPlan`, { params: queryParams });
  }

  getProductionPlanById(id: string): Observable<ProductionPlan> {
    return this.httpClient.get<ProductionPlan>(`${BACKEND_URL}ProductionPlan/${id}`);
  }

  createProductionPlan(productionPlan: ProductionPlan): Observable<ProductionPlan> {
    return this.httpClient.post<ProductionPlan>(`${BACKEND_URL}ProductionPlan`, productionPlan);
  }

  updateProductionPlan(productionPlan: ProductionPlan): Observable<ProductionPlan> {
    return this.httpClient.put<ProductionPlan>(`${BACKEND_URL}ProductionPlan`, productionPlan);
  }

  deleteProductionPlan(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}ProductionPlan/${id}`);
  }
}
