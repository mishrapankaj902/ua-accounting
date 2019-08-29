import { QueryParam } from './../../../shared/service/query-param';
import { TaxPlanningIntakeService } from './tax-planning-intake.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { TaxPlanningIntakeModel } from './tax-planning-intake.model';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { Component, OnInit, Input, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tax-planning-intake',
  templateUrl: './tax-planning-intake.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxPlanningIntakeComponent implements OnInit {
  @Input() deal: BasicInfoModel
  model: TaxPlanningIntakeModel
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
    private ser: TaxPlanningIntakeService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new TaxPlanningIntakeModel();
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
      assign_to: [this.model.assign_to, []],
      federal: [this.model.federal, []],
      state: [this.model.state, []],
      returning_client: [this.model.returning_client, []],
      name: [this.model.name, []],
      birthday: [this.model.birthday, []],
      dod: [this.model.dod, []],
      occupation: [this.model.occupation, []],
      ss: [this.model.ss, []],
      phone: [this.model.phone, []],
      email: [this.model.email, []],
      spouse_name: [this.model.spouse_name, []],
      spouse_birthday: [this.model.spouse_birthday, []],
      spouse_dod: [this.model.spouse_dod, []],
      spouse_occupation: [this.model.spouse_occupation, []],
      spouse_ss: [this.model.spouse_ss, []],
      spouse_address: [this.model.spouse_address, []],
      dependents: this.fb.group({
        saly: [this.model.dependents.saly, []],
        number: [this.model.dependents.number, []],
        over: [this.model.dependents.over, []]
      }),
      deductions: [this.model.deductions, []],
      health_insurance: [this.model.health_insurance, []],
      wages: this.fb.group({
        name: [this.model.wages.name, []],
        amount: [this.model.wages.amount, []],
        with_held: [this.model.wages.with_held, []]
      }),
      div_interest: [this.model.div_interest, []],
      nol: [this.model.nol, []],
      stock_sales: [this.model.stock_sales, []],
      other: [this.model.other, []],
      other_income: [this.model.other_income, []],
      retirement_plan: [this.model.retirement_plan, []],
      election_needed: [this.model.election_needed, []],
      payroll_needed: [this.model.payroll_needed, []],
      QBI: this.fb.group({
        0: [this.model.QBI[0], []],
        1: [this.model.QBI[1], []],
        2: [this.model.QBI[2], []],
      }),
      other_notes: [this.model.other_notes, []],
      partner_acceptance: [this.model.partner_acceptance, []],
      date: [this.model.date, []],
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
