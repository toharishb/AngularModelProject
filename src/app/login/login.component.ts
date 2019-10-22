import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitMessage: string;
  private bearerToken: string;


  username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private formbuilder: FormBuilder, private authservice: AuthenticationService,
    private routerservice: RouterService) {
    this.loginForm = formbuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit() {
  }

  loginSubmit() {
    this.authservice.authenticateUser({
      username: this.username.value,
      password: this.password.value
    }).subscribe(
      res => {
        this.bearerToken = res['token'];
        console.log(res['token']);
        this.authservice.setBearerToken(this.bearerToken);
        this.routerservice.routeToDashboard();
    },
    err => {
      if (err.status === 403) {
        this.submitMessage = err.error.message;
      } else {
        this.submitMessage = err.message;
      }
    });
  }
}
