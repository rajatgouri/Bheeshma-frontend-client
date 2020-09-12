import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-forget-password',
    templateUrl: 'forget-password.page.html',
    styleUrls: ['forget-password.page.scss']
})
export class ForgetPasswordPage  implements OnInit{

    forgetPasswordForm: FormGroup;

    constructor(
        private authService: AuthService,
        private toastService : ToastService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.forgetPasswordForm = new FormGroup({
            'email': new FormControl(null, Validators.required)
        })
    }


    onSubmit() {
        this.authService.resetPasswordToken(this.forgetPasswordForm.value).subscribe((res:any) => {
            localStorage.setItem('userId', res.id)
            this.navCtrl.navigateForward('/tabs/change-password')
        }, error => {
            this.toastService.presentToast(error)
        })
    }
} 
