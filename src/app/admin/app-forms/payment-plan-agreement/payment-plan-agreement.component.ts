import { QueryParam } from './../../../shared/service/query-param';
import { PaymentPlanAgreementService } from './payment-plan-agreement.service';
import { SecretaryOfStatePacketService } from './../secretary-of-state-packet/secretary-of-state-packet.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { PaymentPlanAgreementModel } from './payment-plan-agreement.model';

@Component({
  selector: 'app-payment-plan-agreement',
  templateUrl: './payment-plan-agreement.component.html',
  styleUrls: []
})
export class PaymentPlanAgreementComponent implements OnInit {
  @Input() deal: BasicInfoModel
  model: PaymentPlanAgreementModel
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
    private ser: PaymentPlanAgreementService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new PaymentPlanAgreementModel();
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

      client: [this.model.client, []],
      business: [this.model.business, []],
      payment_aggrement: [this.model.payment_aggrement, []],
      total_amount: [this.model.total_amount, []],
      follows: [this.model.follows, []],
      on: [this.model.on, []],
      and_$: [this.model.and_$, []],
      and_: [this.model.and_, []],
      on_the: [this.model.on_the, []],
      payment_cash: [this.model.payment_cash, []],
      payment_card: [this.model.payment_card, []],
      account_type: [this.model.account_type, []],
      cardholder_name: [this.model.cardholder_name, []],
      account_number: [this.model.account_number, []],
      expiration_date: [this.model.expiration_date, []],
      cvv: [this.model.cvv, []],
      billing_address: [this.model.billing_address, []],
      phone: [this.model.phone, []],
      city_state_zip: [this.model.city_state_zip, []],
      email: [this.model.email, []],
      customRadioInline1: [this.model.customRadioInline1, []],
      name_of_client: [this.model.name_of_client, []],
      name_of_client_date: [this.model.name_of_client_date, []],
      manager: [this.model.manager, []],
      manager_date: [this.model.manager_date, []],
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
