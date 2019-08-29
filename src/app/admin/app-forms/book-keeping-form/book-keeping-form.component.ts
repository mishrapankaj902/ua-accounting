import { QueryParam } from './../../../shared/service/query-param';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { BookKeepingFormModel } from './book-keeping-form.model';
import { BookKeepingFormService } from './book-keeping-form.service';

@Component({
  selector: 'app-book-keeping-form',
  templateUrl: './book-keeping-form.component.html',
  styleUrls: ['./book-keeping-form.component.css']
})
export class BookKeepingFormComponent implements OnInit {

  @Input() deal: BasicInfoModel
  model: BookKeepingFormModel
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
    private ser: BookKeepingFormService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new BookKeepingFormModel();
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
      referral: [this.model.referral],
      assign_to: [this.model.assign_to],
      return_client: [this.model.return_client],
      project_info: this.fb.group({
        period: [this.model.project_info.period, []],
        budget: [this.model.project_info.budget, []],
        total_hours: [this.model.project_info.total_hours, []],
        ua: [this.model.project_info.ua, []],
        duvlin: [this.model.project_info.duvlin, []],
        return_client_doc: [this.model.project_info.return_client_doc, []],
      }),
      bussiness_info: this.fb.group({
        name: [this.model.bussiness_info.name, [Validators.required]],
        nature: [this.model.bussiness_info.nature, []],
        ein: [this.model.bussiness_info.ein, []],
        phone: [this.model.bussiness_info.phone, []],
        fax: [this.model.bussiness_info.fax, []],
        email: [this.model.bussiness_info.email, [Validators.required]],
        address: [this.model.bussiness_info.address, []],
        owners: this.fb.array([
          this.fb.group(this.model.bussiness_info.owners[0]),
          this.fb.group(this.model.bussiness_info.owners[1]),
        ]),
        welcome_email: [this.model.bussiness_info.welcome_email, []],
        statement_requested: [this.model.bussiness_info.statement_requested, []],
        arrangement_card_letter: [this.model.bussiness_info.arrangement_card_letter, []],
        credit_card_number_on_file: [this.model.bussiness_info.credit_card_number_on_file, []],
        edit_chart: [this.model.bussiness_info.edit_chart, []],
      }),
      book_keeping_info: this.fb.group(this.model.book_keeping_info),
      full_service_book_keeping: this.fb.group(this.model.full_service_book_keeping),
      other_item_paid: this.fb.group(this.model.other_item_paid),
      payroll_provider: this.fb.group(this.model.payroll_provider)
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