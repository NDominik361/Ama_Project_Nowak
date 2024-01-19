import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  standalone:true,
  imports:[ReactiveFormsModule],
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private router: Router,
              private route: ActivatedRoute,
              private autService: AuthenticationService) {
   /* if(autService.isAuthenticated()) {
      this.router.navigate(['']);
    }*/
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  // region functions
  initForm(): UntypedFormGroup {
    return new UntypedFormGroup({
      username: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    });
  }

  onLogIn() {
    if (this.loginForm?.valid ) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log(username, password);
      this.autService.login(username, password)
        .then(
          result => {
            if (result) {
              //this.router.navigate(['dashboard']);
            }
          });
    }
  }
}
