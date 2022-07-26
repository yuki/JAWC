import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {

  @Input() letter:string = '';
  @Input() row:any='';
  @Input() pos:any='';
  constructor() { }

  ngOnInit(): void {
  }

}
