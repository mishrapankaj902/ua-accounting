import { UtilService } from './../../../shared/service/util.service';
import { AuthService } from './../../../auth.service';
import { BasicInfoService } from './../../app-forms/basic-info/basic-info.service';
import { BasicInfoModel } from './../../app-forms/basic-info/basic-info.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { MatSpinnerButtonComponent } from 'mat-progress-buttons';
import { GraphService } from '../../../graph.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.css']
})
export class AddDealComponent implements OnInit {
  dateTime: any;
  isUpdate = false;
  model: BasicInfoModel = new BasicInfoModel();
  form: FormGroup
  btnOptions = {
    active: false,
    text: 'Add Deal',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    flat: false,
    fab: false,
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  }
  type_options = [
    { id: 1, name: 'Business Accounting' },
    { id: 2, name: 'Personal Accounting' },
    { id: 3, name: 'Bookkeeping' },
    { id: 4, name: 'W2' }
  ];
  pipe_line_options = [
    { id: 1, name: 'Cold' },
    { id: 2, name: 'Contacted' },
    { id: 3, name: 'Pitched' },
    { id: 4, name: 'Proposal Sent' },
    { id: 5, name: 'Closed DEAL' },
  ];
  authenticated = false;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private ser: BasicInfoService,
    private graphService: GraphService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    if (this.isUpdate) {
      this.btnOptions.text = 'Edit Deal';
    }
    this.form = this.fb.group({
      $id: [this.model.$id, []],
      contact_person_name: [this.model.contact_person_name, [Validators.required]],
      company_name: [this.model.company_name, []],
      query: [this.model.query, []],
      representative: [this.model.representative, []],
      title: [this.model.title, []],
      deal_value: [this.model.deal_value, []],
      deal_currency: [this.model.deal_currency, []],
      close_date: [this.model.close_date, []],
      pipe_line: [this.model.pipe_line, []],
      type: [this.model.type, []],
      email: [this.model.email, [Validators.required, Validators.email]],
      phone: [this.model.phone, [Validators.required]],
      ein: [this.model.ein, []],
      ssn: [this.model.ssn, []],
      status: [this.model.status, []],
      address: [this.model.address, []],
      deal_name: [this.model.deal_name, [Validators.required]],
      deal_size: [this.model.deal_size, [Validators.required]],
      deal_desc: [this.model.deal_desc, []],
      start_date: [this.model.start_date ? this.model.start_date.toDate() : '', []],
      meeting_length: [this.model.meeting_length, []]
    });
    this.isCal();
  }
  async isCal() {
    this.authService.getAccessToken().then(d => this.authenticated = !!d);
  }
  submit($btn: MatSpinnerButtonComponent, content) {
    // this.authService.getAccessToken().then(d => {
    //   if (!d) {
    //     //this.authService.signIn();
    //     this.toastr.error('Please first connect with outlook!');
    //   }
    // })
    $btn.options.active = true;
    this.markFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.toastr.error('Please fill all mandatory fields')
      $btn.options.active = false
      return
    }
    this.ser.db.collection<any>('ClientBasicInfo', ref => ref.where('email', '==', this.form.value.email)).get().subscribe(r => {
      if (r.docs.length !== 0) {
        this.toastr.error('This email id already registered with another deal.');
        return;
      }

    if (this.model.$id) {
      this.ser.update(this.form.value).then(
        () => {
          this.toastr.success('Data Successfully saved.');
          $btn.options.active = false;
          this.activeModal.dismiss()
        });
    } else {
      this.ser.create(this.form.value).then(
        (s: DocumentReference) => {
          this.toastr.success('Data Successfully saved.');
          $btn.options.active = false;
          this.model.$id = (s.id);
          this.form.controls.$id.setValue(s.id);
          this.activeModal.dismiss()
        });
    }
    this.graphService.createEvents(this.form.value)
      .then((events) => {
        this.toastr.success('Event created Successfully!');
      });
    })
  }

  async connectOutlook() {
    await this.authService.signIn().then(() => this.authenticated = true);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  errorHandler(e, $btn) {
    this.toastr.error(e.message)
    $btn.options.active = false;
  }
}