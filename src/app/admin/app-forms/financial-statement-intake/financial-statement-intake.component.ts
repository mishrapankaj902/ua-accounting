import { QueryParam } from './../../../shared/service/query-param';
import { FinancialStatementIntakeService } from './financial-statement-intake.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FinancialStatementIntakeModel } from './financial-statement-intake.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectionStrategy, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-financial-statement-intake',
  templateUrl: './financial-statement-intake.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialStatementIntakeComponent implements OnInit {
  @Input() deal: BasicInfoModel
  model: FinancialStatementIntakeModel
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
    private ser: FinancialStatementIntakeService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new FinancialStatementIntakeModel();
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
      start_date: [this.model.start_date, []],
      due_date: [this.model.due_date, []],
      location: [this.model.location, []],
      partner: [this.model.partner, []],
      manager: [this.model.manager, []],
      source: [this.model.source, []],
      assign_to: [this.model.assign_to, []],

      returning_client: [this.model.returning_client, []],
      documents_returned: [this.model.documents_returned, []],
      FS: [this.model.FS, []],
      book_cleanup: [this.model.book_cleanup, []],
      deposit: [this.model.deposit, []],

      business_name: [this.model.business_name, []],
      EIN: [this.model.EIN, []],
      phone: [this.model.phone, []],
      email: [this.model.email, []],
      address: [this.model.address, []],
      business_owner: [this.model.business_owner, []],
      bid_amount: [this.model.bid_amount, []],
      industry_type: [this.model.industry_type, []],
      length_of_contract: [this.model.length_of_contract, []],
      cs_project_template_id: [this.model.cs_project_template_id, []],

      compliation: this.fb.group({
        full_disc: [this.model.compliation.full_disc, []],
        non_disc: [this.model.compliation.non_disc, []],
        CPFS: [this.model.compliation.CPFS, []],
        WIP: [this.model.compliation.WIP, []],
        tax_gaap: [this.model.compliation.tax_gaap, []],
        cash_flows: [this.model.compliation.cash_flows, []],
      }),
      review: this.fb.group({
        full_disc: [this.model.review.full_disc, []],
        non_disc: [this.model.review.non_disc, []],
        RPFS: [this.model.review.RPFS, []],
        WIP: [this.model.review.WIP, []],
        tax_gaap: [this.model.review.tax_gaap, []],
        cash_flows: [this.model.review.cash_flows, []],
      }),
      book_keeping_info: this.fb.group({
        full_service_bookkeeping: [this.model.book_keeping_info.full_service_bookkeeping, []],
        passwords: [this.model.book_keeping_info.passwords, []],
        quickbooks_others: [this.model.book_keeping_info.quickbooks_others, []],
        security_questions: [this.model.book_keeping_info.security_questions, []],
      }),
      entity_type: [this.model.entity_type, []],
      peiod_of_financial: [this.model.peiod_of_financial, []],

      notes: [this.model.notes],
      partner_acceptance: [this.model.partner_acceptance],
      personal_note: [this.model.personal_note],

    })
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
