import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Shared/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  constructor(public  auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    if ( this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.auth.login(user).subscribe( res => {

      // reset form
      this.form.reset()
      // Redirect to admin/dashboard
      this.router.navigate(['/admin', 'dashboard'])
      // unlock button
      this.submitted = false

},
      () => {
        // unlock button
      this.submitted = false
      }
);

  }

}
