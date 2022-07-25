import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() letter:string = '';
  @Input() row:any='';
  @Input() pos:any='';
  constructor() { }

  ngOnInit(): void {
  }

}
