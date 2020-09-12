import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  categories:any[] =[];
  
  cities: any = [];


  getCities () {
    return this.http.post(environment.baseUrl + '/get-cities', {})

  }


  getCategories() {
    return this.http.post(environment.baseUrl + '/get-categories', {})
  }

}
