import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdService {

  constructor(private _http: HttpClient) { }

  getUserProducts(): Observable<any> {
    return this._http.get(`https://localhost:7028/api/products`);
  }
  getAdminProducts(): Observable<any> {
    return this._http.get(`https://localhost:7028/api/products/get-not-approved`);
  }

  addProduct(productData: FormData): Observable<any> {
    return this._http.post(`https://localhost:7028/api/products`, productData)
  }

  approve(prodId: { id: string }) {
    return this._http.put(`https://localhost:7028/api/products/approve`, prodId)
  }
}
