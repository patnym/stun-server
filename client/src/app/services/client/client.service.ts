import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../authentication/auth.service';

import { ClientModel } from '../../models/client.model';

@Injectable()
export class ClientService {

  constructor(private auth: AuthService, private http: Http) { }

  //Get all ClientService
  getClients() {
    //Get token
    let token = this.auth.getToken();

    return this.http.get("/api/clients?token=" + token)
      .map( (data: any): Array<ClientModel> => {
        console.log(data);

        let clients = data.json();
        let clientsArr: Array<ClientModel> = [];

        clients.forEach(element => {
          clientsArr.push( {
            auth: element.auth,
            name: element.name,
            port: element.port,
            ip: element.ip,
            _id: element.id
          })
        });
        
        return clientsArr;
      });
  }

  //Get a client

  //Update client

}
