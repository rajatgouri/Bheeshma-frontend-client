import { Component, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AlertController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { OrdersService } from 'src/app/services/orders.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
    selector: 'app-basket',
    templateUrl: 'basket.page.html',
    styleUrls: ['basket.page.scss']
})
export class BasketPage {

    loader: boolean = true;
    cart: any[] = [];
    totalPrice: number = 0;

    constructor(
        private cartService: CartService, 
        private alertController: AlertController,
        private toastService: ToastService,
        private orderService: OrdersService,
        private navCtrl: NavController,
        private socketsService: SocketsService
    ) { }

    ionViewDidEnter() {
        this.loader = true;
        this.getCart();
    }

    getCart() {
       this.cartService.getCart().subscribe((res: any) => {
            this.loader = false;
            this.cart = res.cart.items; 
            this.totalPriceCount()
        })
    }

    totalPriceCount() {
        for(let i=0; i<this.cart.length; i++) {
            this.cart[i].totalPrice = this.cart[i].price ;
        }
        this.getTotal();
    }

    getTotal() {
        this.totalPrice = (this.cart.reduce((a, c) => a + c.totalPrice,0))
    }

    increaseQuantity(item) {
        // increase product  quantity

        item.quantity++;

        if(item.quantity > 5) {
            this.presentAlert();
            item.quantity = 5;
        } else {
            item.disabledQuantity = true;
            item.totalPrice = item.totalPrice + (item.totalPrice / (item.quantity - 1)) 
            this.updateProduct(item)
        }
    }

    decreaseQuantity(item) {
        // decrease product quantity

        item.quantity--;

        item.disabledQuantity = true;

        if(item.quantity <= 0) {
            this.removeProduct(item.productId)
        } else {
            item.totalPrice = item.totalPrice - (item.totalPrice / (item.quantity  + 1)) 
            this.updateProduct(item);
        }
    }
    

    updateProduct(selectedItem) {
        // console.log(selectedItem)
        this.cartService.updateProduct(selectedItem.productId._id,  selectedItem.weight, selectedItem.quantity, selectedItem.totalPrice).subscribe((res:any) => {
            selectedItem.disabledQuantity = false;
            selectedItem.added = true ;
            selectedItem.addedToCart = true;
            this.getTotal()
        },error => {
            this.toastService.presentToast('Something Went Wrong!');
        })
    }
    
    removeProduct(selectedItem) {
        this.cartService.removeProduct(selectedItem._id).subscribe((res:any) => {
            this.getCart()
        }, error => {
            // console.log(error)
            this.toastService.presentToast('Something Went Wrong!');

        })
    }

    async presentAlert() {
        // alert
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'message',
          subHeader: '(Limit exceeded!)',
          message: 'You can add maximum 5 products.',
          buttons: ['OK']
        });
    
        await alert.present();
      }


      ionViewDidLeave() {
          this.totalPrice = 0
      }


      onCheckout() {
        this.presentAlertPrompt()
      }


      async presentAlertPrompt() {
        const alert = await this.alertController.create({
          cssClass: 'delivery-alert',
          header: 'Delivery Information',
          inputs: [
            
            {
              name: 'delivery',
              type: 'radio',
              value: 'end',
              label: 'Delivered upto 7 PM',
              placeholder: 'End Of The day'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: (data) => {
                if(data) {
                  this.createOrder();     
                }
              }
            }
          ]
        });
    
        await alert.present();
      }

      createOrder() {
        let data = {
          'status': 'Accepted',
          'total': (this.totalPrice + 10)
        } 
        this.orderService.createOrder(data).subscribe((res: any) => {
            this.socketsService.onNewOrder();
            this.navCtrl.navigateForward('/tabs/orders');
        }, error => {
            console.log(error)
        })
      }
} 
