import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  allCategory: Category[] = [];
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  redirectToProduct() {
    this.router.navigate(['/admin']); // Assurez-vous que la route est correcte.
  }

  formProduct: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    category_id: ['', Validators.required], //
  });

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((categories) => {
      this.allCategory = categories;
    });

    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
        this.formProduct.patchValue(product);
      });
    });
  }

  submit() : void {
    // Envoi du formulaire de création
    // const editProduct: Product = this.formProduct.value; // On récupère les données du formulaire
    // editProduct.category_id = Number(editProduct.category_id); // On convertit l'id de la catégorie en nombre
    // this.productService.updateProduct(editProduct).subscribe(() => {
    //   console.log('mise à jour effectuée');
    //   const submissionModalElement = document.getElementById(
    //     'submissionModal'
    //   ) as HTMLElement;
    //   const submissionModal = new Modal(submissionModalElement);
    //   submissionModal.show();
    //   this.formProduct.reset(); // Reset le formulaire si nécessaire
    // });

    if (this.formProduct.valid && this.product) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.formProduct.value,
        // categories: this.getSelectedCategories(),
      };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        console.log(updatedProduct);
        this.router.navigate(['/admin']); // redirige vers la page d'accueil ou une autre route après la mise à jour
      });
    }
  }
  }

