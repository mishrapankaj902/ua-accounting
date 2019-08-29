import { QueryParam } from './../../../shared/service/query-param';
import { SecretaryOfStatePacketService } from './../secretary-of-state-packet/secretary-of-state-packet.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { SchFormService } from './sch-form.service';
import { SchFormModel } from './sch-form.model';

@Component({
  selector: 'app-sch-form',
  templateUrl: './sch-form.component.html',
  styleUrls: ['./sch-form.component.css']
})
export class SchFormComponent implements OnInit {
  @Input() deal: BasicInfoModel
  model: SchFormModel
  @Input() $tabRef: Subject<any>;
  render = false;
  @Output() form: FormGroup;
  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private ser: SchFormService,
  ) { }


  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new SchFormModel();
        this.model.$deal_id = this.deal.$id
      }
      this.initForm();
      this.render = true;
      this.cdr.markForCheck();
    })
  }

  initForm() {
    this.form = this.fb.group({
      $id: [this.model.$id],
      $deal_id: [this.model.$deal_id],
      bussiness_name: [this.model.bussiness_name, Validators.required],
      address: [this.model.address],
      principal_bussiness: [this.model.principal_bussiness],
      operated_by: [this.model.operated_by, Validators.required],
      tax_payer_file: [this.model.tax_payer_file],
      sale: [this.model.sale],
      expenses: this.fb.array(this.model.expenses),
      vehicle_detail: this.fb.group({
        purchase_date: [this.model.vehicle_detail.purchase_date],
        cost: [this.model.vehicle_detail.cost],
        make_and_model: [this.model.vehicle_detail.make_and_model],
        mile_driven: [this.model.vehicle_detail.mile_driven],
        mile_bussiness: [this.model.vehicle_detail.mile_bussiness],
        available_off_day: [this.model.vehicle_detail.available_off_day],
        available_personal_use: [this.model.vehicle_detail.available_personal_use],
      }),
      actual_expense: this.fb.array(this.model.actual_expense),
      business_expense: this.fb.group({
        area: [this.model.business_expense.area],
        total_area: [this.model.business_expense.total_area],
        rent: [this.model.business_expense.rent],
        utility: [this.model.business_expense.utility],
        other: [this.model.business_expense.other]
      })
    });
  }
  submit() {
    this.fs.markFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.toastr.error('Please fill all mandatory fields')
      this.cdr.markForCheck();
      this.loader.loader(false)
      return
    }
    if (this.model.$id) {
      this.ser.update(this.form.value).then(
        () => {
          this.toastr.success('Data Successfully saved.');
          this.$tabRef.next(true);
          this.loader.loader(false);
        },
        e => {
          this.toastr.error(e.message);
          this.loader.loader(false);
        })
    } else {
      this.ser.create(this.form.value).then(
        () => {
          this.toastr.success('Data Successfully saved.');
          this.$tabRef.next(true);
          this.loader.loader(false);
        },
        e => {
          this.toastr.error(e.message);
          this.loader.loader(false);
        })
    }

  }

}