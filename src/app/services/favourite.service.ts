import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Database, listVal, push, ref, set } from '@angular/fire/database';
import { bookInterface } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private db = inject(Database);
  private injector = inject(Injector);

  favsRef = ref(this.db, 'favourites');

  addToFav(bookToAdd: bookInterface){
    const id = localStorage.getItem('cartId');
    if(id && bookToAdd.id){
      const favUserRef = ref(this.db, `favourites/${id}/${bookToAdd.id}`);
      set(favUserRef,bookToAdd);
    }
  }

  getFav() {
    const id = localStorage.getItem('cartId');

    const userFavRef = ref(this.db, `favourites/${id}`);
    return runInInjectionContext(this.injector, () => 
      listVal<bookInterface>(userFavRef)   
    );
  }
 


}
