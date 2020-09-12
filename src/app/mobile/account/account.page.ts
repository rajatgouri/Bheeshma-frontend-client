import { Component, OnInit} from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit{

  user: any;
  constructor(
    private modalController: ModalController, 
    private userService: UserService,
    private authService: AuthService,
    private navCtrl: NavController) { }
  

  openAccountModal() {
  }

  ionViewDidEnter() {
    
  }


  ngOnInit() {
    this.authService.user.subscribe((authUser) => {
      if(authUser) {
        this.userService.getUser(authUser.id).subscribe((res: any) => {
          this.user = res.user
      })
      }
    })
  }

  

  onLogout() {
      this.authService.logout();
      this.navCtrl.navigateForward('/');
  }
} 
