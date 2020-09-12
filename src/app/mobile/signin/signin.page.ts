import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { error } from 'protractor';

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.page.html',
    styleUrls: ['signin.page.scss']
})
export class SigninPage {

    signinForm: FormGroup;
    disabled:boolean = false;


    constructor(private authService: AuthService, private toastService: ToastService, private navCtrl: NavController, private router: Router) {}
    
    ngOnInit() {
        this.initSigninForm();
      }
    


    initSigninForm() {
        this.signinForm = new FormGroup({          
          'email': new FormControl(null, [Validators.required]),
          'password': new FormControl(null, [Validators.required ]),
          
        });

      }

      onSignin() {
            let data = this.signinForm.value;
            this.disabled = true;
            
            this.authService.signin(data).subscribe((res: any) => {
                // this.navCtrl
                this.navCtrl.navigateForward('/tabs/home');
                this.disabled = false
                this.signinForm.reset();
            }, error => {
                console.log(error);
                this.disabled = false

                this.toastService.presentToast(error)
            })
      }
} 



