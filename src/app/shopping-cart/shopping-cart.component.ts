import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { cartItemInterface } from '../models/cartItem.interface';
import { bookInterface } from '../models/book.interface';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy{
  errorMessage: string | null = null;
  cartItems: cartItemInterface[] | null = [];
  cartSubscription: Subscription | null = null;
  orderSubscription: Subscription | null = null;
  totalPrice: number = 0;

  constructor(private router: Router, 
              private cartService: ShoppingCartService,
              private orderService: OrderService){}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart()
      .subscribe( cartItems =>{
        this.cartItems = cartItems;
        this.totalPrice = cartItems.reduce( (sum,item) => sum + ( (item.price * item.quantity) | 0),0)
      })
  }



  incrementItem(itemToIncrement: bookInterface){
    this.cartService.addToCart(itemToIncrement);

  }

  decrementItem(itemToIncrement: bookInterface){
    this.cartService.removeFromCart(itemToIncrement);

  }

  placeOrder(orderDetails: any){
    const newOrder = {
      items: this.cartItems,
      orderDetails
    } 
       
    this.orderSubscription = this.orderService.storeOrder(newOrder)
      .subscribe({
        next: (something) => {
          console.log(something);
          this.router.navigate(['/order-success']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      })
  }


  ngOnDestroy(): void {
    if(this.cartSubscription)
      this.cartSubscription.unsubscribe();
    if(this.orderSubscription)
      this.orderSubscription.unsubscribe();
  }

}
