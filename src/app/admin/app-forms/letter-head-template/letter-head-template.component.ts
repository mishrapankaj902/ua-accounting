import { QueryParam } from './../../../shared/service/query-param';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LetterHeadTemplateModel } from './letter-head-template.model';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { LetterHeadTemplateService } from './letter-head-template.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-letter-head-template',
  templateUrl: './letter-head-template.component.html',
  styleUrls: ['./letter-head-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetterHeadTemplateComponent implements OnInit {
  width = '0%';
  @ViewChild('file') file: ElementRef;
  @Input() deal: BasicInfoModel
  model: LetterHeadTemplateModel
  @Input() $tabRef: Subject<any>;
  render = false;
  isUpdate = false;

  constructor(
    private toastr: ToastrService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private ser: LetterHeadTemplateService,
  ) { }
  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.isUpdate = false;
        this.model = new LetterHeadTemplateModel();
        this.model.$deal_id = this.deal.$id
      }
      this.render = true;
      this.cdr.markForCheck();
    })
  }

  submit() {
    if(this.isUpdate){
      this.loader.loader(false);
      this.$tabRef.next(true);
      return
    }
    let randomId = Math.random().toString(36).substring(2);
    const file: File = this.file.nativeElement.files[0];
    randomId = randomId + file.name.substring(file.name.lastIndexOf('.'))
    this.model.file_path = `LetterHeadTemplate/${randomId}`;
    this.model.file_name = file.name;
    this.model.temp_name = randomId;

    this.ser.fileHandler(this.model.file_path).put(file).task.on('state_changed',
      snapshot => {
        this.width = '1%';
        this.width = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + '%';
        this.cdr.markForCheck()
      },
      err => {
        this.width = '0%';
        this.loader.loader(false);
        this.toastr.error('Upload Failed. Error: ' + err.message)
      },
      () => {
        this.width = '100%';
        this.toastr.success('File uploaded successfully.')
        this.saveData();
      });
  }

  deleteFile(model: LetterHeadTemplateModel) {
    this.loader.loader(true);
    this.ser.fileHandler(model.file_path).delete().subscribe(
      s => {
        this.ser.delete(model).then(_ => {
          this.toastr.success('File successfully deleted')
          this.ngOnInit();
          this.loader.loader(false);
        })
      },
      err => {
        this.loader.loader(false);
        this.toastr.error('File Deletion Failed. Error: ' + err.message)
      });
  }

  downloadFile(model: LetterHeadTemplateModel) {
    this.loader.loader(true);
    this.ser.fileHandler(model.file_path).getDownloadURL().subscribe(
      s => {
        window.open(s);
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = function(event) {
        //   var blob = xhr.response;
        // };
        // xhr.open('GET', s);
        // xhr.send();
        this.loader.loader(false);
      },
      err => {
        this.loader.loader(false);
        this.toastr.error('File Deletion Failed. Error: ' + err.message)
      });
  }

  saveData() {
    if (this.model.$id) {
      this.ser.update({ ...this.model }).then(
        () => {
          this.$tabRef.next(true);
          this.loader.loader(false);
        },
        e => {
          this.toastr.error(e.message);
          this.loader.loader(false);
        })
    } else {
      this.ser.create({ ...this.model }).then(
        () => {
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
