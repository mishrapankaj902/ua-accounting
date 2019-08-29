import { PersonalTaxesIntakeService } from './personal-taxes-intake.service';
import { PersonalTaxesIntakeModel, Dependent } from './personal-taxes-intake.model';
import { QueryParam } from './../../../shared/service/query-param';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, Input, ChangeDetectorRef, Output, ChangeDetectionStrategy } from '@angular/core';
import { BasicInfoModel } from '../basic-info/basic-info.model';

@Component({
  selector: 'app-personal-taxes-intake',
  templateUrl: './personal-taxes-intake.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalTaxesIntakeComponent implements OnInit {

  @Input() deal: BasicInfoModel
  model: PersonalTaxesIntakeModel
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
    private ser: PersonalTaxesIntakeService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new PersonalTaxesIntakeModel();
        this.model.$deal_id = this.deal.$id
      }
      this.initForm();
      this.render = true;
      this.cdr.markForCheck();
    })
  }

  initForm() {
    this.form = this.fb.group({
      $id: [this.model.$id, []],
      $deal_id: [this.model.$deal_id, []],
      start_date: [this.model.start_date, []],
      due_date: [this.model.due_date, []],
      location: [this.model.location, []],
      partner: [this.model.partner, []],
      manager: [this.model.manager, []],
      referral: [this.model.referral, []],
      assign_to: [this.model.assign_to, []],
      engagement_letter_received: [this.model.engagement_letter_received, []],
      send_engagement_letter: [this.model.send_engagement_letter, []],
      documents_held: [this.model.documents_held, []],
      deposit: [this.model.deposit, []],
      federal: [this.model.federal, []],

      state: [this.model.state, []],
      returning_client: [this.model.returning_client, []],
      partner_followup_needed: [this.model.partner_followup_needed, []],
      poa: [this.model.poa, []],
      name: [this.model.name, []],
      birthday: [this.model.birthday, []],
      dod: [this.model.dod, []],
      occupation: [this.model.occupation, []],
      ss: [this.model.ss, []],
      phone: [this.model.phone, []],
      email: [this.model.email, []],
      year: [this.model.year, []],
      spouse_name: [this.model.spouse_name, []],
      spouse_birthday: [this.model.spouse_birthday, []],
      spouse_dod: [this.model.spouse_dod, []],
      spouse_occupation: [this.model.spouse_occupation, []],
      spouse_ss: [this.model.spouse_ss, []],
      spouse_address: [this.model.spouse_address, []],
      dependents: this.fb.array([]),

      wages: [this.model.wages, []],
      alimony: [this.model.alimony, []],
      bussiness_income: [this.model.bussiness_income, []],
      schedule_k1s: [this.model.schedule_k1s, []],
      dividends: [this.model.dividends, []],
      global_winnings: [this.model.global_winnings, []],
      interest: [this.model.interest, []],
      rental_income: [this.model.rental_income, []],
      retirement_income: [this.model.retirement_income, []],
      social_security: [this.model.social_security, []],
      stock_sales: [this.model.stock_sales, []],
      unemployment: [this.model.unemployment, []],
      income_from_other_states: [this.model.income_from_other_states, []],
      dates: [this.model.dates, []],
      educator_expenses: [this.model.educator_expenses, []],

      standard_education: [this.model.standard_education, []],
      itemized: [this.model.itemized, []],
      real_state_property_tax: [this.model.real_state_property_tax, []],
      mortgage_interest: [this.model.mortgage_interest, []],
      tax_prapogation_fee: [this.model.tax_prapogation_fee, []],
      sales_tax: [this.model.sales_tax, []],
      charitable_donation_cash: [this.model.charitable_donation_cash, []],
      charitable_donation_non_cash: [this.model.charitable_donation_non_cash, []],
      attorney_fees: [this.model.attorney_fees, []],
      medical_expenses: [this.model.medical_expenses, []],
      dmv: [this.model.dmv, []],
      other: [this.model.other, []],
      student_loan_interest: [this.model.student_loan_interest, []],
      childcare: [this.model.childcare, []],
      ira: [this.model.ira, []],
      moving_expense: [this.model.moving_expense, []],
      energy_credits: [this.model.energy_credits, []],

      c1095: [this.model.c1095, []],
      a1095: [this.model.a1095, []],
      other_item_needed: [this.model.other_item_needed, []],
      form_2016: [this.model.form_2016, []],
      ua_to_do: [this.model.ua_to_do, []],
      service_to_discuss: [this.model.service_to_discuss, []],
      partner_acceptance: [this.model.partner_acceptance, []],
      expeted_refund: [this.model.expeted_refund, []],
      routing_number: [this.model.routing_number, []],
      account_number: [this.model.account_number, []],
      financial_istituion: [this.model.financial_istituion, []],
      date: [this.model.date, []],
      estimated_tax: [this.model.estimated_tax, []],
    });
    if (this.isUpdate) {
      this.model.dependents.forEach(e => {
        this.createDependent(e);
      })
    } else {
      this.createDependent(new Dependent());
      this.createDependent(new Dependent());
      this.createDependent(new Dependent());
    }
  }

  createDependent(dependent: Dependent) {
    (<FormArray>this.form.controls['dependents']).push(this.fb.group({
      name: [dependent.name, []],
      ss: [dependent.ss, []],
      relationship: [dependent.relationship, []],
      education: [dependent.education, []]
    }));
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
