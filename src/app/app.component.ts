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
  tries:any[] = new Array(this.conf_tries);
  // puedo prescindir de esta variable?
  positions: number[] = new Array(this.conf_letters);

  word:string = "";

  actual_try:number = 0;

  letter = "";


  public start_game() {
    this.conf_letters =  parseInt((document.getElementById('wlength') as HTMLInputElement).value);
    this.conf_tries =  parseInt((document.getElementById('tries') as HTMLInputElement).value);

    this.tries = new Array(this.conf_tries);
    this.positions = new Array(this.conf_letters);

    // Inicializamos array de intentos y palabras usadas:
    for (let i = 0; i < this.conf_tries; i++) {
      this.tries[i] = new Array(this.conf_letters);
      for (let j = 0; j < this.conf_letters; j++) {
        this.tries[i][j] = " ";
      }
    }

    // cogemos una palabra aleatoria gracias a la función del fichero assets/js/dictionary.js
    this.word = get_word(this.conf_letters);
    console.log(this.word);

    this.started = true;
  }


  public check_word() {
    let word = (document.getElementById('word') as HTMLInputElement).value;
    if (word.length > this.conf_letters || word.length<this.conf_letters) {
      alert("Tienes que meter el número de letras exacto: "+this.conf_letters + " letras")
    } else {
      for (let pos = 0; pos < this.conf_letters; pos++) {
        this.tries[this.actual_try][pos] = word.substring(pos,pos+1);
      }
      console.log(this.tries);
      // if (word == this.word) {
      //   console.log("bien");
      // }
      this.actual_try +=1;
    }
    (document.getElementById('word') as HTMLInputElement).value = '';


    if (this.actual_try == this.conf_tries) {
      alert("máximo de intentos utilizados");
      this.started = false;
    }
  }
}

