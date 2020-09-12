import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements OnInit {

  categories: any[] = [];
  subCategories: any[] = [];
  constructor(private modalCtrl: ModalController, private categoriesService: CategoriesService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res.items;
    }) 
  }

  onSelectCategory(event) {
    let selectedCategory = event.target.value;
    this.subCategories = this.categories.filter(category => category.name === selectedCategory)[0].items;
  }


  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


}
