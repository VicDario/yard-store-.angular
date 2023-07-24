import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map, switchMap } from 'rxjs/operators'

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

import { environment } from 'src/environments/environment';
import { throwError, zip } from 'rxjs';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3),
      map((products) => {
        return products.map(item => {
          return {
            ...item,
            taxes: item.price * 0.19,
          }
        })
      })
    );
  }

  get(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.BadGateway) {
          return throwError(new Error('Something wrong happend!'))
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(new Error('Product not found!'))
        }
        return throwError(new Error('Something wrong happend!'))
      })
    );
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`)
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.get(id),
      this.update(id, dto)
    );
  }

  getProductAndUpdate(id: string, dto: UpdateProductDTO){
    return this.get(id)
      .pipe(
        switchMap((product) => this.update(product.id, dto))
      )
  }
}
