import { Subject } from 'rxjs';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormService } from './../service/form.service';
import { BasicInfoModel } from './basic-info.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BasicInfoService } from './basic-info.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  @Input() $tabRef: Subject<any>;
  @Output() form: FormGroup
  @Input() deal: BasicInfoModel
  tasks: AngularFirestoreCollection<BasicInfoModel>
  render = false;

  type_options = [
    { id: 1, name: 'Business Accounting' },
    { id: 2, name: 'Personal Accounting' },
    { id: 3, name: 'Bookkeeping' },
    { id: 4, name: 'W2' }
  ];

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private db: AngularFirestore,
    private toastr: ToastrService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private ser: BasicInfoService,
  ) { }

  ngOnInit() {
    //this.tasks = this.db.collection<BasicInfoModel>('Clients')
    this.tasks = this.db.collection<BasicInfoModel>('ClientBasicInfo')
    this.tasks.doc(this.deal.$id).get().subscribe(d => {
      const data = d.data();
      // console.log(data);
      data.$id = d.id;
      this.form = this.fb.group({
        $id: [data.$id, []],
        contact_person_name: [data.contact_person_name, [Validators.required]],
        company_name: [data.company_name, []],
        query: [data.query, []],
        representative: [data.representative, []],
        title: [data.title, []],
        deal_value: [data.deal_value, []],
        deal_currency: [data.deal_currency, []],
        close_date: [data.close_date, []],
        pipe_line: [data.pipe_line, []],
        type: [data.type, []],
        deal_name: [this.deal.deal_name, [Validators.required]],
        start_date: [this.deal.start_date ? this.deal.start_date.toDate() : '', []],
        meeting_length: [this.deal.meeting_length, []],
        deal_desc: [this.deal.deal_desc, []],
        email: [data.email, [Validators.required, Validators.email]],
        phone: [data.phone, [Validators.required]],
        ein: [data.ein, []],
        ssn: [data.ssn, []],
        status: [data.status, []],
        address: [data.address, []],
      });
      this.render = true;
      this.cdr.markForCheck()
    });
  }

  ngOnDestroy() {

  }

  submit() {
    this.fs.markFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.toastr.error('Please fill all mandatory fields')
      this.cdr.detectChanges();
      this.loader.loader(false)
      return
    }
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
  }

}

