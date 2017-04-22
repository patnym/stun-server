import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {
    username: '',
    password: ''
  }

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    //Validate shit
    this.auth.login(this.model.username, this.model.password).subscribe(
      (data: any) => {
        //wtf is this?
      },
      (error: any) => {
        //Handle error?
      },
      () => {
        //Redirect
      }
    )
  }

}
