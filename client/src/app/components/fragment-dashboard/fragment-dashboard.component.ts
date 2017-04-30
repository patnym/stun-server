import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';

import { FragmentClientComponent } from './fragment-client/fragment-client.component';
import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './fragment-dashboard.component.html',
  styleUrls: ['./fragment-dashboard.component.css']
})
export class FragmentDashboardComponent implements OnInit {

  clientList: Array<ClientModel> = [];

  constructor(private client: ClientService) { }

  ngOnInit() {
    //Get clients
    this.client.getClients().subscribe(
      (clients: Array<ClientModel>) => {
        this.clientList = clients;
      }
    )
  }
  
  //This gets called by children
  deleteClient(event) {
    this.client.removeClient(event)
      .subscribe( () => {
        let index = this.clientList.findIndex(
          (value: ClientModel, index: number, obj: ClientModel[]): boolean => {
            if(value._id == event) {
              return true;
            }
          });

        this.clientList.splice(index, 1);
      });
  }

}
