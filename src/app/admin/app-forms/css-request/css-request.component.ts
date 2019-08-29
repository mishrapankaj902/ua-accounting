import { QueryParam } from './../../../shared/service/query-param';
import { CSSRequestService } from './css-request.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { CSSRequestModel, SectionA, SeceretaryOfState, WageIncomeTranscripts, AccountTranscripts, ComplianceCheck, OtherRequest } from './css-request.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, Output, Input, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'css-request',
  templateUrl: './css-request.component.html',
})
export class CssRequestComponent implements OnInit, OnDestroy {
 @Input() deal: BasicInfoModel
  model: CSSRequestModel
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
    private ser: CSSRequestService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new CSSRequestModel();
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
      location: [this.model.location, []],
      partner: [this.model.partner, []],
      manager: [this.model.manager, []],
      returning_client: [this.model.returning_client, []],

      send_result_to: this.fb.group({
        look_in_cs_practice: [this.model.send_result_to.look_in_cs_practice, []],
        name: [this.model.send_result_to.name, []],
      }),
      business_name: [this.model.business_name, []],
      business_name_poa: [this.model.business_name_poa, []],
      personal_name: [this.model.personal_name, []],
      personal_name_poa: [this.model.personal_name_poa, []],
      personal_name_spouse: [this.model.personal_name_spouse, []],
      personal_name_spouse_poa: [this.model.personal_name_spouse_poa, []],

      section_a: this.fb.group(new SectionA),
      seceretary_of_state: this.fb.group(new SeceretaryOfState),
      wage_income_transcripts: this.fb.group(new WageIncomeTranscripts),
      account_transcripts: this.fb.group(new AccountTranscripts),
      compliance_check: this.fb.group(new ComplianceCheck),
      other_request: this.fb.group(new OtherRequest),

      other_notes: [this.model.other_notes, []],
      partner_acceptance: [this.model.partner_acceptance, []],
      what_is_plan: [this.model.what_is_plan, []],
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


  ngOnDestroy() {

  }

}
