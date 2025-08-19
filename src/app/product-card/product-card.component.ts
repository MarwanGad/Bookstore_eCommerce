import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bookInterface } from '../models/book.interface';

@Component({
  selector: 'product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy{
  showCardIcons: boolean = false;
  actionMessage: string | null = null;
  quantity: number = 0;
  subscription: Subscription | null = null;

  @Input('bookObj') bookObj!: bookInterface
  @Input('hideDescription') hideDescription: boolean = false;
  @Input('clickAble') clickAble: boolean = false;
  @Input('showIcons') showIcons: boolean = false;

  constructor(private shoppingCart: ShoppingCartService ){}

  ngOnInit(){
    this.subscription = this.shoppingCart.getQuantity(this.bookObj.id)
      .subscribe(itemQuantity => {
        this.quantity = itemQuantity;
      })   
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  async addToCart(event: Event, bookToAdd: bookInterface){
    event.stopPropagation();
    this.actionMessage = 'Added to Cart';
    this.shoppingCart.addToCart(bookToAdd);

  }

  addToFavourite(event: Event, bookToAdd: bookInterface){
    event.stopPropagation();
    this.actionMessage = 'Added to Favourite';
  }
}
