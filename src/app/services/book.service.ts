import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Database, push, ref, set, listVal, objectVal, update, remove } from '@angular/fire/database';
import { bookInterface } from '../models/book.interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private db = inject(Database);
  private injector = inject(Injector);
  
  storeBook(book: bookInterface){
    const booksRef = ref(this.db,'books');
    const newBookRef = push(booksRef);
    return from(set(newBookRef,book));
  }

  // getAllBooks(): Observable<bookInterface[]>{
  //   const booksRef = ref(this.db,'books');
  //   return listVal<bookInterface>(booksRef,{keyField: 'id'});
  // }

  getAllBooks(): Observable<bookInterface[]> {
      const booksRef = ref(this.db, 'books');
      return runInInjectionContext(this.injector, () =>
        listVal<bookInterface>(booksRef, { keyField: 'id' })
      );
    }



  getBook(id:string | null): Observable<bookInterface>{
    const bookRef = ref(this.db,`books/${id}`);
    return objectVal(bookRef, {keyField: 'id'});
  }

  updateBook(bookToUpdate: bookInterface, bookId:string ){
    const bookRef = ref(this.db,`books/${bookId}`);
    update(bookRef,bookToUpdate);
  }

  deleteBook(id:string){
    const bookRef = ref(this.db, `books/${id}`);
    return from(remove(bookRef));
  }

}
