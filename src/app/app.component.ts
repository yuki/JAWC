import { computeMsgId } from '@angular/compiler';
import { Component} from '@angular/core';
import { LetterComponent } from './components/letter/letter.component';
// funciones de los ficheros javascript: FIXME: habría que mejorarlo.
declare var get_word: any;
declare var exists_word: any;
declare var show_modal: any;
declare var hide_modal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    // evento al presionar las teclas
    '(document:keyup)': 'check_input($event.key)'
  }
})

export class AppComponent  {
  title = 'JAWC';

  started = false;

  //variables de inicio
  option_tries:Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12]
  conf_tries:number = 6;
  conf_letters:number = 5;
  /*
    tries es un array bidimensional:
      1ª: el número de intentos que ha elegido el usuario
      2ª: por cada intento, la palabra introducida por el usuario y que hay que comprobar
        - Esta parte tiene 2 posiciones también: 1ª la letra, 2ª si es OK, existe o no en la palabra.
  */
  tries:any[] = new Array(this.conf_tries);

  // para el estado del teclado
  keyboard:any = {}
  //palabra para acertar
  word:string = "";

  actual_try:number = 0;
  actual_word:string = '';

  letter = "";


  /*
   *  Empieza el juego al pulsarse el botón.
   *
  */
  public start_game() {
    //cogemos de los inputs lo elegido por el jugador
    this.conf_letters =  parseInt((document.getElementById('wlength') as HTMLInputElement).value);
    this.conf_tries =  parseInt((document.getElementById('tries') as HTMLInputElement).value);

    this.tries = new Array(this.conf_tries);
    this.reset_game();
    this.started = true;
  }


  /*
   *  vamos comprobando lo que se introduce en el campo de texto. (a extinguir)
   *
  */
  public check_input(key:any) {
    if (this.started){
      // ignoramos Enter, Borrar, sólo permitimos las teclas y sólo si el tamaño de la palabra es menor a lo que se quiere.
      // El "key.length == 1" es para ignorar teclas especiales. FIXME: habría que ver cómo admitir las tildes.
      // TODO: se podría poner una REGEXP para que sólo se acepten letras...
      if (key != 'Enter' && key != 'Backspace' && key != 'DEL' && key.length == 1 && this.actual_word.length<this.conf_letters) {
        this.actual_word += key;
      } else if (key == 'Backspace' || key == 'DEL'){
        this.actual_word = this.actual_word.substring(0,this.actual_word.length-1)
      }

      this.actual_word = this.actual_word.toUpperCase();

      // rellenamos el array para que aparezcan las letras
      for (let pos = 0; pos < this.conf_letters; pos++) {

        this.tries[this.actual_try][pos][0] = this.actual_word.substring(pos,pos+1);
      }

      // sólo validamos la palabra si se da a enter
      if (key == 'Enter') {
        this.check_word();
      }
    }
  }

  /*
   *  Comprueba la palabra introducida.
   *  =================================
   *  Se asegura que se han metido todas las letras
   *  y comprueba que la palabra existe en el diccionario
  */
  public check_word() {
    if (this.actual_word.length == this.conf_letters){
      if (exists_word(this.actual_word.toLowerCase(),this.conf_letters)) {
        for (let pos = 0; pos < this.actual_word.length; pos++) {
          let letter=this.actual_word.substring(pos,pos+1);
          this.tries[this.actual_try][pos][0] = letter;

          this.tries[this.actual_try][pos][1] = '';

          if (letter == this.word.substring(pos,pos+1)){
            this.tries[this.actual_try][pos][1] = 'ok';
            this.keyboard[letter.toUpperCase()] = 'ok';
            continue;
          }
          if (this.word.includes(letter)){
            this.tries[this.actual_try][pos][1] = 'exists';
            this.keyboard[letter.toUpperCase()] = 'exists';
            continue;
          }
          this.tries[this.actual_try][pos][1] = 'no';
          this.keyboard[letter.toUpperCase()] = 'no';
        }
        // sumamos el intento
        this.actual_try +=1;
          /*
        FIXME: esto es una guarrada. En lugar de esperar 300ms habría que saber esperar a que la vista
        del hijo terminase de pintar para asegurar si el juego debe terminar o no.
        Pero como hace lo que necesito, ya se encargará mi "yo del futuro" de arreglarlo.
        */
        setTimeout(() => {
          if (this.actual_word == this.word) {
            let play_again = confirm("¡HAS ACERTADO! ¿Quieres volver a jugar?");
            if (play_again) {
              this.reset_game();
            }
          } else {
            this.actual_word = '';
          }

          if (this.actual_try == this.conf_tries) {
            let play_again = confirm("¡Has fallado! ¿Quieres volver a jugar?");
            if (play_again) {
              this.reset_game();
            }
          }
        }, 300)
      } else {
        // saca el error de que la palabra no existe
        show_modal();
        setTimeout(() => {
          hide_modal();
        }, 2000)
      }
    }
  }

  /*
   *
   * Reseteamos el juego. Reiniciamos las variables para que se pueda
   * volver a jugar.
   */
  public reset_game() {
    this.actual_word = '';
    // Inicializamos array de intentos y palabras usadas:
    for (let i = 0; i < this.conf_tries; i++) {
      this.tries[i] = new Array(this.conf_letters);
      for (let j = 0; j < this.conf_letters; j++) {
        this.tries[i][j] = new Array(2);
        this.tries[i][j][0] = "";
      }
    }

    // reset del teclado
    for (let key of Object.keys(this.keyboard)) {
      this.keyboard[key] = '';
    }

    // cogemos una palabra aleatoria gracias a la función del fichero assets/js/dictionary.js
    this.word = get_word(this.conf_letters).toUpperCase();
    // FIXME: Sólo los hackers lo verán :p y  para debuggear es útil
    console.log(this.word);

    // reiniciamos el número de intentos
    this.actual_try = 0;
  }

}
