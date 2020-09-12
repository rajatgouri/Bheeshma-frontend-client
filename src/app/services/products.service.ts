import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Product} from '../models/products.model';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:any[] = [];
  productsChanged= new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

 
  getProducts(categories) {
    return this.http.post(environment.baseUrl + '/get-products' , categories );
  }


  updateProduct(id, product) {
    return this.http.post(environment.baseUrl + '/update-product', {"id": id, "product": product});
  }

  deleteProduct(id) {
    return this.http.post(environment.baseUrl + '/delete-product', {"id": id});
  }

 

  getProduct(id) {
    return this.http.post(environment.baseUrl + '/get-product', {"id": id});
  }

  addProduct(product: Product) {
    // console.log(product);
    return this.http.post(environment.baseUrl + '/add-product' , product);
  }

  
  searchProducts(value) {
    return this.http.post(environment.baseUrl + '/search-products' , {value: value});
  }
}
