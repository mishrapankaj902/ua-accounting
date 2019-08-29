import { QueryParam } from './../../../shared/service/query-param';
import { SecretaryOfStatePacketService } from './../secretary-of-state-packet/secretary-of-state-packet.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { ReceiptTemplateModel } from './receipt-template.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { ReceiptTemplateService } from './receipt-template.service';

@Component({
  selector: 'app-receipt-template',
  templateUrl: './receipt-template.component.html',
  styleUrls: ['./receipt-template.component.css']
})
export class ReceiptTemplateComponent implements OnInit {

  @Input() deal: BasicInfoModel
  model: ReceiptTemplateModel
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
    private ser: ReceiptTemplateService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new ReceiptTemplateModel();
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
      date: [this.model.date],
      partner: [this.model.partner],
      amount: [this.model.amount],
      balance_due: [this.model.balance_due],
      cash: [this.model.cash],
      check: [this.model.check],
      client_name: [this.model.client_name],
      description: [this.model.description],
      invoice: [this.model.invoice],
      prepayment: [this.model.prepayment],
      received_by: [this.model.received_by]
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