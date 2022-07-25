import { Component } from '@angular/core';
import { throwIfEmpty } from 'rxjs';
declare var get_word: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JAWC';

  started = false;

  //variables de inicio
  conf_tries:number = 6;
  conf_letters:number = 5;
  tries:number[] = new Array(this.conf_tries);
  positions: number[] = new Array(this.conf_letters);

  word:string = "";

  actual_try:number = 0;

  letter = "";


  public start_game() {
    this.conf_letters =  parseInt((document.getElementById('wlength') as HTMLInputElement).value);
    this.conf_tries =  parseInt((document.getElementById('tries') as HTMLInputElement).value);
    this.started = true;
    this.tries = new Array(this.conf_tries);
    this.positions = new Array(this.conf_letters);

    this.word = get_word(this.conf_letters);
    console.log(this.word);
  }


  public check_word() {

    this.actual_try +=1;

    if (this.actual_try < this.conf_tries) {
      let word = (document.getElementById('word') as HTMLInputElement).value;
      if (word.length > this.conf_letters) {
        alert("Sólo puedes meter palabras de máximo "+this.conf_letters + " letras")
      } else {
        if (word == this.word) {
          console.log("bien");
        }
      }
    } else {
      alert("máximo de intentos utilizados");
    }
  }
}

