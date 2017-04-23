import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client/client.service';


@Component({
  selector: 'app-fragment-create-client',
  templateUrl: './fragment-create-client.component.html',
  styleUrls: ['./fragment-create-client.component.css']
})
export class FragmentCreateClientComponent implements OnInit {
  model: any = {
    name: ''
  };

  constructor(private client: ClientService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if(!this.model.name && this.model.name === '') {
      console.log('Must enter a name');
    } else {
      this.client.createClient(this.model.name)
        .subscribe( (result) => {
          if(result) {
            this.router.navigate(['']);
          }
        });

      
    }
  }

}
