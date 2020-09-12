import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }

  // getCart() {
  //   return this.http.get('/assets/cart.json');
  // }

  getCart() {
    return this.http.post(environment.baseUrl + '/get-cart', {});
  }

  addToCart(productId, productWeight, productQuantity, productPrice) {
    return this.http.post(environment.baseUrl + '/add-to-cart', {id: productId, weight: productWeight, quantity: productQuantity, price:productPrice});
  }

  removeProduct(productId) {
    return this.http.post(environment.baseUrl + '/remove-product', {id: productId});
  }

  updateProduct(productId, productWeight, productQuantity, productPrice) {
    return this.http.post(environment.baseUrl + '/update-product-details', {id: productId, weight: productWeight, quantity: productQuantity, price: productPrice});
  }


}

