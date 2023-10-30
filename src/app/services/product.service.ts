import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<Product[]>(this.url);
  }
}
