import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, listVal, objectVal, push, ref, set } from '@angular/fire/database';
import { throwError, Observable, from } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private injector = inject(Injector);
  

  constructor(private auth: Auth,
              private db: Database,
              private cartService: ShoppingCartService){}

  storeOrder(order:any){
    const userId = this.auth.currentUser?.uid;
    if(userId){
      const ordersRef =  ref(this.db,'orders');
      const newOrderRef = push(ordersRef);
      this.cartService.removeCartItems();
      return from( set(newOrderRef, {...order , userId: userId, createdOn: new Date().getFullYear() } ) ); 
    }
    else{
      return throwError(() => new Error('Log in to proceed with your order.'));
    } 
  }

  getAllOrders(){
    const ordersRef = ref(this.db,'orders');
    return runInInjectionContext(this.injector, () => listVal(ordersRef , {keyField: 'id'}) ) 
  }

  getOrder(id: string){
    const orderRef = ref(this.db, `orders/${id}`);
    return runInInjectionContext(this.injector, () => objectVal(orderRef)) 
  }
}
