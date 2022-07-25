import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JAWC';

  conf_tries:number = 6;
  conf_letters:number = 5;
  letter = "";


  tries:number[] = new Array(this.conf_tries);
  positions: number[] = new Array(this.conf_letters);
}
