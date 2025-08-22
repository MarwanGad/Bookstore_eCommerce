import { bookInterface } from './../models/book.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  standalone: false,
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit, OnDestroy{
  favs: bookInterface[] | null = null;
  subscription: Subscription | null = null;
  constructor(private favService: FavouriteService, private cartService: ShoppingCartService){}

  ngOnInit(): void {
    this.subscription = this.favService.getFav()
      .subscribe( (favs: bookInterface[] ) => {
        this.favs = favs;
      })
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  addToCart(book: bookInterface){
    this.cartService.addToCart(book);
  }
}
