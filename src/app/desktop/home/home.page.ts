import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {
    
  @ViewChild('bannerSlider') bannerSlider : IonSlides

  slideBannerOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      disableOnInteraction: false
    }
  };

  constructor() {}

  ionViewDidEnter() {
    this.bannerSlider.startAutoplay();
  }

  ionViewWillLeave(){
    this.bannerSlider.stopAutoplay();
  }

  slidesDidLoad(bannerslides: IonSlides) {
    bannerslides.startAutoplay();
  }


  
} 
