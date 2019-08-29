import { AuthService } from './../../../auth.service';
import { BasicInfoService } from './../../app-forms/basic-info/basic-info.service';
import { BasicInfoModel } from './../../app-forms/basic-info/basic-info.model';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { MatSpinnerButtonComponent } from 'mat-progress-buttons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-view-deal',
  templateUrl: './view-deal.component.html',
  styleUrls: ['./view-deal.component.css']
})
export class ViewDealComponent implements OnInit {

  model: BasicInfoModel = new BasicInfoModel();
  form: FormGroup
  dealId: String;
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
  private itemDoc: AngularFirestoreDocument<ViewDealComponent>;
  item: Observable<ViewDealComponent>;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private loader: LoaderService,
    private db: AngularFirestore,
    private ser: BasicInfoService,
    public authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(this.dealId);
    this.itemDoc = this.db.doc<ViewDealComponent>('ClientBasicInfo/'+ this.dealId);
    this.item = this.itemDoc.valueChanges();
    // this.tasks = this.db.collection<BasicInfoModel>('ClientBasicInfo')
    // this.tasks.doc(this.deal.$id).get().subscribe(d => {
    //   const data = d.data();
    //   data.$id = d.id;
    //   console.log(data);
    // });
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