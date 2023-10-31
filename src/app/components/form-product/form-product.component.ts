import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent {
  allCategory: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
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
  }


  submit() {
    // Envoi du formulaire de création

    const newProduct: Product = this.formProduct.value; // On récupère les données du formulaire
    newProduct.category_id = Number(newProduct.category_id); // On convertit l'id de la catégorie en nombre
    console.log(newProduct);

    this.productService.createProduct(newProduct).subscribe(() => {
      console.log('mise à jour effectuée');
      const submissionModalElement = document.getElementById(
        'submissionModal'
      ) as HTMLElement;
      const submissionModal = new Modal(submissionModalElement);
      submissionModal.show();
      this.formProduct.reset(); // Reset le formulaire si nécessaire
    });
  }
}


