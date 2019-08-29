import { FormService } from './../../admin/app-forms/service/form.service';
import { BasicInfoService } from './../../admin/app-forms/basic-info/basic-info.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageRegisterComponent implements OnInit {
    form: FormGroup
    render = false;
    loader = false;
    constructor(
        private router: Router,
        private ar: ActivatedRoute,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private client: BasicInfoService,
        private fs: FormService,
        private toaster: ToastrService
    ) { }

    ngOnInit() {
        this.ar.params.subscribe(d => {
            this.form = this.fb.group({
                token: [d.token],
                displayName: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6), Validators.nullValidator]],
                cpassword: ['']
            }, {
                    validators: (control: FormGroup): ValidationErrors | null => {
                        const name = control.get('password');
                        const alterEgo = control.get('cpassword');
                        return name && alterEgo && name.value !== alterEgo.value ? { 'cpassError': true } : null;
                    }
                })
            this.render = true;
            this.cdr.markForCheck()
        })
    }

    onSubmit() {
        this.fs.markFormGroupTouched(this.form)
        if (this.form.invalid) {
            this.toaster.error("Please fill all mandatory fields.")
            return
        }
        this.loader = true;
        this.cdr.markForCheck()
        this.client.createClientLogin(this.form.value).subscribe(d => {
            this.loader = false;
            this.cdr.markForCheck()
            this.toaster.success("Your login account successfully created.")
            this.router.navigate(['/authentication/page-login']);
        }, e => {
            this.loader = false;
            this.cdr.markForCheck()
            this.toaster.error("Some error occured from server side. Please try again.")
        })
    }

}
