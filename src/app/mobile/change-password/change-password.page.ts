import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-change-password',
    templateUrl: 'change-password.page.html',
    styleUrls: ['change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {

    changePasswordForm: FormGroup
    constructor(
        private authService: AuthService,
        private toastService: ToastService,
        private navCtrl: NavController
    ) { }

    

    ngOnInit() {
        this.initChangePasswordForm()
    }

    initChangePasswordForm() {
        this.changePasswordForm = new FormGroup({
            'password': new FormControl(null, Validators.required),
            'code': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
        })
    }

    onSubmit() {
        let userId = localStorage.getItem('userId');
        this.changePasswordForm.value['userId'] = userId;

        this.authService.resetPassword(this.changePasswordForm.value).subscribe((res: any) => {
            localStorage.clear();
            this.navCtrl.navigateForward('/tabs/signin')
        }, error => {
            this.toastService.presentToast(error);  
        })
    }

} 

