import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  socket: any;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.baseUrl);
  }


  onNewOrder() {
    this.socket.emit('new-order', {'msg': 'New Order Arrived', 'status': true})
  }

  public getOrder = () => {
    return Observable.create((observer) => {
        this.socket.on('on-new-order', (data) => {
            observer.next(data);
        });
    });
  }
}
