import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from './interfaces/cat';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  getCat(): Observable<any> {
    return this._http.get(`https://localhost:7028/api/categories`);
  }

  addCat(catData: Cat): Observable<any> {
    return this._http.post(`https://localhost:7028/api/categories`, catData);
  }
}
