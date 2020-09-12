import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss']
})
export class ProductPage implements OnInit, OnDestroy{

    products:any[] = [];
    previousProducts:any[] = [];
    searchbar: string = '';
    totalProducts:Number = 0;
    loader:boolean = true;
    chips:any[] = [];
    productCategoriesId = null;
    device: string = ''
    category: String = '';
    subCategory: String = '';
    disabledButton: boolean= false;
    user:User;
    selectedProduct: string = ''

    constructor(
        private route: ActivatedRoute,
        private productService: ProductsService, 
        private platform : Platform, 
        private alertController: AlertController,
        private authService: AuthService,
        private toastService: ToastService,
        private cartService: CartService,
        private cdr: ChangeDetectorRef
        ) {
        this.checkDevice(platform);
        this.route.queryParams.subscribe((param: Params) => {
            this.category =  param['category'];
            this.subCategory =  param['subCategory'];

            if (param['selectedProduct']) {
                this.selectedProduct = param['selectedProduct']
            }

            this.getProducts({category: this.category, subCategory: this.subCategory});
            this.loader = true;
        })
    }

    ngOnInit() {
    }

    private checkDevice(platform: Platform) {
        if (platform.is('android')) {
          this.device = 'android';
        } else if (platform.is('ios')) {
          this.device = 'ios';
        } else {
          this.device = 'web-mobile'
        }
    }

    async getProducts(category) {

        this.productService.getProducts(category).subscribe((res: any) => {
            this.products = res.data;
            this.previousProducts = this.products;
            if (this.selectedProduct) {
                this.searchbar = this.selectedProduct;
            }

            this.authenticateUser();
            this.getChips();
            this.loader = false;
        })
    }

    authenticateUser() {
        this.authService.user.subscribe((user: User) => {
            this.user = user;
            if(user) {
                this.getCartProducts();
            }
        })
    }

    getCartProducts() {
        this.cartService.getCart().subscribe((res: any) => {
            const cart = res.cart.items;
            const products = this.products;
          
            cart.filter(cartProduct => {
                let productInCart = products.filter(product => {
                    return cartProduct.productId._id === product._id
                })
                
                if(productInCart.length > 0) {
                    let selectedProduct = this.products[this.products.indexOf(productInCart[0])];
                    selectedProduct.weight = cartProduct.weight;
                    selectedProduct.quantity = cartProduct.quantity;
                    selectedProduct.added = true;
                    selectedProduct.addedToCart = true;
                }
            })
        })
    }

    ionViewDidEnter() {}

       

    getChips() {
        this.products.filter(product => {
            if(this.chips.indexOf(product['productCategory']) < 0 ) {
                this.chips.push(product['productCategory']);
            }
        })
    }

    applyChips(chip) {
        this.getProducts({'category': this.category, 'productCategory': chip})
    }


    clearChips() {
        this.getProducts({'category': this.category, 'subCategory': this.subCategory})
    }

    onchangeQuantity(event, item) {
        // change quantity;

        let selectedWeight = event.target.value;

        let selectedItem = item.packets.filter(subItem =>  {
            return subItem.weight === selectedWeight
        })[0]


        item.weight = selectedItem.weight;
        item.price = selectedItem.price;
        item.mrp = selectedItem.mrp; 
        item.totalPrice = item.price * item.quantity;
        
        if(item.added || item.addedToCart) {
            this.updateProduct(item);
        }
    }


    initializeProducts() {
        this.products = this.previousProducts;
    }

    async getItems(ev: any) {
        
        this.initializeProducts();

        const val = ev.target.value;

        if (val && val.trim() !== '') {
            this.products = this.products.filter((item) => {
                return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.products = this.previousProducts;
        }
    }  

    
    AddToCart(id) {
        // product added to cart
            if (!this.user) {
               return this.toastService.presentToast('Please Login First')
            }
                
            let selectedItem = this.products.filter(product => product._id === id)[0];
            selectedItem.quantity = 1;
            selectedItem.totalPrice = selectedItem.price * selectedItem.quantity;
            this.disabledButton = true;
            this.cartService.addToCart(selectedItem._id, selectedItem.weight, selectedItem.quantity, selectedItem.totalPrice).subscribe((res: any) => {
                this.disabledButton = false;
                selectedItem.added = true;
                selectedItem.addedToCart = true;

            }, error => {
                // console.log(error)
                this.toastService.presentToast('Something Went Wrong!');
            })
        
        
    }

    increaseQuantity(id) {
        // increase product  quantity
        let selectedItem = this.products.filter(product => product._id === id)[0];
        selectedItem.quantity++;
        selectedItem.totalPrice = selectedItem.price * selectedItem.quantity;
        if(selectedItem.quantity > 5) {
            this.presentAlert();
            selectedItem.quantity = 5;
        } else {
            selectedItem.disabledQuantity = true;
            this.updateProduct(selectedItem);
        }
    }

    decreaseQuantity(id) {
        // decrease product quantity
        let selectedItem = this.products.filter(product => product._id === id)[0];
        selectedItem.quantity--;
        selectedItem.disabledQuantity = true;
        selectedItem.totalPrice = selectedItem.totalPrice  - selectedItem.price
        if(selectedItem.quantity <= 0) {
            this.removeProduct(selectedItem);
        } else {
            this.updateProduct(selectedItem);
        }
    }

    removeProduct(selectedItem) {
        this.cartService.removeProduct(selectedItem._id).subscribe((res:any) => {
            // console.log(res)
            selectedItem.disabledQuantity = false;
            selectedItem.added = false ;
            selectedItem.addedToCart = false;
        }, error => {
            // console.log(error)
            this.toastService.presentToast('Something Went Wrong!');

        })
    }


    updateProduct(selectedItem) {
        
        // console.log(selectedItem)
        this.cartService.updateProduct(selectedItem._id,  selectedItem.weight, selectedItem.quantity,selectedItem.totalPrice).subscribe((res:any) => {
            selectedItem.disabledQuantity = false;
            selectedItem.added = true ;
            selectedItem.addedToCart = true;
            // console.log(res);
        },error => {
            // console.log(error);
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
    
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        this.chips = [];
    }

    ionViewDidLeave() {
        this.chips = [];
        this.searchbar = '';
        this.selectedProduct = '';
    }
} 
