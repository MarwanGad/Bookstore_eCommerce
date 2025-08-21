import { cartItemInterface } from './../models/cartItem.interface';
import { bookInterface } from './../models/book.interface';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Database, DatabaseReference, get, list, listVal, objectVal, push, ref, remove, set, update } from '@angular/fire/database';
import { of, Observable, map } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private db = inject(Database);
  private injector = inject(Injector);

  cartId: string | null= localStorage.getItem('cartId');
  cartsRef = ref(this.db, 'carts');

  
  async addToCart(bookToAdd: bookInterface){
    this.cartId = localStorage.getItem('cartId');
    if( !this.cartId ){
      this.cartId = this.createCartId();
      localStorage.setItem('cartId',this.cartId);
    }
    
    const itemRef = ref(this.db, `carts/${this.cartId}/items/${bookToAdd.id}`);
    const snapshot = await runInInjectionContext(this.injector, () => get(itemRef));
    const itemValues: cartItemInterface = snapshot.exists() ? snapshot.val() : null;
    
    update(itemRef,{...bookToAdd, quantity: (itemValues?.quantity || 0) + 1 });
  }

  createCartId(): string{
    const result = runInInjectionContext(this.injector, () => {
      return push(this.cartsRef,{createdAt: serverTimestamp()})
    }) 
    return result.key;   
  }

  getCart() {
    if(!this.cartId)
      this.cartId = this.createCartId();
      localStorage.setItem('cartId' , this.cartId);
    const itemsRef = ref(this.db, `carts/${this.cartId}/items`);
    return runInInjectionContext(this.injector, () => 
      listVal<cartItemInterface>(itemsRef)   
    );
  }

  async removeFromCart(bookToRemove: bookInterface){
    const itemRef = ref(this.db, `carts/${this.cartId}/items/${bookToRemove.id}`);
    const snapshot = await runInInjectionContext(this.injector, () => get(itemRef));
    const itemValues: cartItemInterface = snapshot.exists() ? snapshot.val() : null;

    if(itemValues.quantity > 1){
      update(itemRef,{quantity: (itemValues?.quantity - 1) });
    }
    else{
      remove(itemRef);
    }

  }

  removeCartItems(){
    const cartToRemoveRef = ref(this.db, `carts/${this.cartId}/items`);
    remove(cartToRemoveRef);
  }

}
