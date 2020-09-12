import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-search',
    templateUrl: 'search.page.html',
    styleUrls: ['search.page.scss']
})
export class searchPage {

    products :any = [];
    isItemAvailable = false;
    items = [];

    searchbar = '';

    constructor(
        private categoriesService: CategoriesService,
        private productService: ProductsService) {
    }



    getItems(ev: any) {
        
        const val = ev.target.value;

        this.productService.searchProducts(val).subscribe((res: any) => {
                this.products = res.products

        })
    }

    ionViewDidLeave() {
        this.searchbar = ''
    }
} 
