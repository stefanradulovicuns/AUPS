import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionOrder } from '../models/productionOrder';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductionOrderService {

  constructor(private httpClient: HttpClient) { }

  getProductionOrders(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<ProductionOrder[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<ProductionOrder[]>(`${BACKEND_URL}ProductionOrder`, { params: queryParams, headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  getProductionOrderById(id: string): Observable<ProductionOrder> {
    return this.httpClient.get<ProductionOrder>(`${BACKEND_URL}ProductionOrder/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  createProductionOrder(productionOrder: ProductionOrder): Observable<ProductionOrder> {
    return this.httpClient.post<ProductionOrder>(`${BACKEND_URL}ProductionOrder`, productionOrder, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  updateProductionOrder(productionOrder: ProductionOrder): Observable<ProductionOrder> {
    return this.httpClient.put<ProductionOrder>(`${BACKEND_URL}ProductionOrder`, productionOrder, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  finishCurrentTechnologicalProcedure(productionOrder: ProductionOrder): Observable<ProductionOrder> {
    return this.httpClient.put<ProductionOrder>(`${BACKEND_URL}ProductionOrder/finishCurrentTechnologicalProcedure`, productionOrder, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
  }

  deleteProductionOrder(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}ProductionOrder/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }
}
