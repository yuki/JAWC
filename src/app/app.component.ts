import { Component} from '@angular/core';
import { LetterComponent } from './components/letter/letter.component';
declare var get_word: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  title = 'JAWC';

  started = false;

  //variables de inicio
  conf_tries:number = 6;
  conf_letters:number = 5;
  tries:any[] = new Array(this.conf_tries);
  // puedo prescindir de esta variable?
  positions: number[] = new Array(this.conf_letters);

  //palabra para acertar
  word:string = "";

  actual_try:number = 0;

  letter = "";


  public start_game() {
    this.conf_letters =  parseInt((document.getElementById('wlength') as HTMLInputElement).value);
    this.conf_tries =  parseInt((document.getElementById('tries') as HTMLInputElement).value);

    this.tries = new Array(this.conf_tries);
    this.positions = new Array(this.conf_letters);
    this.reset_game();
    this.started = true;
  }


  public check_input() {
    let word = (document.getElementById('word') as HTMLInputElement).value;
    if (word.length > this.conf_letters || word.length<this.conf_letters) {
      alert("Tienes que meter el número de letras exacto: "+this.conf_letters + " letras")
    } else {
      for (let pos = 0; pos < this.conf_letters; pos++) {
        // this.tries[this.actual_try][pos] = word.substring(pos,pos+1);
        this.tries[this.actual_try][pos] = new Array(2);
      }
      this.check_word(word);
      this.actual_try +=1;
    }
    (document.getElementById('word') as HTMLInputElement).value = '';

    /*
     FIXME: esto es una guarrada. En lugar de esperar 300ms habría que saber esperar a que la vista
     del hijo terminase de pintar para asegurar si el juego debe terminar o no.
     Pero como hace lo que necesito, ya se encargará mi "yo del futuro" de arreglarlo.
    */
    setTimeout(() => {
      if (word == this.word) {
        let play_again = confirm("HAS ACERTADO! Quieres volver a jugar");
        if (play_again) {
          this.reset_game();
        }
      }

      if (this.actual_try == this.conf_tries) {
        let play_again = confirm("Has fallado! Quieres volver a jugar");
        if (play_again) {
          this.reset_game();
        }
      }
    }, 300)


  }

  /*
    Comprueba letra a letra la palabra introducida para modificar el array que luego pinta
    las letras.
  */
  public check_word(input_word:string) {
    for (let pos = 0; pos < this.conf_letters; pos++) {
      let letter=input_word.substring(pos,pos+1);
      this.tries[this.actual_try][pos][0] = letter;
      this.tries[this.actual_try][pos][1] = 'no';
      if (letter == this.word.substring(pos,pos+1)){
        this.tries[this.actual_try][pos][1] = 'ok';
        continue;
      }
      if (this.word.includes(letter)){
        this.tries[this.actual_try][pos][1] = 'exists';
      }
    }
  }

  public reset_game() {
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

    // reiniciamos el número de intentos
    this.actual_try = 0;
  }

}
