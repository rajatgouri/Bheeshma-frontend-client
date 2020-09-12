import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { categoriesPage } from './categories.page';

describe('homePage', () => {
  let component: categoriesPage;
  let fixture: ComponentFixture<categoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [categoriesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(categoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
