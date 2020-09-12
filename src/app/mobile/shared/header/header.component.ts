import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToAccountPage() {
    this.navCtrl.navigateForward('/tabs/account')
  }
  
}
