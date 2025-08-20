import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { BookService } from './../services/book.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { bookInterface } from '../models/book.interface';
import { FilterInterface } from '../models/filter.interface';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit ,OnDestroy{
  books: bookInterface[] = [];
  filteredBooks: bookInterface[] = [];
  choosenGenre: string | null = null;
  booksSubscription: Subscription | null = null;

  constructor(private book: BookService,
              private route: ActivatedRoute,
              private cartService: ShoppingCartService){}
  
  async ngOnInit(){
    this.booksSubscription = combineLatest([
      this.book.getAllBooks(),
      this.route.queryParamMap
    ]).subscribe(([books,params])=>{
      this.books = books;
      this.choosenGenre = params.get('genre');
      this.filteredBooks = this.choosenGenre ?
        books.filter(book => book.genre.toLowerCase() === this.choosenGenre?.toLowerCase()) :
        books;
    })

  }

  ngOnDestroy(): void {
    if(this.booksSubscription)
      this.booksSubscription.unsubscribe();
  }

  applyFilter(event: FilterInterface){
    switch (event.type) {
      case 'title':
        this.filteredBooks = event.value ?
          this.books.filter(book => book.title.toLowerCase().includes(event.value.toLowerCase())) :
          this.books;
          break;
      case 'author':
        this.filteredBooks = event.value ?
          this.books.filter(book => book.author.toLowerCase().includes(event.value.toLowerCase())) :
          this.books;
        break;
    }
    console.log(event);
  }
}
