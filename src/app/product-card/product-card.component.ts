import { cartItemInterface } from './../models/cartItem.interface';
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
export class ProductCardComponent implements OnInit, OnDestroy {
  showCardIcons: boolean = false;
  actionMessage: string | null = null;
  subscription: Subscription | null = null;
  itemQuantity: number = 0;

  @Input('bookObj') bookObj!: bookInterface
  @Input('hideDescription') hideDescription: boolean = false;
  @Input('clickAble') clickAble: boolean = false;
  @Input('showIcons') showIcons: boolean = false;

  constructor(private shoppingCart: ShoppingCartService ){}


  async addToCart(event: Event, bookToAdd: bookInterface){
    event.stopPropagation();
    this.actionMessage = 'Added to Cart';
    this.shoppingCart.addToCart(bookToAdd);

  }

  addToFavourite(event: Event, bookToAdd: bookInterface){
    event.stopPropagation();
    this.actionMessage = 'Added to Favourite';
  }

  ngOnInit(): void {
    this.subscription = this.shoppingCart.getCart()
      .subscribe({
      next: (cartItems: cartItemInterface[]) => {
        const item = cartItems?.find( item => item.id == this.bookObj.id);
        this.itemQuantity = item?.quantity ? item.quantity : 0;
      },
      error: err => console.error('getCart() error:', err)
    });
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
  
}
