import { Component, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

export interface OrderDetailsInterface {
    _id: string,
    products: any[],
    user: {
        _id: String
    },
    status: string,
    total: Number,
    date: String
  }

@Component({
    selector: 'app-order-details',
    templateUrl: 'order-details.page.html',
    styleUrls: ['order-details.page.scss']
})
export class OrderDetailsPage {

    orderDetails:any = {};
    loader:boolean = true;
    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private toastService: ToastService
        ) {}

    ionViewDidEnter() {
        this.route.params.subscribe((param: Params) => {
            this.getOrderDetails(param['id']);
        })
    }   

    async getOrderDetails(id) {
        this.orderService.getOrderDetails(id).subscribe((res: any) => {
            this.orderDetails = res.order;
        }, error => {
            console.log('error in fetching order details');
            this.toastService.presentToast('Internal Server Error')
        });
        this.loader= false;
    }
} 
