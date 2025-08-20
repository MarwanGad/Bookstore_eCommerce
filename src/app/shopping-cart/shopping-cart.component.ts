import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { cartItemInterface } from '../models/cartItem.interface';
import { bookInterface } from '../models/book.interface';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy{

  cartItems: cartItemInterface[] | null = [];
  subscription: Subscription | null = null;
  totalPrice: number = 0;

  constructor(private router: Router, private cartService: ShoppingCartService){}

  ngOnInit(): void {
    this.subscription = this.cartService.getCart()
      .subscribe( cartItems =>{
        this.cartItems = cartItems;
        this.totalPrice = cartItems.reduce( (sum,item) => sum + ( (item.price * item.quantity) | 0),0)
      })
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  incrementItem(itemToIncrement: bookInterface){
    this.cartService.addToCart(itemToIncrement);

  }

  decrementItem(itemToIncrement: bookInterface){
    this.cartService.removeFromCart(itemToIncrement);

  }


}
