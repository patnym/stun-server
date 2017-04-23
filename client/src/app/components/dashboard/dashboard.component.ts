import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';

import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private client: ClientService) { }

  ngOnInit() {
    //Get clients
    this.client.getClients().subscribe(
      (clients: Array<ClientModel>) => {
        console.log(clients);
      }
    )
  }

}
