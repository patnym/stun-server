import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';

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
        console.log(clients);

        this.clientList = clients;
      }
    )
  }

}
