import { QueryParam } from './../../../shared/service/query-param';

import { Subject } from 'rxjs';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { LoaderService } from './../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from 'angularfire2/firestore';
import { BankVerificationModel, BankAccount, DepositeAccount, AccountCreditLines } from './bank-verification.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Output, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BankVerificationService } from './bank-verification.service';
import { StaticUtilities } from '../../../../shared/static-utilities';
import { FormService } from '../service/form.service';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'bank-verification',
  templateUrl: './bank-verification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankVerificationComponent implements OnInit, OnDestroy {
  @Input() deal: BasicInfoModel
  model: BankVerificationModel
  @Input() $tabRef: Subject<any>;
  render = false;
  @Output() form: FormGroup;
  isUpdate = false;
  userDetail: any;

  //#region "pdf variables"
  signature = {
    name: 'Report 222',
    recipients: [
      {
        email: 'jane@example.com',
        first_name: 'Jane',
        last_name: 'Roe',
        role: 'user'
      }
    ],
    fields: {
      name: {
        value: 'John',
        role: 'user'
      },
      like: {
        value: true,
        role: 'user'
      },
      signature: {
        value: '',
        role: 'user'
      }
    },
    metadata: {
      'salesforce.opportunity_id': '123456',
      my_favorite_pet: 'Panda'
    },
    parse_form_fields: true
  };
  //#endregion

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private ser: BankVerificationService,
  ) { }

  ngOnInit() {
    this.ser.get([new QueryParam('$deal_id', this.deal.$id)]).subscribe(d => {
      if (d.length) {
        this.isUpdate = true;
        this.model = d[0].payload.doc.data();
        this.model.$id = d[0].payload.doc.id;
      } else {
        this.model = new BankVerificationModel();
        this.model.$deal_id = this.deal.$id
      }

      this.form = this.fb.group({
        $id: [this.model.$id],
        $deal_id: [this.model.$deal_id],
        applicant: [this.model.applicant, [Validators.required]],
        account_classification: [this.model.account_classification],
        bank_address: [this.model.bank_address, [Validators.required]],
        bank_account: this.fb.array([
          // this.createBankAccount()
        ]),
        deposite_account: this.fb.array([
          // this.createDepositeAccount()
        ]),
        account_credit_lines: this.fb.array([
          // this.createCreditLines()
        ]),
        additional_info: [this.model.additional_info],
        bank_representative: [this.model.bank_representative, [Validators.required]],
        verification_date: [this.model.verification_date, [Validators.required]],
      });
      this.initCreateBankAccount();
      this.initCreateCreditLines();
      this.initDepositeAccount();
      this.render = true;
      this.cdr.detectChanges();
    })
  }

  submit() {
    this.signature.name = this.form.get('applicant').value;
    this.fs.markFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.loader.loader(false)
      this.toastr.error('Please fill all mandatory fields')
      this.cdr.detectChanges();
      return
    }
    this.loader.loader(true)

    if (this.model.$id) {
      this.ser.update(this.form.value).then(
        () => {
          this.toastr.success('Data updated successfully!');
          this.onExportPdf();
          this.loader.loader(false);
          this.$tabRef.next(true);
        }, e => {
          this.toastr.error(e.message)
          this.loader.loader(false);
        });
    } else {
      this.ser.create(this.form.value).then(
        () => {
          this.toastr.success('Data Successfully saved.');
          this.loader.loader(false);
          this.onExportPdf();
          this.$tabRef.next(true);
        }, e => {
          this.toastr.error(e.message)
          this.loader.loader(false);
        });
    }
  }

  async initCreateBankAccount() {
    if (this.isUpdate) {
      this.model.bank_account.forEach(e => {
        this.addBankAccount(e);
      })
    } else {
      this.addBankAccount(new BankAccount());
      this.addBankAccount(new BankAccount());
      this.addBankAccount(new BankAccount());
    }
  }
  async initCreateCreditLines() {
    if (this.isUpdate) {
      this.model.account_credit_lines.forEach(e => {
        this.addCreditLines(e);
      })
    } else {
      this.addCreditLines(new AccountCreditLines());
      this.addCreditLines(new AccountCreditLines());
    }
  }
  async initDepositeAccount() {
    if (this.isUpdate) {
      this.model.deposite_account.forEach(e => {
        this.addDepositeAccount(e);
      })
    } else {
      this.addDepositeAccount(new DepositeAccount());
      this.addDepositeAccount(new DepositeAccount());
      this.addDepositeAccount(new DepositeAccount());
    }
  }
  ngOnDestroy() {

  }
  addBankAccount(obj: any = false) {
    obj = obj ? obj : new BankAccount();
    (<FormArray>(this.form.controls['bank_account'])).push(this.fb.group(obj))
  }

  addDepositeAccount(obj: any = false) {
    obj = obj ? obj : new DepositeAccount();
    (<FormArray>(this.form.controls['deposite_account'])).push(this.fb.group({
      account_name: [obj.account_name, []],
      account_type: [obj.account_type],
      account_number: [obj.account_number, []],
      account_balance: [obj.account_balance, []],
      average: [obj.average, []],
      date_opened: [obj.date_opened, []],
    }));
  }

  addCreditLines(obj: any = false) {
    obj = obj ? obj : new AccountCreditLines();
    (<FormArray>(this.form.controls['account_credit_lines'])).push(this.fb.group(obj))
  }

  //#region "pdf generation"

  onExportPdf() {
    console.log('Inside export function!');
    var DATA = this.form.value;
    //console.log(DATA);return false;
    this.userDetail = {
      Name: DATA.applicant,
      BankAddress: DATA.bank_address,
      InformationVerified: DATA.bank_account,
      DepositAccountsofApplicant: DATA.deposite_account,
      VerificationofLinesofcredit: DATA.account_credit_lines,
      AdditionalInfo: DATA.additional_info,
      BankRepresentative: DATA.bank_representative,
      Date: DATA.verification_date
    };

    const doc = new jsPDF();
    const img = new Image();

    const applicantDetail = this.userDetail;

    const paddingLeft = 10;

    const thisConst = this;

    img.onload = function () {
      doc.addImage(this, 10, 10, 25, 25);

      doc.setFontSize(14);
      doc.text(
        'NEVADA STATE CONTRACTORS BOARD',
        StaticUtilities.pdfTextCenter(
          doc,
          'NEVADA STATE CONTRACTORS BOARD',
          14
        ),
        15
      );

      const textAddress =
        '5390 KIETZE LANE, SUITE 102, RENO, NEVADA, 89511 (775) 688-1141 FAX (775) 688-1271, INVESTIGATIONS (775) 688-1150';
      const textAddressSub =
        '2310 CORPORATE CIRCLE, SUITE 200, HENDERSON, NEVADA, 89074 (702) 486-1100 FAX (702) 486-1190, INVESTATIONS (702) 486-1110';

      doc.setFontSize(6);
      doc.text(
        textAddress,
        StaticUtilities.pdfTextCenter(doc, textAddress, 6),
        20
      );

      doc.text(
        textAddressSub,
        StaticUtilities.pdfTextCenter(doc, textAddressSub, 6),
        23
      );

      let currentFontHeightLocation = 26;
      const textWwwNscb = 'www.nscb.nv.gov';

      doc.setFontSize(7);
      doc.text(
        textWwwNscb,
        StaticUtilities.pdfTextCenter(doc, textWwwNscb, 6),
        currentFontHeightLocation
      );

      const textBankVerification = 'BANK VERIFICATION FORM';
      doc.setFontSize(12);
      doc.text(
        textBankVerification,
        StaticUtilities.pdfTextCenter(doc, textBankVerification, 12),
        (currentFontHeightLocation += 10)
      );

      doc.setFontSize(9);
      const textNameOfApp = 'Name of Licensee/Applicant: ';
      doc.text(textNameOfApp, paddingLeft, (currentFontHeightLocation += 10));
      doc.text(applicantDetail.Name, paddingLeft + 47, (currentFontHeightLocation - 1));
      doc.line(
        paddingLeft +
        (doc.getStringUnitWidth(textNameOfApp) * 9) /
        doc.internal.scaleFactor,
        currentFontHeightLocation,
        180,
        currentFontHeightLocation
      );

      doc.text(
        'Items 1, 2 & 7 of the following report are to be completed by the applicant. Rest are to be completed by the verifying bank.',
        paddingLeft,
        (currentFontHeightLocation += 10)
      );

      doc.text(
        'After completion by you and your bank, submit this form with your application.',
        paddingLeft,
        (currentFontHeightLocation += 5)
      );

      const textNameOfBank = '1. Name and address of bank: ';
      doc.text(textNameOfBank, paddingLeft, (currentFontHeightLocation += 10));

      // Data
      doc.text(applicantDetail.BankAddress, paddingLeft + 47, (currentFontHeightLocation - 1));

      doc.line(
        paddingLeft +
        (doc.getStringUnitWidth(textNameOfBank) * 9) /
        doc.internal.scaleFactor,
        currentFontHeightLocation,
        180,
        currentFontHeightLocation
      );
      doc.line(
        paddingLeft +
        (doc.getStringUnitWidth(textNameOfBank) * 9) /
        doc.internal.scaleFactor,
        (currentFontHeightLocation += 5),
        180,
        currentFontHeightLocation
      );
      doc.line(
        paddingLeft +
        (doc.getStringUnitWidth(textNameOfBank) * 9) /
        doc.internal.scaleFactor,
        (currentFontHeightLocation += 5),
        180,
        currentFontHeightLocation
      );

      doc.text(
        '2. Information to be verified: ',
        paddingLeft,
        (currentFontHeightLocation += 10)
      );

      doc.autoTable({
        // head: [['Type of Account', 'Account Name', 'Account Number']],
        // body: [['', '', ''], ['', '', ''], ['', '', '']],
        body: applicantDetail.InformationVerified,
        theme: 'grid',
        styles: { fontSize: 8 },
        startY: currentFontHeightLocation += 5,
        columns: [
          { header: 'Type of Account', dataKey: 'type_of_account' },
          { header: 'Account Name', dataKey: 'account_name' },
          { header: 'Account Number', dataKey: 'account_number' }
        ]
        // margin: {top: currentFontHeightLocation += 5}
      });

      currentFontHeightLocation += 32;

      doc.line(10, currentFontHeightLocation, 200, currentFontHeightLocation);
      doc.line(
        10,
        (currentFontHeightLocation += 1),
        200,
        currentFontHeightLocation
      );

      doc.setFontSize(12);
      doc.text(
        'TO VERIFYING BANK: Please furnish the information requested below.',
        paddingLeft,
        (currentFontHeightLocation += 10)
      );

      doc.setFontSize(9);
      doc.text(
        '3. Classification of Account: ',
        paddingLeft,
        (currentFontHeightLocation += 10)
      );

      doc.setFillColor(0);
      if(DATA.account_classification == 'individual'){
        doc.rect(paddingLeft + 45, currentFontHeightLocation - 3, 3, 3,'F');
      } else {
        doc.rect(paddingLeft + 45, currentFontHeightLocation - 3, 3, 3);
      }
       // empty square
      doc.text('Individual', paddingLeft + 50, currentFontHeightLocation);

      if(DATA.account_classification == 'corporation'){
        doc.rect(paddingLeft + 95, currentFontHeightLocation - 3, 3, 3,'F');
      } else {
        doc.rect(paddingLeft + 95, currentFontHeightLocation - 3, 3, 3);
      }
      doc.text('Corporation', paddingLeft + 100, currentFontHeightLocation);

      if(DATA.account_classification == 'partnership'){
        doc.rect(paddingLeft + 145, currentFontHeightLocation - 3, 3, 3,'F');
      } else {
        doc.rect(paddingLeft + 145, currentFontHeightLocation - 3, 3, 3); 
      }
      doc.text('Partnership', paddingLeft + 150, currentFontHeightLocation);

      currentFontHeightLocation += 5;

      if(DATA.account_classification == 'limited_partnership'){
        doc.rect(paddingLeft + 45, currentFontHeightLocation - 3, 3, 3,'F');
      } else {
        doc.rect(paddingLeft + 45, currentFontHeightLocation - 3, 3, 3);
      }
      
      doc.text(
        'Limited Partnership',
        paddingLeft + 50,
        currentFontHeightLocation
      );

      if(DATA.account_classification == 'limited_liability_company'){
        doc.rect(paddingLeft + 95, currentFontHeightLocation - 3, 3, 3,'F');
      } else {
        doc.rect(paddingLeft + 95, currentFontHeightLocation - 3, 3, 3);
      }
      doc.text(
        'Limited liability Company',
        paddingLeft + 100,
        currentFontHeightLocation
      );

      doc.text(
        '4. Deposit accounts of applicants: ',
        paddingLeft,
        (currentFontHeightLocation += 10)
      );

      doc.autoTable({
        // head: [
        //   [
        //     '*Account Name',
        //     'Type',
        //     '*Account Number',
        //     '*Current Balance',
        //     '*6 Month Average',
        //     '*Date Opened'
        //   ]
        // ],
        body: applicantDetail.DepositAccountsofApplicant,
        columns: [
          { header: '*Account Name', dataKey: 'account_name' },
          { header: 'Type', dataKey: 'account_type' },
          { header: '*Account Number', dataKey: 'account_number' },
          { header: '*Current Balance', dataKey: 'account_balance' },
          { header: '*6 Month Average', dataKey: 'average' },
          { header: '*Date Opened', dataKey: 'date_opened' },
        ],
        theme: 'grid',
        styles: { fontSize: 8 },
        startY: currentFontHeightLocation += 5,
        fillColor: null
      });

      currentFontHeightLocation += 5;

      doc.text(
        '5. Verification of Lines of credit: ',
        paddingLeft,
        (currentFontHeightLocation += 32)
      );

      doc.autoTable({
        // head: [
        //   [
        //     'Line of Credit Account #',
        //     'Type of Credit Line',
        //     'Date Opened',
        //     'Approved Amount',
        //     'Current Balance',
        //     'Payments Required',
        //     'Secured by'
        //   ]
        // ],
        // body: [['', '', '', '', '', '', ''], ['', '', '', '', '', '', '']],
        body: applicantDetail.VerificationofLinesofcredit,
        columns: [
          { header: 'Line of Credit Account #', dataKey: 'line_of_credit_account' },
          { header: 'Type of Credit Line', dataKey: 'type_of_credit_line' },
          { header: 'Date Opened', dataKey: 'date_opened' },
          { header: 'Approved Amount', dataKey: 'approved_amount' },
          { header: 'Current Balance', dataKey: 'current_balance' },
          { header: 'Payments Required', dataKey: 'payments_required' },
          { header: 'Secured by', dataKey: 'secured_by' },
        ],
        theme: 'grid',
        styles: { fontSize: 8 },
        startY: currentFontHeightLocation += 5,
        fillColor: null
      });

      doc.text(
        '6. Additional information that me be of assistance in determination of credit worthiness:',
        paddingLeft,
        (currentFontHeightLocation += 32)
      );

      currentFontHeightLocation += 5;

      // Data
      doc.text(
        applicantDetail.AdditionalInfo,
        paddingLeft,
        (currentFontHeightLocation - 1)
      );


      doc.line(10, currentFontHeightLocation, 200, currentFontHeightLocation);
      doc.line(
        10,
        (currentFontHeightLocation += 5),
        200,
        currentFontHeightLocation
      );

      doc.text(
        '7. Signatures of account holder(s):',
        paddingLeft,
        (currentFontHeightLocation += 10)
      );
      doc.line(
        paddingLeft + 10,
        currentFontHeightLocation + 20,
        80,
        currentFontHeightLocation + 20
      );

      doc.text(
        '8. Name and Title of Bank Representative:',
        110,
        currentFontHeightLocation
      );
      currentFontHeightLocation += 5;

      // Data
      doc.text(
        applicantDetail.BankRepresentative,
        120,
        currentFontHeightLocation - 1
      );

      doc.line(120, currentFontHeightLocation, 180, currentFontHeightLocation);
      doc.line(
        120,
        (currentFontHeightLocation += 5),
        180,
        currentFontHeightLocation
      );
      doc.text('9. Date:', 110, (currentFontHeightLocation += 5));

      // Data
      doc.text(applicantDetail.Date, 125, (currentFontHeightLocation - 1));

      doc.line(125, currentFontHeightLocation, 180, currentFontHeightLocation);

      //doc.save('df.pdf');

      // NOTE: BLOB to File conversion is must & filename.extension is compulsory
      // const file = new File([doc.output('blob')], 'bank-verification-form.pdf', {type: 'application/pdf', lastModified: Date.now()});
      //console.log(file);
      const file = new File(doc.save(), 'bank-verification-form.pdf', { type: 'application/pdf', lastModified: Date.now() });

      const formData = new FormData(); // To carry on your data
      formData.append('file', file);
      formData.append('data', JSON.stringify(thisConst.signature));
      thisConst.uploadDocument(formData); // Upload

    };
    img.crossOrigin = '';
    img.src = '../../assets/images/nevida_state_pdf_logo.PNG';

  }

  uploadDocument(formData: any) {
    this.ser.uploadPdfOnPandaDoc(formData).subscribe(x => {
      console.log(x);
    });
  }

}