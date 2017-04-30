import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';


@Component({
  selector: 'app-fragment-create-user',
  templateUrl: './fragment-create-user.component.html',
  styleUrls: ['./fragment-create-user.component.css']
})
export class FragmentCreateUserComponent implements OnInit {

  model: any = {
    username: "",
    password: "",
    repassword: ""
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  passwordsMatching() {
    return (this.model.password !== "" || this.model.repassword !== "") &&
           (this.model.password === this.model.repassword)
  }

  onSubmit() {
    this.auth.createUser(this.model.username, this.model.password)
      .subscribe( () => {
        this.router.navigate([''])
      });
  }

}
