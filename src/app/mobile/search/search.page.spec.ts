import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { searchPage } from './search.page';

describe('SearchPage', () => {
  let component: searchPage;
  let fixture: ComponentFixture<searchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [searchPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(searchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
