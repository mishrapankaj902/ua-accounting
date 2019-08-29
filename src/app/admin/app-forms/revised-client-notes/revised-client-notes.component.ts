import { QueryParam } from './../../../shared/service/query-param';
import { SecretaryOfStatePacketService } from './../secretary-of-state-packet/secretary-of-state-packet.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { RevisedClientNotesModel } from './revised-client-notes.model';
import { RevisedClientNotesService } from './revised-client-notes.service';


@Component({
  selector: 'app-revised-client-notes',
  templateUrl: './revised-client-notes.component.html',
  styleUrls: ['./revised-client-notes.component.css']
})
export class RevisedClientNotesComponent implements OnInit {
  @Input() deal: BasicInfoModel
  model: RevisedClientNotesModel
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
    private ser: RevisedClientNotesService,
  ) { }


  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new RevisedClientNotesModel();
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
      assign_to: [this.model.assign_to, []],
      referal: [this.model.referal, []],
      document_held: [this.model.document_held, []],
      deposit_30: [this.model.deposit_30, []],
      federal: [this.model.federal, []],
      state: [this.model.state, []],
      return_client: [this.model.return_client, []],
     
      client_notes: this.fb.group({
        poa: [this.model.client_notes.poa, []],
        type: [this.model.client_notes.type, []],
        col1: this.fb.group(this.model.client_notes.col1),
        col2: this.fb.group(this.model.client_notes.col2),
      }),
      dependents: this.fb.array([
        this.fb.group(this.model.dependents[0]),
        this.fb.group(this.model.dependents[1]),
        this.fb.group(this.model.dependents[2]),
      ]),
      income: this.fb.group(this.model.income),
      deduction: this.fb.group(this.model.deduction),
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