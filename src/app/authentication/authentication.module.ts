import { AuthenticationComponent } from './authentication/authentication.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormService } from './../admin/app-forms/service/form.service';
import { BasicInfoService } from './../admin/app-forms/basic-info/basic-info.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-login/page-login.component';
import { routing } from './authentication.routing';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		PageLoginComponent,
		AuthenticationComponent,
		PageRegisterComponent,
		PageForgotPasswordComponent,
	],
	imports: [
		CommonModule,
		routing,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		NgbAlertModule,
		AngularFirestoreModule
	],
	providers: [
		BasicInfoService,
		FormService
	]
})
export class AuthenticationModule { }
