import { Component, ViewChild } from '@angular/core';
import { IonSlides, Platform, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  device= ''
  @ViewChild('bannerSlider') bannerSlider : IonSlides

  slideBannerOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      disableOnInteraction: false
    }
  };

  
  constructor(private platform: Platform, private navCtrl: NavController) {
    this.checkDevice(platform);
  }

  slidesDidLoad(bannerslides: IonSlides) {
    bannerslides.startAutoplay();
  }

  ionViewWillLeave(){
    this.bannerSlider.stopAutoplay();
  }

  ionViewDidEnter() {
    this.bannerSlider.startAutoplay();
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

  

} 
