import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<Product[]>(this.url);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }
}
