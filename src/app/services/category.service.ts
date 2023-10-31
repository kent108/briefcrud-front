import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) { }



  getCategory() {
    return this.http.get<Category[]>(this.url);
  }
}
