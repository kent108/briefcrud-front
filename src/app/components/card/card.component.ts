import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  product!: Product;
  
  ngOnChanges() {
    this.product &&
      this.product.name &&
      this.product.price &&
      this.product.quantity
  }

}