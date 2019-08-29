import { QueryParam } from './../../../shared/service/query-param';
import { SecretaryOfStatePacketService } from './../secretary-of-state-packet/secretary-of-state-packet.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { RevisedBusinessFormModel } from './revised-business-form.model';
import { RevisedBusinessFormService } from './revised-business-form.service';

@Component({
  selector: 'app-revised-business-form',
  templateUrl: './revised-business-form.component.html',
  styleUrls: ['./revised-business-form.component.css']
})
export class RevisedBusinessFormComponent implements OnInit {
  @Input() deal: BasicInfoModel;
  model: RevisedBusinessFormModel
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
    private ser: RevisedBusinessFormService,
  ) { }


  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new RevisedBusinessFormModel();
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
      partner: [this.model.partner, []],
      manager: [this.model.manager, []],
      location: [this.model.location, []],
      referral: [this.model.referral, []],
      assign_to: [this.model.assign_to, []],
      return_client: [this.model.return_client, []],
      client_notes: this.fb.group({
        federal: [this.model.client_notes.federal, []],
        books: [this.model.client_notes.books, []],
        s_election: [this.model.client_notes.s_election, []],
        state: [this.model.client_notes.state, []],
        _1099s: [this.model.client_notes._1099s, []],
        deposit: [this.model.client_notes.deposit, []],
        return_docs: [this.model.client_notes.return_docs, []],
        business_name: [this.model.client_notes.business_name, []],
        email: [this.model.client_notes.email, []],
        nature_of_business: [this.model.client_notes.nature_of_business, []],
        business_address: [this.model.client_notes.business_address, []],
        ein: [this.model.client_notes.ein, []],
        phone: [this.model.client_notes.phone, []],
      }),
      owner: this.fb.array([
        this.fb.group(this.model.owner[0]),
        this.fb.group(this.model.owner[1])
      ]),
      owners_address: [this.model.owners_address, []],
      business_info: this.fb.group(this.model.business_info),
      ua_books: this.fb.group(this.model.ua_books),
      attach_passwords: this.fb.group(this.model.attach_passwords),
      other_items: this.fb.group(this.model.other_items),
      others: this.fb.group(this.model.others),
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
