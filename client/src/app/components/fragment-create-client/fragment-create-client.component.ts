import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragment-create-client',
  templateUrl: './fragment-create-client.component.html',
  styleUrls: ['./fragment-create-client.component.css']
})
export class FragmentCreateClientComponent implements OnInit {
  model: any = {
    name: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    
  }

}
