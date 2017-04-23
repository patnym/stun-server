import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'app-fragment-client',
  inputs: ['model'],
  templateUrl: './fragment-client.component.html',
  styleUrls: ['./fragment-client.component.css']
})
export class FragmentClientComponent implements OnInit {

  model: ClientModel;

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

}
