import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';
import { bookInterface } from '../models/book.interface';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books$: Observable<bookInterface[]>;
    
  constructor(private bookService: BookService){
    this.books$ = bookService.getAllBooks()
  }
  
}
