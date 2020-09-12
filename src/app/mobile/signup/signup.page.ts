import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss']
})
export class SignupPage implements OnInit {

  city: string = '';
  isItemAvailable = false;
  cities = [];
  ignoreNextChange: boolean = false;
  sortedCities: any[];
  pincode: any[] = [];
  signupForm:FormGroup;
  disabled:boolean = false;
  mode: String;
  editMode: boolean= false;
  pageName: String = 'Sign up';

  constructor(
    private alertController: AlertController,
    private authService: AuthService, 
    private toastService: ToastService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private userService: UserService,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit() {
    this.initializeItems();
    this.route.params.subscribe((param: Params) => {
        console.log(param);
        this.route.params.subscribe((param: Params) => {
    
          this.mode = param.id;
    
          if (param['mode']) {
            this.editMode = true;
            this.pageName = 'Update Details'
          }
          this.initSignupForm();
        });
    })

  }



  initSignupForm() {
    if(this.editMode) {
      this.signupForm = new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.maxLength(10), Validators.minLength(10) ]),
        'houseNumber': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'street': new FormControl(null, Validators.required),
        'role': new FormControl('27017'),
        'city': new FormControl(null, [Validators.required, this.validateCity(this.cities)]),
        'pincode': new FormControl(null, [Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)])
      });

      let userId = JSON.parse(localStorage.getItem('userData')).id;
      this.userService.getUser(userId).subscribe((res: any) => {
        let user = res.user;
        this.signupForm.patchValue({
          'firstName': user.firstName,
          'lastName': user.lastName,
          'email': user.email,
          'phone': user.phone,
          'houseNumber': user.houseNumber,
          'street': user.street,
          'city': user.city,
          'pincode': user.pincode
        })
        
      })

    } else {
      this.signupForm = new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required , Validators.maxLength(8)]),
        'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.maxLength(10), Validators.minLength(10) ]),
        'houseNumber': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'street': new FormControl(null, Validators.required),
        'role': new FormControl('27017'),
        'city': new FormControl(null, [Validators.required, this.validateCity(this.cities)]),
        'pincode': new FormControl(null, [Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)])
      });
    }
  
    
  }

 validateCity(cities: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value === undefined  || (cities.filter(city => city.name === control.value)).length > 0 ? false : true) {
        return { 'city': true };
    }
    this.validatePincode()
    return null;
  }

}


  initializeItems() {
    this.cities = this.categoriesService.cities;
  }

  onSignup() {
    this.disabled = true;

    if( this.editMode) {

      this.userService.updateUser(this.signupForm.value).subscribe((res: any) => {

        this.disabled = false;
        this.toastService.presentToast('User Updated Successfully!');
        this.navCtrl.back();
        this.signupForm.reset();

      }, error => {
        this.disabled = false;

        if(error.error.error == 'INVALID_EMAIL') {
          this.toastService.presentToast('Email is Invalid!')
        } 

      })
      
    } else {

      this.authService.signup(this.signupForm.value).subscribe((res: any) => {
        this.disabled = false;
        this.toastService.presentToast('User Registered Successfully!');
        this.navCtrl.navigateForward(['/tabs/signin']);
        this.signupForm.reset();

      }, error => {

        this.disabled = false;
        this.toastService.presentToast(error);
      
      });
    }
    
    
  }



  getCities(ev) {

    const val = ev.target.value;

    if (this.ignoreNextChange) {
      this.ignoreNextChange = false;
      return;
    }

    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.sortedCities = this.cities.filter((city) => {
        return (city.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

    } else {
      this.isItemAvailable = false;
    }
  }

  onSuggestionSelected(i) {
    
    this.signupForm.patchValue({
      'city': this.cities[i].name
    })

    this.isItemAvailable = false;
    this.ignoreNextChange = true;
  }


  validatePincode() {
    var city = this.cities.filter(city => city.name === this.signupForm.controls.city.value);
    
    if (city.length > 0  ===  false) {
      return this.signupForm.controls.pincode.setErrors({'city': true})
    } else {
        let pincodes = city[0].pincode;
        let isPincode = pincodes.filter(pincode => pincode === +this.signupForm.controls.pincode.value);

        if(isPincode.length <= 0) {
          this.signupForm.controls.pincode.setErrors({'pincode': true})
        }
        return null
    } 
    
  }


  

} 
