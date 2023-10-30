import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageAdminComponent {
  @Input()
  products: Product[] = [];
  categorys: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products = data;
    });

    this.categoryService.getCategory().subscribe((data: Category[]) => {
      this.categorys = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe();
  }
}
