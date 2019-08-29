import { QueryParam } from './../../../shared/service/query-param';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { FinancialFormService } from './financial-form.service';
import { FinancialFormModel } from './financial-form.model';

@Component({
  selector: 'app-financial-form',
  templateUrl: './financial-form.component.html',
  styleUrls: ['./financial-form.component.css']
})
export class FinancialFormComponent implements OnInit {

  @Input() deal: BasicInfoModel
  model: FinancialFormModel
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
    private ser: FinancialFormService
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new FinancialFormModel();
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
      start_date: [this.model.start_date],
      due_date: [this.model.due_date],
      partner: [this.model.partner],
      manager: [this.model.manager],
      location: [this.model.location],
      assign_to: [this.model.assign_to],
      referral: [this.model.referral],
      return_client: [this.model.return_client],
      return_client_document: [this.model.return_client_document],
      financial_form: this.fb.group({
        business_name: [this.model.financial_form.business_name],
        nature_of_business: [this.model.financial_form.nature_of_business],
        ein: [this.model.financial_form.ein],
        phone: [this.model.financial_form.phone],
        email: [this.model.financial_form.email],
        bid_amount: [this.model.financial_form.bid_amount],
        length_of_contract: [this.model.financial_form.length_of_contract],
        bank_verification: [this.model.financial_form.bank_verification],
      }),
      check_all_that_apply: this.fb.group({
          compilation_personal_financial_statement: [this.model.check_all_that_apply.compilation_personal_financial_statement],
          compilation_full_disc: [this.model.check_all_that_apply.compilation_full_disc],
          compilation_non_disc: [this.model.check_all_that_apply.compilation_non_disc],
          compilation_development: [this.model.check_all_that_apply.compilation_development],
          compilation_cash_flows: [this.model.check_all_that_apply.compilation_cash_flows],
          compilation_wip: [this.model.check_all_that_apply.compilation_wip],
          review_personal_financial_statement: [this.model.check_all_that_apply.review_personal_financial_statement],
          review_full_disc: [this.model.check_all_that_apply.review_full_disc],
          review_non_disc: [this.model.check_all_that_apply.review_non_disc],
          review_development: [this.model.check_all_that_apply.review_development],
          review_cash_flows: [this.model.check_all_that_apply.review_cash_flows],
          review_wip: [this.model.check_all_that_apply.review_wip],
          audit: [this.model.check_all_that_apply.audit],
          period_of_financial: [this.model.check_all_that_apply.period_of_financial],
      }),
      bookkeeping_info: ({
        quickbooks: [this.model.bookkeeping_info.quickbooks],
        passwords: [this.model.bookkeeping_info.passwords],
        security_questions: [this.model.bookkeeping_info.security_questions],
        full_service: [this.model.bookkeeping_info.full_service],
        notes: [this.model.bookkeeping_info.notes],
        personal_notes: [this.model.bookkeeping_info.personal_notes],
        partner_acceptance: [this.model.bookkeeping_info.partner_acceptance]
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