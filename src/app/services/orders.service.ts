import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {



  constructor(private http: HttpClient) { }


  getOrders() {
    return this.http.post(environment.baseUrl + '/get-order', {});
  }

  getAllOrders() {
    return this.http.post(environment.baseUrl + '/get-all-orders', {});
  }

  getOrderDetails(id) {
    return this.http.post(environment.baseUrl + '/get-order-details', {'id': id})
  }


  createOrder(data) {
    return this.http.post(environment.baseUrl + '/create-order', data)
  }
}
