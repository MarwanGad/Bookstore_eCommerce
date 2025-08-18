import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Database, listVal, ref } from '@angular/fire/database';
import { GenreInterface } from '../models/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private db: Database){}

  getAllGenres(): Observable<GenreInterface[]>{
    const genresRef = ref(this.db,'genres');
    return listVal<GenreInterface>(genresRef,{ keyField: 'id'});
  }
}
