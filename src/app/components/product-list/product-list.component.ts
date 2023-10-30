import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products! : Product[];

  constructor(private productService: ProductService) { }

  ngOnChanges() {
    this.products &&
      this.products.length > 0 &&
      this.products[0].name &&
      this.products[0].price &&
      this.products[0].quantity
  }
}
