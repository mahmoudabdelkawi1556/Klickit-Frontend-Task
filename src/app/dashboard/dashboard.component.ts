import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Cat } from '../interfaces/cat';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';
import { Prod } from '../interfaces/prod';
import { ProdService } from '../prod.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: string = '';
  products!: Prod[];
  isShown: boolean = false;

  constructor(private _auth: AuthService, private _toast: ToastrService, private _prod: ProdService) { }

  ngOnInit(): void {
    this.getRoleFromToken();
    this.getProducts();
  }

  getRoleFromToken() {
    this.role = this._auth.getDecodedAccessToken(JSON.stringify(localStorage.getItem('token')))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }

  getProducts() {
    if (this.role == 'Admin') {
      this._prod.getAdminProducts().subscribe({
        next: (resp) => {
          this.products = resp.data;
        },
        error: (err) => {
          this._toast.error(err.error.Message);
        }
      })
    }
    else {
      this._prod.getUserProducts().subscribe({
        next: (resp) => {
          this.products = resp.data;
        },
        error: (err) => {
          this._toast.error(err.error.Message);
        }
      })
    }
  }

  showPopup() {
    this.isShown = true;
  }

  close(event: boolean) {
    this.isShown = event;
  }

  approve(prod: Prod) {
    this._prod.approve({ id: prod.id }).subscribe({
      next: (resp: any) => {
        this._toast.success(resp.message);
        this.products = this.products.filter(x => x.id != prod.id);
      },
      error: (err) => {
        this._toast.error(err.message);
      }
    })
  }

}
