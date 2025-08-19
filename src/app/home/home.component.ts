import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';
import { bookInterface } from '../models/book.interface';
import { AnimationOptions} from 'ngx-lottie';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books$: Observable<bookInterface[]>;

  loading = true;
  options: AnimationOptions = {
    path: '/Book.json'
  };
    
  constructor(private bookService: BookService){
     this.books$ = this.bookService.getAllBooks();
      this.books$.subscribe({
        next: () => this.loading = false
      })
  }
  
}
