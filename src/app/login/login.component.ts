import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private _auth: AuthService, private _fb: FormBuilder, private _toast: ToastrService, private _router: Router) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submitLogin(loginForm: FormGroup) {
    this._auth.login(loginForm.value).subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp.data);
        this._router.navigate(['/dashboard']);
      },
      error: (error) => {
        this._toast.error(error.error.Message);
      }
    })
  }

}
