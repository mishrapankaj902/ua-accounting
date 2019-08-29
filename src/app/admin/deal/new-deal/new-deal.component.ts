import { UtilService } from './../../../shared/service/util.service';
import { TaxPlanningIntakeComponent } from './../../app-forms/tax-planning-intake/tax-planning-intake.component';
import { SecretaryOfStatePacketComponent } from './../../app-forms/secretary-of-state-packet/secretary-of-state-packet.component';
import { Subject, Observable } from 'rxjs';
import { BasicInfoModel } from './../../app-forms/basic-info/basic-info.model';
import { MailWaiverComponent } from './../../app-forms/mail-waiver/mail-waiver.component';
import { ReceiptTemplateComponent } from './../../app-forms/receipt-template/receipt-template.component';
import { LetterHeadTemplateComponent } from './../../app-forms/letter-head-template/letter-head-template.component';

import { FinancialStatementIntakeComponent } from './../../app-forms/financial-statement-intake/financial-statement-intake.component';
import { PaymentPlanAgreementComponent } from './../../app-forms/payment-plan-agreement/payment-plan-agreement.component';
import { CreditCardPaymentAuthorizationComponent } from './../../app-forms/credit-card-payment-authorization/credit-card-payment-authorization.component';

import { BusinessTaxesIntakeComponent } from './../../app-forms/business-taxes-intake/business-taxes-intake.component';
import { BookKeepingComponent } from './../../app-forms/book-keeping/book-keeping.component';
import { LoaderService } from './../../../services/loader.service';
import { BankVerificationComponent } from './../../app-forms/bank-verification/bank-verification.component';
import { CssRequestComponent } from './../../app-forms/css-request/css-request.component';
import { Component, OnInit, ViewEncapsulation, ViewChild, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { trigger, style, transition, animate } from '@angular/animations';
import { PersonalTaxesIntakeComponent } from '../../app-forms/personal-taxes-intake/personal-taxes-intake.component';
import { BasicInfoComponent } from '../../app-forms/basic-info/basic-info.component';
import { BasicInfoService } from '../../app-forms/basic-info/basic-info.service';
import * as _ from 'lodash';
import { AuthService } from '../../../services/auth.service';
import { AclService } from '../../../shared/service/acl.service';
import { EventEmitterService } from '../../../services/event-emitter.service';
import * as moment from 'moment'
import { SchFormComponent } from '../../app-forms/sch-form/sch-form.component';
import { BookKeepingFormComponent } from '../../app-forms/book-keeping-form/book-keeping-form.component';
import { FinancialFormComponent } from '../../app-forms/financial-form/financial-form.component';
import { BookkeepingTaxesPdfService } from '../../pdf-service/bookkeeping-taxes-pdf.service';
import { RevisedBusinessFormComponent } from '../../app-forms/revised-business-form/revised-business-form.component';
import { RevisedClientNotesComponent } from '../../app-forms/revised-client-notes/revised-client-notes.component';
import { DocusignService } from '../../../services/docusign.service';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-new-deal',
  templateUrl: './new-deal.component.html',
  styleUrls: ['./new-deal.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDealComponent implements OnInit, OnDestroy {
  $tabDetector = new Subject();
  tabDetect: Observable<any>;
  public tab = 'basic-info';

  taxesLetterData = {
    Date: '12 June 2019',
    AuthorName: 'John Jones',
    companyName: 'ABC Investment,',
    Address: 'LLC Las Vegas, NV',
    ServiceCharge: 500,
    FederalTaxReturn: 1000,
    PrintName: 'John Jones',
    Title: 'Tax returned',
    PrintDate: '12 June 2019'
  };

  pipe_line_options = [
    { id: 1, name: 'Inbound', items: [] },
    { id: 2, name: 'Waiting', items: [] },
    { id: 3, name: 'On Hold', items: [] },
    { id: 4, name: 'Work in Progress', items: [] },
    { id: 5, name: 'Awaiting Approval', items: [] },
  ];

  forms = [
    {
      key: 'bank_verification',
      name: 'Bank Verification Form',
      order_by: 1,
      component: 'bank',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'bookkeeping_intake',
      name: 'Bookkeeping Intake Form',
      order_by: 2,
      component: 'bookKeeping',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'business_tax_intake',
      name: 'Business Taxes Intake Form',
      order_by: 3,
      component: 'businessIntake',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'css_request',
      name: 'C.S.S. Request Form',
      order_by: 4,
      component: 'cssRequestComponent',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'financial_statement',
      name: 'Financial Statement Intake Form',
      order_by: 5,
      component: 'financialStatementIntake',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'letter_head_template',
      name: 'Letter Head Template',
      order_by: 6,
      component: 'LetterHeadTemplate',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'mail_waiver',
      name: 'Mail Waiver',
      order_by: 7,
      component: 'MailWaiverComponent',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'payment_plan',
      name: 'Payment Plan Contract',
      order_by: 8,
      component: 'paymentPlanAgreementComponent',
      cost: 100,
      qty: 1,
      enable: true
    }, {
      key: 'personal_tax_intake',
      name: 'Personal Taxes Intake Form',
      order_by: 9,
      component: 'personalIntake',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'receipt_template',
      name: 'Receipt Template',
      order_by: 10,
      component: 'ReceiptTemplate',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'secretary_of_state',
      name: 'SOS.2019.2doc',
      order_by: 11,
      component: 'secretaryOfStatePacketComponent',
      cost: 100,
      qty: 1,
      enable: true
    }, {
      key: 'tax_planning_intake',
      name: 'Tax Planning Intake Form',
      order_by: 12,
      component: 'taxPlanningIntakeComponent',
      cost: 100,
      qty: 1,
      enable: false
    }, {
      key: 'app-sch-form',
      name: 'Sch C Form',
      order_by: 12,
      component: 'schFormComponent',
      cost: 100,
      qty: 1,
      enable: true
    }, {
      key: 'app-book-keeping-form',
      name: 'Book Keeping',
      order_by: 12,
      component: 'bookKeepingFormComponent',
      cost: 100,
      qty: 1,
      enable: true
    }, {
      key: 'financial-form',
      name: 'Financial Form',
      order_by: 13,
      component: 'financialFormComponent',
      cost: 100,
      qty: 1,
      enable: true
    }, {
      key: 'app-revised-business-form',
      name: 'Revised Business Form',
      order_by: 14,
      component: 'revisedBusinessFormComponent',
      cost: 100,
      qty: 1,
      enable: true
    }, {
      key: 'app-revised-client-notes',
      name: 'Revised Client Notes',
      order_by: 15,
      component: 'revisedClientNotesComponent',
      cost: 100,
      qty: 1,
      enable: true
    },
  ];

  services = [
    {
      key: 'w2',
      name: 'W2',
      order_by: 1,
      frequency: 'monthly',
      cost: 500,
      qty: 0
    }, {
      key: 'bookkeeping',
      name: 'Bookkeeping',
      order_by: 2,
      frequency: 'monthly',
      cost: 500,
      qty: 0
    }, {
      key: 't1',
      name: 'T1 Form',
      order_by: 3,
      frequency: 'monthly',
      cost: 500,
      qty: 0
    }, {
      key: '1040_schedule_a',
      name: '1040 Schedule A',
      order_by: 4,
      frequency: 'monthly',
      cost: 500,
      qty: 0
    }, {
      key: '1040_schedule_b',
      name: '1040 Schedule B',
      order_by: 5,
      frequency: 'monthly',
      cost: 500,
      qty: 0
    }, {
      key: 'form_1120',
      name: 'Form 1120',
      order_by: 6,
      frequency: 'monthly',
      cost: 500,
      qty: 0
    }];

  user = {
    username: '',
    password: '',
  }
  title = "New user created with following credentials";
  @Input() basicInfoModel: BasicInfoModel;

  @ViewChild(BasicInfoComponent) basicInfo: BasicInfoComponent;
  @ViewChild(BankVerificationComponent) bank: BankVerificationComponent;
  @ViewChild(BookKeepingComponent) bookKeeping: BookKeepingComponent;
  @ViewChild(BusinessTaxesIntakeComponent) businessIntake: BusinessTaxesIntakeComponent;
  @ViewChild(FinancialStatementIntakeComponent) financialStatementIntake: FinancialStatementIntakeComponent;
  @ViewChild(CssRequestComponent) cssRequestComponent: CssRequestComponent;
  @ViewChild(MailWaiverComponent) MailWaiverComponent: MailWaiverComponent;
  @ViewChild(PaymentPlanAgreementComponent) paymentPlanAgreementComponent: PaymentPlanAgreementComponent;
  @ViewChild(CreditCardPaymentAuthorizationComponent) creditCardPaymentAuthorization: CreditCardPaymentAuthorizationComponent;
  @ViewChild(LetterHeadTemplateComponent) LetterHeadTemplate: LetterHeadTemplateComponent;
  @ViewChild(PersonalTaxesIntakeComponent) personalIntake: PersonalTaxesIntakeComponent;
  @ViewChild(ReceiptTemplateComponent) ReceiptTemplate: ReceiptTemplateComponent;
  @ViewChild(SecretaryOfStatePacketComponent) secretaryOfStatePacketComponent: SecretaryOfStatePacketComponent;
  @ViewChild(TaxPlanningIntakeComponent) taxPlanningIntakeComponent: TaxPlanningIntakeComponent;
  @ViewChild(SchFormComponent) schFormComponent: SchFormComponent;
  @ViewChild(BookKeepingFormComponent) bookKeepingFormComponent: BookKeepingFormComponent;
  @ViewChild(FinancialFormComponent) financialFormComponent: FinancialFormComponent;
  @ViewChild(RevisedBusinessFormComponent) revisedBusinessFormComponent: RevisedBusinessFormComponent;
  @ViewChild(RevisedClientNotesComponent) revisedClientNotesComponent: RevisedClientNotesComponent;


  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private loader: LoaderService,
    private basicInfoSer: BasicInfoService,
    private cdr: ChangeDetectorRef,
    private util: UtilService,
    private modalService: NgbModal,
    private auth: AuthService,
    private acl: AclService,
    private eventEmitterService: EventEmitterService,
    private btPdfService: BookkeepingTaxesPdfService,
    private docusignService: DocusignService
  ) { }

  ngOnDestroy() {
    // this.updateBasicInfo()
  }
  ngOnInit() {
    this.basicInfoModel.fillable_forms || (this.basicInfoModel.fillable_forms = []);
    this.basicInfoModel.ua_services || (this.basicInfoModel.ua_services = []);
    (async () => {
      this.basicInfoModel.fillable_forms.forEach(v => {
        const index = _.findIndex(this.forms, ['key', v.key]);
        if (index !== -1) {
          this.forms[index].cost = +v.cost;
          this.forms[index].qty = +v.qty;
        }
      });
    })();
    (async () => {
      this.basicInfoModel.ua_services.forEach(v => {
        const index = _.findIndex(this.services, ['key', v.key]);
        if (index !== -1) {
          this.services[index].cost = +v.cost;
          this.services[index].qty = +v.qty;
          this.services[index].frequency = v.frequency;
        }
      });
    })()
    this.tabDetect = this.$tabDetector.asObservable();
    this.$tabDetector.subscribe(d => {
      d && this.next();
    });
  }
  tabClick(tab: string = '') {
    this.tab = tab;
  }
  async updateBasicInfo(type: string = '') {
    // this.basicInfoModel.token = this.util.randomString(60);
    this.basicInfoModel.fillable_forms.forEach((v, k) => {
      this.basicInfoModel.fillable_forms[k] = _.find(this.forms, ['key', v.key])
    });

    if (type == 'services') {
      this.basicInfoModel.ua_services.forEach((v, k) => {
        debugger;
        this.basicInfoModel.ua_services[k] = _.find(this.services, ['key', v.key])
      });
    }

    this.basicInfoSer.update(this.basicInfoModel).then(() => {
      this.toastr.success('Deal Updated.');
      this.loader.loader(false);
    }).catch(e => {
      this.toastr.error(e.message);
      this.loader.loader(false);
    })
  }
  async submit() {
    this.loader.loader(true);
    if (this.tab == 'basic-info') {
      this.basicInfo.submit()
    } else if (this.tab == 'on_borading') {
      this.updateBasicInfo()
    } else if (this.tab == 'ua-services') {
      this.updateBasicInfo('services')
    } else {
      const index = (_.findIndex(this.basicInfoModel.fillable_forms, ['key', this.tab]));
      this[this.basicInfoModel.fillable_forms[index].component].submit();
      this.loader.loader(false);
    }
  }

  changeTab(event, tab) {
    this.tab = tab
  }

  errorHandler(e) {
    this.toastr.error(e.message)
    this.loader.loader(false);
  }

  async next() {

    if (this.tab == 'basic-info') {
      this.tab = 'on_borading';
    } else if (this.tab == 'on_borading') {
      this.tab = this.basicInfoModel.fillable_forms.length ? this.basicInfoModel.fillable_forms[0].key : 'on_borading';
    } else if (this.tab == 'ua-services') {
      this.tab = 'ua-services';
    } else {
      const index = _.findIndex(this.basicInfoModel.fillable_forms, { key: this.tab })
      if ((index) !== -1) {
        this.tab = (index + 1 == this.basicInfoModel.fillable_forms.length) ? 'basic-info' : this.basicInfoModel.fillable_forms[(index + 1) % this.basicInfoModel.fillable_forms.length].key;
        //Updating data of filled form
        this.basicInfoModel.fillable_forms[index].status = 'COMPLETED';
        this.basicInfoModel.fillable_forms[index].complete_percent = 100;
        this.basicInfoModel.fillable_forms[index].class = 'success';
        if (this.basicInfoModel.fillable_forms[index].filledAt) {
          this.basicInfoModel.fillable_forms[index].updatedAt = new Date();
          this.basicInfoModel.fillable_forms[index].updatedBy = this.auth.id;
        } else {
          this.basicInfoModel.fillable_forms[index].filledAt = new Date();
          this.basicInfoModel.fillable_forms[index].filledBy = this.auth.id;
        }
        try {
          this.basicInfoSer.update(this.basicInfoModel)
        }
        finally {

        }
      } else {
        this.tab = 'basic-info';
      }
    }
    this.cdr.markForCheck();
  }

  isSelected(item) {
    return _.find(this.basicInfoModel.fillable_forms, { key: item.key });
  }

  isSelectedService(item) {
    return _.find(this.basicInfoModel.ua_services, { key: item.key });
  }

  changeItem(event, item) {
    event.checked ? this.basicInfoModel.fillable_forms.push(item) : _.remove(this.basicInfoModel.fillable_forms, item);
    this.basicInfoModel.fillable_forms = _.sortBy(this.basicInfoModel.fillable_forms, ['order_by']);
  }

  changeItemService(event, item) {
    event.checked ? this.basicInfoModel.ua_services.push(item) : _.remove(this.basicInfoModel.ua_services, item);
    this.basicInfoModel.ua_services = _.sortBy(this.basicInfoModel.ua_services, ['order_by']);
    item.qty = event.checked ? 1 : 0;
  }

  addClientInSystem(content) {
    this.loader.loader(true);
    this.user.password = this.util.randomString(6);
    this.user.username = this.basicInfoModel.email;
    this.basicInfoSer.createUser(this.user.username, this.user.password).then((user) => {
      this.toastr.success('New user created with these credentials.');
      this.loader.loader(false);
      this.modalService.open(content, {
        backdrop: 'static',
        centered: true,
        backdropClass: 'light-blue-backdrop'
      })
      this.basicInfoSer.addUserInfo({ $id: user.user.uid, roles: ['client'], info: this.user })
    }).catch((e) => {
      this.basicInfoSer.getUserInfo(this.user.username).subscribe(d => {
        if (d.docs.length) {
          this.user = d.docs[0].data().info
          this.title = "User is already created with these credentials:"
          this.modalService.open(content, {
            backdrop: 'static',
            centered: true,
            backdropClass: 'light-blue-backdrop'
          })
        } else {
          this.toastr.error(e.message);
        }
        this.loader.loader(false);
      })
    });
  }

  async onExportPdf() {
    this.btPdfService.onExportPdf(this.basicInfoModel, this.basicInfoModel.ua_services); return;
    if (!this.docusignService.getToken()) {
      this.docusignService.redirect();
      console.log('error here');
      return
    }
    let data: any = this.btPdfService.onExportPdf(this.basicInfoModel, this.basicInfoModel.ua_services);
    data = (data.split(',')[1]);
    this.docusignService.uploadPDF({
      content: data,
      content_name: 'Engagement Letter',
      email: 'test.sdd7@gmail.com',//this.basicInfoModel.email,
      name: 'Gaurav Pratap',//this.basicInfoModel.deal_name
    }).subscribe(d => {
      this.toastr.success("Mail successfully sent for sign.")
    }, e => {
      this.toastr.error("Some error occured.")
    })

  }
}