import { Component, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
    selector: 'app-orders',
    templateUrl: 'orders.page.html',
    styleUrls: ['orders.page.scss']
})
export class OrdersPage {

    orders: any[] = [];
    loader: boolean = true;
    constructor(private ordersService: OrdersService) {}

    ionViewDidEnter(){
        this.getOrders()
    }

    getOrders(){
        this.ordersService.getOrders().subscribe((res: any) => {
            this.orders = res.orders;
            this.loader = false;
        })
    }
} 
