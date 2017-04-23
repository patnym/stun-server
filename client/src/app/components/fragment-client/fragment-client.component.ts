import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragment-client',
  templateUrl: './fragment-client.component.html',
  inputs: ['model'],
  styleUrls: ['./fragment-client.component.css']
})
export class FragmentClientComponent implements OnInit {

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

}
