import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
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
            _id: element._id
          })
        });
        
        return clientsArr;
      });
  }

  //Create client
  createClient(name: string) {
    return this.http.post('/api/client', { name: name, token: this.auth.getToken()})
      .map( (data: any) => {
        console.log(data);
        let client = data.json();

        if(client && client.name) {
          return true;
        }
        return false;
      });
  }

  removeClient(id: string) {
    return this.http.delete('/api/client/' + id + "?token=" + this.auth.getToken())
      .map( (data: any) => {
        console.log(data);
        return true;
      });
  }

  //Get a client

  //Update client

}
