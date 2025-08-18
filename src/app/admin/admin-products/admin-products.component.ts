import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { bookInterface } from '../../models/book.interface';
import { BookService } from '../../services/book.service';
import { FilterInterface } from '../../models/filter.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})


export class AdminProductsComponent implements OnDestroy, OnInit {
  books: bookInterface[] = [];
  filteredBooks: bookInterface[]= [];
  subscription: Subscription | null = null;
  choosenGenre: string | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute){}

    ngOnInit(): void {
      this.subscription = combineLatest([
        this.bookService.getAllBooks(),
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
    if(this.subscription)
      this.subscription.unsubscribe();
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
