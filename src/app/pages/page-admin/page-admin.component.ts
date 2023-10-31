import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/guards/auth-guard.guard';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageAdminComponent {
  @Input()
  products: Product[] = [];
  categorys: Category[] = [];
  isUserLoggedIn = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService,
    private authGuard: AuthGuard,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products = data;
    });

    this.categoryService.getCategory().subscribe((data: Category[]) => {
      this.categorys = data;
    });

    this.authGuard.initializeUser();

    this.subscriptions.push(
      this.authGuard.currentUser.subscribe((user) => {
        this.isUserLoggedIn = !!user;
        this.cdr.detectChanges(); // Forcer la détection de changements
      }),
      this.userService.userLoggedIn$.subscribe((isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
        this.cdr.detectChanges(); // Forcer la détection de changements
        // vérification de la présence d'un token dans le local storage
        const token = localStorage.getItem('token');
        if (token) {
          // call API pour vérifier s'il est toujours valide en bonus pour aller plus loin
          this.isUserLoggedIn = true;
        }
      })
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/product-edit', id]);
  }
}
