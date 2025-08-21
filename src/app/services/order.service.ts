import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, push, ref, set } from '@angular/fire/database';
import { from, throwError } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private auth: Auth,
              private db: Database,
              private cartService: ShoppingCartService){}

  storeOrder(order:any){
    const userId = this.auth.currentUser?.uid;
    if(userId){
      const ordersRef =  ref(this.db,'orders');
      const newOrderRef = push(ordersRef);
      this.cartService.removeCartItems();
      return from( set(newOrderRef, {...order , userId: userId}) ); 
    }
    else{
      return throwError(() => new Error('Log in to proceed with your order.'));
    } 
  }
}
