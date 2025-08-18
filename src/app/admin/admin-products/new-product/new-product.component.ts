import { Observable } from 'rxjs';
import { GenreService } from './../../../services/genre.service';
import { Component} from '@angular/core';
import { bookInterface } from '../../../models/book.interface';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { GenreInterface } from '../../../models/genre.interface';

@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  genres$: Observable<GenreInterface[]>;

  constructor(private router: Router,private genreService: GenreService, private bookService : BookService ){
    this.genres$ = this.genreService.getAllGenres();
  }


  addBook(book: bookInterface){
    this.bookService.storeBook(book)
      .subscribe( ()=>{
        this.router.navigate(['/admin/products']);
      });
    console.log(book);
  }

}
