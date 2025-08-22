import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenreInterface } from '../models/genre.interface';
import { Observable } from 'rxjs';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  genres$: Observable<GenreInterface[]>;
  @Input('path') path = '';
  @Output('filterChange') filterChange = new EventEmitter<any>();

  constructor(private genre: GenreService){
    this.genres$ =  this.genre.getAllGenres(); 
  }
  

  filter(value: string,option: any){
    this.filterChange.emit({value: value, type: option})
  }

  filterChanged(option:any){
    this.filterChange.emit({type:option});
  }
}
