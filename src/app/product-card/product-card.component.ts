import { Component, Input } from '@angular/core';
import { bookInterface } from '../models/book.interface';

@Component({
  selector: 'product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input('bookObj') bookObj!: bookInterface

}
