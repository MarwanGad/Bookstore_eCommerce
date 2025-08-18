import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
  standalone: false
})
export class TitlePipe implements PipeTransform {

  transform(value: String) {
    if(!value) return null;
    if(value.startsWith(' ')){
      value = value.trimStart();
    }
    let words = value.split(' ');

    for(let index = 0; index < words.length; index++){
      if(this.isPreposition(words[index]) && index !==0 ){
        words[index] = words[index].toLowerCase();
      }else
         words[index] = this.toTitleCase(words[index]); 
    }
    return words.join(' ').substring(0,50);
  }
  private isPreposition(word: string): boolean{
    let preposition = [
      'of',
      'the'
    ]
    return preposition.includes(word.toLowerCase());
  }

  private toTitleCase(word:string): string{
    return word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase();

  }
}