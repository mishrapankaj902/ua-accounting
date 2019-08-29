import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
    public markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }
}