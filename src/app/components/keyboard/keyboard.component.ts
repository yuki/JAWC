import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @Input() keyboard_status:any = '';
  @Output() public pulsado = new EventEmitter();

  keyboard:any[] = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L','Ñ'],
    ['ENTER','Z','X','C','V','B','N','M','DEL']
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public send_to_father(letter:string):void {
    this.pulsado.emit(letter);
  }
}
