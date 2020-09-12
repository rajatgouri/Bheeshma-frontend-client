import { Component} from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class categoriesPage {

  categories: any[];
  sectionToggled = null;
  loader :boolean = true;
 
  constructor(private categoriesService: CategoriesService) {
    this.getCategories();  
  }

  getCategories() {
    this.categories = this.categoriesService.categories;
    this.loader = false
  }

  ionViewDidEnter () {
    this.sectionToggled = null;
  }
  
  toggleSection(i) {

    if(i !== this.sectionToggled) {
      this.closeSections();
    }
    
    this.categories[i].open = !this.categories[i].open
    this.sectionToggled = i; 
  }

  closeSections() {
    this.categories.forEach(category => {
      category.open = false
    })
  }

  ionViewDidLeave() {
    this.closeSections();
  }
  

} 
