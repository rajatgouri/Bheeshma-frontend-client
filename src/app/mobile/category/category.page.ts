import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-category',
    templateUrl: 'category.page.html',
    styleUrls: ['category.page.scss']
})
export class CategoryPage implements OnInit {

    category: string = '';
    categories: any[];
    categoriesObservable: Observable<null>;

    constructor(private navCtrl: NavController, private route: ActivatedRoute, private http: HttpClient) {
        this.categoriesObservable = Observable.create((observer) => {
            http.get('assets/categories.json').subscribe(res => {
                observer.next(res);
            })
        })
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.route.params.subscribe((param: Params) => {
            this.getCategories(param['name'])
        })
    }

    getCategories(param) {
        this.categoriesObservable.subscribe((res: any) => {
            this.categories = res['items'].filter(item => {
                if(item.tag === param) {
                    this.category = item.name;
                    return item
                }
            })[0].items


        })
    }

    goBack() {
        this.navCtrl.back();
    }


} 
