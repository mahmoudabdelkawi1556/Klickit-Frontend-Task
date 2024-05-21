import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFrom: FormGroup;

  constructor(private _auth: AuthService, private _fb: FormBuilder, private _toast: ToastrService, private _router: Router) {
    this.registerFrom = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      userName: ['', [Validators.required]],
    })
  }

  submitRegister(registerFrom: FormGroup) {
    this._auth.register(registerFrom.value).subscribe({
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
