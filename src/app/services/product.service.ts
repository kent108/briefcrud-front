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

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.url}/${updatedProduct.id}`,
      updatedProduct,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  createProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}`, newProduct, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
