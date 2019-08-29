import { QueryParam } from './../../../shared/service/query-param';
import { MailWaiverService } from './mail-waiver.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { BaseModel } from './../model/_base.model';
import { BookKeepingModel } from './../book-keeping/book-keeping.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mail-waiver',
  templateUrl: './mail-waiver.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailWaiverComponent implements OnInit {
  @Input() deal: BasicInfoModel
  model: MailWaiverModel
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
    private ser: MailWaiverService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new MailWaiverModel();
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
      print_name: [this.model.print_name, []],
      date: [this.model.date, []],
      year: [this.model.year, []],
      signature: [this.model.signature, []],
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

export class MailWaiverModel extends BaseModel {
  $id: string = '';
  $deal_id: string = '';
  print_name: string = '';
  date: string = '';
  year: string = '';
  signature: string = '';

  public clear() {
    this.$id = '';
    this.print_name = '';
    this.date = '';
    this.year = '';
    this.signature = '';
    return this;
  }
}
