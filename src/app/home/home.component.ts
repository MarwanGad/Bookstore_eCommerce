import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable, Subscription } from 'rxjs';
import { bookInterface } from '../models/book.interface';
import { AnimationOptions} from 'ngx-lottie';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  books$: Observable<bookInterface[]>;
  subscription: Subscription | null = null;

  desktopView: boolean =  true;

  loading = true;
  options: AnimationOptions = {
    path: '/Book.json'
  };
    
  @HostListener('window:resize')
  onResize(){
    if(window.innerWidth <= 800)
      this.desktopView = false;
    else{
      this.desktopView = true;
    }
  }

  constructor(private bookService: BookService, private cartService: ShoppingCartService){
     this.books$ = this.bookService.getAllBooks();
      this.books$.subscribe({
        next: () => this.loading = false
      })
  }   
  
  ngOnInit(): void {
    this.onResize();
  }
  
}
