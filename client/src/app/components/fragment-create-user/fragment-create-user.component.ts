import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  passwordsMatching() {
    return (this.model.password !== "" || this.model.repassword !== "") &&
           (this.model.password === this.model.repassword)
  }

  onSubmit() {
    
  }

}
