import { AclService } from './../../shared/service/acl.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash'
@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoginComponent implements OnInit {
	loginForm: FormGroup
	loader = false
	constructor(
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef,
		private acl: AclService,
	) { }
	ngOnInit() {
		this.loginForm = this.fb.group({
			email: ['pratap@yopmail.com', [Validators.email, Validators.required]],
			password: ['gaurav@321', [Validators.required]]
		})
	}

	onSubmit() {
		this.loader = true
		this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).then(r => {
			this.authService.getUserInfo(r.user.uid).subscribe(r => {
				if (r.data().roles === '*') {
					this.router.navigateByUrl('/admin/dashboard/index');
				} else if (_.isArray(r.data().roles) && (_.findIndex(r.data().roles, 'client') !== -1)) {
					this.router.navigateByUrl('/admin/client-dashboard');
				} else {
					this.router.navigateByUrl('/admin/client-dashboard');
				}
				this.toastr.success('You have been successfully Logined');
				this.cdr.markForCheck()
			}, e => {
				this.loader = false
				this.cdr.markForCheck()
			})
		}, e => {
			this.toastr.error(e.message, 'Login Page');
			this.loader = false
			this.cdr.markForCheck()
		})
	}
}
