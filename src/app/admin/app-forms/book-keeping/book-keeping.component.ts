import { QueryParam } from './../../../shared/service/query-param';
import { BookKeepingService } from './book-keeping.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { BookKeepingModel } from './book-keeping.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'book-keeping',
  templateUrl: './book-keeping.component.html',
  styles: []
})
export class BookKeepingComponent implements OnInit {

  @Input() deal: BasicInfoModel
  model: BookKeepingModel
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
    private ser: BookKeepingService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new BookKeepingModel();
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
      partner: [this.model.partner],
      manager: [this.model.manager],
      return_client: [this.model.return_client],
      type: [this.model.type],
      project: this.fb.group({
        amount: [this.model.project.amount],
        duration: [this.model.project.duration],
        due_date: [this.model.project.due_date],
      }),
      quote: this.fb.group({
        won_date: [this.model.quote.won_date],
        lost_date: [this.model.quote.lost_date],
      }),
      deposit_made: [this.model.deposit_made],
      deposit_requested: [this.model.deposit_requested],
      deposit_required: [this.model.deposit_required],
      business_info: this.fb.group({
        business_info: [this.model.business_info.business_info],
        owner: [this.model.business_info.owner],
        main_contact: [this.model.business_info.main_contact],
        contact_info: [this.model.business_info.contact_info],
        ein: [this.model.business_info.ein],
        phone: [this.model.business_info.phone],
        email: [this.model.business_info.email, [Validators.email]],
        address: [this.model.business_info.address],
        include_fs_letter: [this.model.business_info.include_fs_letter],
        letter_sent_date: [this.model.business_info.letter_sent_date],
      }),
      staff_responsible_for_quote: [this.model.staff_responsible_for_quote],
      industry: [this.model.industry],
      software_quickbooks: [this.model.software_quickbooks],
      software_other: [this.model.software_other],
      bank_name: [this.model.bank_name],
      bank_qty: [this.model.bank_qty],
      credit_card_name: [this.model.credit_card_name],
      credit_card_qty: [this.model.credit_card_qty],
      loans: [this.model.loans],
      payroll_info: [this.model.payroll_info],
      prior_depr_report: [this.model.prior_depr_report],
      other_special_requests: [this.model.other_special_requests],
      quote_amount: [this.model.quote_amount],
      quote_date: [this.model.quote_date],

      logins: [this.model.logins],
      sales_use_tax_issues: [this.model.sales_use_tax_issues],
      other_notes: [this.model.other_notes],
      description_business: [this.model.description_business],
      security_questions: [this.model.security_questions],
      personally_paid_business_expenses: [this.model.personally_paid_business_expenses],
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
