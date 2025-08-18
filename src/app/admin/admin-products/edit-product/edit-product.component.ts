import { GenreInterface } from '../../../models/genre.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { bookInterface } from '../../../models/book.interface';
import { BookService } from './../../../services/book.service';
import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { take } from 'rxjs';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  genres$: Observable<GenreInterface[]>;
  bookToEdit: bookInterface ={
    id: '',
    title: '',
    author: '',
    price: 0,
    imgUrl: '',
    genre: '',
    description: ''
  }

  constructor(
    private genre: GenreService,
    private book: BookService,
    private route: ActivatedRoute,
    private router: Router){
    const bookId = this.route.snapshot.paramMap.get('id');

    this.book.getBook(bookId).pipe(
      take(1)
    ).subscribe( book => {
      this.bookToEdit = book!;
      console.log(this.bookToEdit);
    });

    this.genres$ = this.genre.getAllGenres();
  }

  updateBook(bookToUpdate: bookInterface){
    if(this.bookToEdit.id)
      this.book.updateBook(bookToUpdate,this.bookToEdit.id);
      this.router.navigate(['/admin/products']);
  }

  deleteBook(){
    this.book.deleteBook(this.bookToEdit.id)
      .subscribe({
        next: (response) => console.log('success',response),
        error: (e) => console.log(e)
      })
      
      this.router.navigate(['/admin/products']);
    }




}
