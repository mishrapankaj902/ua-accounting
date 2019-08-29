import { QueryParam } from './../../../shared/service/query-param';
import { BusinessTaxesIntakeService } from './business-taxes-intake.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { BusinessTaxesIntakeModel } from './business-taxes-intake.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectionStrategy, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-business-taxes-intake',
  templateUrl: './business-taxes-intake.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessTaxesIntakeComponent implements OnInit {
@Input() deal: BasicInfoModel
  model: BusinessTaxesIntakeModel
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
    private ser: BusinessTaxesIntakeService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new BusinessTaxesIntakeModel();
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
      location: [this.model.location],
      partner: [this.model.partner],
      manager: [this.model.manager],
      source: [this.model.source],
      assign_to: [this.model.assign_to],
      return_client: [this.model.return_client],

      client_notes: this.fb.group({
        federal: [this.model.client_notes.federal],
        books: [this.model.client_notes.books],
        s_election_amount: [this.model.client_notes.s_election_amount],
        state_name: [this.model.client_notes.state_name],
        state_amount: [this.model.client_notes.state_amount],
        label_1099s: [this.model.client_notes.label_1099s],
        deposit: [this.model.client_notes.deposit],
        s_election_is_late: [this.model.client_notes.s_election_is_late],
        followup_needed: [this.model.client_notes.followup_needed],
        engagement_letter: [this.model.client_notes.engagement_letter],
      }),

      business_name: [this.model.business_name, [Validators.required]],
      ein: [this.model.ein, [Validators.required]],
      phone: [this.model.phone, [Validators.required]],
      email: [this.model.email, [Validators.required, Validators.email]],
      business_address: [this.model.business_address],
      owner: [this.model.owner],
      owner_address: [this.model.owner_address],
      industry_type: [this.model.industry_type],
      type_of_business: [this.model.type_of_business],
      year_to_be_filled: [this.model.year_to_be_filled],

      bookkeeping_information: this.fb.group({
        is_excel: [this.model.bookkeeping_information.is_excel],
        is_other: [this.model.bookkeeping_information.is_other],
        is_pbc: [this.model.bookkeeping_information.is_pbc],
        is_qbooks: [this.model.bookkeeping_information.is_qbooks],
        officer_salary: [this.model.bookkeeping_information.officer_salary],
        passwords: [this.model.bookkeeping_information.passwords],
        special_notes: [this.model.bookkeeping_information.special_notes],
      }),
      us_todo_books: this.fb.group({
        bank_accounts: [this.model.us_todo_books.bank_accounts],
        cc_accounts: [this.model.us_todo_books.cc_accounts],
        loans: [this.model.us_todo_books.loans],
        months: [this.model.us_todo_books.months],
        payroll: [this.model.us_todo_books.payroll],
        years: [this.model.us_todo_books.years],
      }),
      personally_paid_items: this.fb.group({
        auto_expense: [this.model.personally_paid_items.auto_expense, []],
        cell_phone: [this.model.personally_paid_items.cell_phone, []],
        computers_internet: [this.model.personally_paid_items.computers_internet, []],
        furniture_equipment: [this.model.personally_paid_items.furniture_equipment, []],
        health_insurance: [this.model.personally_paid_items.health_insurance, []],
        home_office: [this.model.personally_paid_items.home_office, []],
        professional_dues: [this.model.personally_paid_items.professional_dues, []],
        total: [this.model.personally_paid_items.total, []],
      }),
      copy_of_w2_w3s_pr: [this.model.copy_of_w2_w3s_pr],
      loan_statements: [this.model.loan_statements],
      prior_depreciation_reports: [this.model.prior_depreciation_reports],
      copy_of_last_year_return: [this.model.copy_of_last_year_return],
      personal_interest: [this.model.personal_interest],
      notes: [this.model.notes],
      additional_service: [this.model.additional_service],
      partner_acceptance: [this.model.partner_acceptance],
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
