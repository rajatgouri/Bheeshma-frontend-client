import { Component, Input} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sub-header',
  templateUrl: 'sub-header.component.html',
  styleUrls: ['sub-header.component.scss'],
})
export class SubHeaderComponent  {

  @Input() name: string;

  constructor(private navCtrl: NavController) {}

  ionViewDidEnter() {

  }


  goBack() {
    this.navCtrl.back();
  }
  

}
