import { Observable } from 'rxjs';
import { bookInterface } from './../models/book.interface';
import { BookService } from './../services/book.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  book$: Observable<bookInterface>;
  
  constructor(private book:BookService,
              private route: ActivatedRoute, 
              private cartService: ShoppingCartService,
              private favSerivce: FavouriteService){

    const bookId= this.route.snapshot.paramMap.get('id');
    this.book$  = this.book.getBook(bookId);
  }

  addItemToCart(bookToAdd: bookInterface){
    this.cartService.addToCart(bookToAdd);
  }
  addItemToFav(bookToAdd: bookInterface){
    this.favSerivce.addToFav(bookToAdd);
  }


}
