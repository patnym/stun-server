import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'app-fragment-client',
  inputs: ['model'],
  templateUrl: './fragment-client.component.html',
  styleUrls: ['./fragment-client.component.css']
})
export class FragmentClientComponent implements OnInit {

  model: ClientModel;

  @Output() delete:EventEmitter<string> = new EventEmitter();

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.model._id);
  }

}
