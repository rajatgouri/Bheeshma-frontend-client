import { Component, OnInit } from '@angular/core';

import { Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { CategoriesService } from './services/categories.service';
import { ToastService } from './services/toast.service';
import { JsonPipe } from '@angular/common';
import { SocketsService } from './services/sockets.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  isDesktop = false;
  
  user;
  userInfo: String = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private categorieservice: CategoriesService,
    private toastService: ToastService,
    private socketService: SocketsService
  ) {
    this.initializeApp();
    if (window.innerWidth > 768) {
        this.isDesktop = true;  
    } 
  }

  ngOnInit() {
    this.getCategories();
    this.getCities()
    this.initSocket()
  }

  initSocket () {
    this.socketService.setupSocketConnection();
    setTimeout(() => {
      this.authenticateUser();
    }, 2000)
  }

  getCategories() {
    this.categorieservice.getCategories().subscribe((res: any) => {
      this.categorieservice.categories = res.categories.items;
    })
  }


  getCities() {
    this.categorieservice.getCities().subscribe((res: any) => {
      this.categorieservice.cities = res.cities;
      console.log(res.cities)
    })
  }


  authenticateUser() {
    let user = localStorage.getItem('userData');

    this.authService.user.subscribe((user) => {
      if(user) {
        this.user = user;
        this.getUserInformation(user.id)
        return
      }
      this.user = null;
  
    })
    
  }

  getUserInformation(id) {
      this.userService.getUser(id).subscribe((res: any) => {
        this.userInfo = `${res.user.houseNumber}  ${res.user.street}, ${res.user.city}, ${res.user.pincode}`  
      }, error => { 
        console.log(error);
        this.toastService.presentToast('Something Went Wrong!')
      });
  }

  link(route) {
    this.menu.close('first');
    this.navCtrl.navigateForward('/tabs/'+ route);
  }

  logout() {
    this.authService.logout();
    this.menu.close('first');
    this.navCtrl.navigateForward('/');
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authService.autoLogin()


  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }


  updateAccount() {
    this.menu.close('first')
    this.navCtrl.navigateForward('/tabs/update-account/edit')
  }

}
