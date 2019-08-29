import { QueryParam } from './../../../shared/service/query-param';
import { SecretaryOfStatePacketService } from './secretary-of-state-packet.service';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from './../service/form.service';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { SecretaryOfStatePacketModel } from './secretary-of-state-packet.model';
import { SecretaryOfStatePdfService } from '../../pdf-service/secretary-of-state-pdf.service';
import { DocusignService } from '../../../services/docusign.service';

@Component({
  selector: 'app-secretary-of-state-packet',
  templateUrl: './secretary-of-state-packet.component.html',
  styleUrls: ['./secretary-of-state-packet.component.css']
})
export class SecretaryOfStatePacketComponent implements OnInit {

  @Input() deal: BasicInfoModel
  model: SecretaryOfStatePacketModel
  @Input() $tabRef: Subject<any>;
  render = false;
  @Output() form: FormGroup;
  isUpdate = false;
  base64PDF = '';
  
  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private ser: SecretaryOfStatePacketService,
    private SOSPdf: SecretaryOfStatePdfService,
    private docusignService: DocusignService
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new SecretaryOfStatePacketModel();
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
      company_name: [this.model.company_name],
      phone_number: [this.model.phone_number],
      company_type: [this.model.company_type],
      company_address: [this.model.company_address],
      email_address: [this.model.email_address],
      officers_address: [this.model.officers_address],
      agreement: this.fb.group({
        0: [this.model.agreement[0]],
        1: [this.model.agreement[1]],
        2: [this.model.agreement[2]],
        3: [this.model.agreement[3]],
        4: [this.model.agreement[4]],
        5: [this.model.agreement[5]],
        fee: [this.model.agreement.fee],
        date: [this.model.agreement.date],
        signature: [this.model.agreement.signature],
      }),
      EIN: this.fb.group({
        bussiness_state: [this.model.EIN.bussiness_state],
        responsible_party: [this.model.EIN.responsible_party],
        social_security_number: [this.model.EIN.social_security_number],
        dob: [this.model.EIN.dob],
        mailing_address: [this.model.EIN.mailing_address],
        highest_employee: [this.model.EIN.highest_employee],
        first_wage_date: [this.model.EIN.first_wage_date],
        principal_bussiness_activity: [this.model.EIN.principal_bussiness_activity],
        shareholder_name: [this.model.EIN.shareholder_name],
        shareholder_owner_ship: [this.model.EIN.shareholder_owner_ship],
        shareholder_effective_from: [this.model.EIN.shareholder_effective_from],
        initials: [this.model.EIN.initials],
      }),
      name: [this.model.name],
      amount: [this.model.amount],
      after_date: [this.model.after_date],
      payment_for: [this.model.payment_for],
      billing_address: [this.model.billing_address],
      phone: [this.model.phone],
      city: [this.model.city],
      email: [this.model.email],
      account_type: [this.model.account_type],
      card_holder_name: [this.model.card_holder_name],
      card_account_number: [this.model.card_account_number],
      exp_date: [this.model.exp_date],
      cvv2: [this.model.cvv2],
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

    this.onExportPdf(this.form);
    //return false;
  }


  async onExportPdf(formData) {
    //console.log('here');return false;
    // if (!this.docusignService.getToken()) {
    //   this.docusignService.redirect()
    //   console.log('error');
    //   return;
    // }
    try {
      const info = await this.docusignService.getUserInfo().toPromise();
    } catch (error) {
      this.docusignService.redirect();
      this.toastr.error("Valid token not found.");
      console.log('error');
      return;
    }

    const data: any = await this.SOSPdf.onExportPdf(formData.value);
    data.save('SECRETARY-OF-STATE.pdf');
    const res = data.output('datauri').split(',')[1];
    this.docusignService.uploadPDF({
      content: res,
      content_name: 'SOS Form',
      email: 'test.sdd7@gmail.com',//'test.sdd7@gmail.com',
      name: 'Chris Bergstorm'
    }).subscribe(d => {
      this.toastr.success("Mail successfully sent for sign.")
    }, e => {
      this.toastr.error("Some error occured.")
    })
  }

}