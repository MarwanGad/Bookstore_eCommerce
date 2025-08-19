import { cartItemInterface } from './../models/cartItem.interface';
import { bookInterface } from './../models/book.interface';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Database, DatabaseReference, get, listVal, objectVal, push, ref, set, update } from '@angular/fire/database';
import { of, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartId: string | null = localStorage.getItem('cartId');

  private db = inject(Database);
  private injector = inject(Injector);
  
  async addToCart(bookToAdd: bookInterface){
    await this.getOrCreateCart();

    const itemRef = ref(this.db, `carts/${this.cartId}/items/${bookToAdd.id}`);
    const item = await this.getItem(itemRef,bookToAdd);
    update(itemRef, { ...bookToAdd, quantity: ((item.val()?.quantity) || 0) + 1 });

  }

  private async getItem( itemRef: DatabaseReference, itemToGet?: bookInterface){
    return await runInInjectionContext(this.injector, () => get(itemRef))
  }

  getQuantity(bookId: string){
    const itemRef = ref(this.db,`carts/${this.cartId}/items/${bookId}`)
    return runInInjectionContext(this.injector, () => 
      objectVal<cartItemInterface>(itemRef)
    ).pipe(
      map((item: cartItemInterface) => item?.quantity ?? 0)
    )
  }

  getAllItemsInCart(){
     const cartsRef = ref(this.db, `carts/${this.cartId}/items`);
      return runInInjectionContext(this.injector, () =>
        listVal<cartItemInterface>(cartsRef)
      );
  }
  
  private async getOrCreateCart(){  
    if( !this.cartId ){
      return await this.createCart();
    }
    else{
      return this.getCart();
    }
  }

  private getCart(){
    return ref(this.db, `carts/${this.cartId}`);
  }


  private async createCart(){
    const cartsRef = ref(this.db,'carts');
    const result = await push(cartsRef,{
      createdAt: new Date().getFullYear()
    })
    if(result.key)
      localStorage.setItem('cartId',result.key);
      this.cartId = localStorage.getItem('cartId'); 
      return ref(this.db,`carts/${this.cartId}`)    
  }

}
