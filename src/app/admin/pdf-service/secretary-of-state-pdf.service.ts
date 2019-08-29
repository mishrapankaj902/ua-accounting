import { Injectable } from '@angular/core';
import { StaticUtilities } from '../../../shared/static-utilities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Injectable({
  providedIn: 'root'
})
export class SecretaryOfStatePdfService {
  SOSData = {
    CompanyName: "Microsoft Corporation",
    Phone: '7696357032',
    companyAddress: 'Park Estate, Cloud End',
    Email: 'test.sdd7@gmail.com',
    officersAddress: "Test Officers Address",
    responsibleParty: "Test Responsible Party",
    bussinessState: "Test business State",
    socialSecurityNumber: "",
    dob: "",
    highestEmployee: "",
    firstWageDate: "",
    principalBussinessActivity: "",
    shareholder_name: "",
    shareholder_owner_ship: "",
    date: "",
    mailingAddress: "",

  };

  constructor(private http: HttpClient) { }

  postPDF(data: any): Observable<any> {
    return this.http.post<any>('http://codebites.in/UA/services/test.php', data);
  }

  onExportPdf(formData) {
    return new Promise((resolve, reject) => {
      //console.log("All Form Data");console.log(formData);return false;
      this.SOSData.CompanyName = (formData.company_name) ? formData.company_name : "";
      this.SOSData.Phone = (formData.phone_number) ? formData.phone_number : "";
      this.SOSData.companyAddress = (formData.company_address) ? formData.company_address : "";
      this.SOSData.Email = (formData.email_address) ? formData.email_address : "";
      this.SOSData.officersAddress = (formData.officers_address) ? formData.officers_address : "";
      this.SOSData.responsibleParty = (formData.EIN.responsible_party) ? formData.EIN.responsible_party : "";
      this.SOSData.bussinessState = (formData.EIN.bussiness_state) ? formData.EIN.bussiness_state : "";
      this.SOSData.socialSecurityNumber = (formData.EIN.social_security_number) ? formData.EIN.social_security_number : "";
      this.SOSData.dob = (formData.EIN.dob) ? formData.EIN.dob : "";
      this.SOSData.highestEmployee = (formData.EIN.highest_employee) ? formData.EIN.highest_employee : "";
      this.SOSData.firstWageDate = (formData.EIN.first_wage_date) ? formData.EIN.first_wage_date : "";
      this.SOSData.principalBussinessActivity = (formData.EIN.principal_bussiness_activity) ? formData.EIN.principal_bussiness_activity : "";
      this.SOSData.shareholder_name = (formData.EIN.shareholder_name) ? formData.EIN.shareholder_name : "";
      this.SOSData.shareholder_owner_ship = (formData.EIN.shareholder_owner_ship) ? formData.EIN.shareholder_owner_ship : "";
      this.SOSData.date = (formData.agreement.date) ? formData.agreement.date : "";
      this.SOSData.mailingAddress = (formData.EIN.mailing_address) ? formData.EIN.mailing_address : "";
      const doc = new jsPDF();
      const img = new Image();

      const paddingLeft = 20;
      const textSplitLimit = 170;
      const pdfData = this.SOSData;
      let constantText = '';

      img.onload = function () {
        // doc.addImage(this, 10, 5, 100, 30);

        // let currentFontLocation = 40;
        // const textSplitLimit = 170;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;

        let heightLeft = 0;
        let position = 0;

        doc.addImage(this, 10, 5, 120, 25);
        position += 40;
        heightLeft -= pageHeight;

        doc.setFontType('bold');
        doc.setFontSize(11);
        doc.text('SECRETARY OF STATE', paddingLeft, position);

        doc.setFontType('normal');
        doc.text('Company Name: ', paddingLeft, (position += 7));
        doc.line(paddingLeft + 30, position + 1, paddingLeft + 90, position + 1);
        doc.text(
          pdfData.CompanyName,
          paddingLeft + 30,
          position
        );

        doc.text('Phone: ', paddingLeft + 100, position);
        doc.line(
          paddingLeft + 115,
          position + 1,
          paddingLeft + 150,
          position + 1
        );
        doc.text(
          "'" + pdfData.Phone + "'",
          paddingLeft + 115,
          position
        );

        // check box
        if (formData.company_type == "Limited Liability Company") {
          doc.rect(paddingLeft, (position += 7), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 7), 4, 4);
        }
        doc.text('Limited Liability Company', paddingLeft + 5, position + 3);

        if (formData.company_type == "S Corporation") {
          doc.rect(paddingLeft, (position += 7), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 7), 4, 4);
        }
        doc.text('S Corporation', paddingLeft + 7, position + 3);

        if (formData.company_type == "Corporation") {
          doc.rect(paddingLeft + 120, position, 4, 4, 'F');
        } else {
          doc.rect(paddingLeft + 120, position, 4, 4);
        }
        doc.text('Corporation', paddingLeft + 125, position + 3);

        doc.text('Company Address: ', paddingLeft, (position += 12));
        doc.line(
          paddingLeft + 35,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.companyAddress,
          paddingLeft + 35,
          position
        );

        doc.text('Email Address: ', paddingLeft, (position += 12));
        doc.line(
          paddingLeft + 30,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.Email,
          paddingLeft + 30,
          position
        );

        doc.text('Officers/Title/Address: ', paddingLeft, (position += 12));
        doc.line(paddingLeft + 40, position + 1, pageWidth - paddingLeft, position + 1);
        doc.text(
          pdfData.officersAddress,
          paddingLeft + 40,
          position
        );

        // doc.text('Officers/Title/Address: ', paddingLeft, (position += 12));
        // doc.line(paddingLeft + 40, position + 1, pageWidth - paddingLeft, position + 1);
        // doc.text(
        //   thisConst.secretaryOfStateData.CompanyName,
        //   paddingLeft + 40,
        //   position
        // );

        constantText =
          'I authorize Unique Accounting to charge the $425 LLC state fees and $500 professional fees to the credit card provided.';
        if (formData.agreement[0] == true) {
          doc.rect(paddingLeft, (position += 10), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 10), 4, 4);
        }
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft + 5,
          position + 3
        );

        constantText = 'I authorize a$200 charge for S Corp Election.';
        if (formData.agreement[1] == true) {
          doc.rect(paddingLeft, (position += 11), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 11), 4, 4);
        }
        doc.text(constantText, paddingLeft + 5, position + 3);

        constantText =
          'I authorize Unique Accounting tocharge the $725 Corporation fees and $500 professional fees to the Credit card provided.';
        if (formData.agreement[2] == true) {
          doc.rect(paddingLeft, (position += 7), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 7), 4, 4);
        }

        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft + 5,
          position + 3
        );

        constantText =
          'Choose only one of the following renewaloptions below for companies:  (2nd year option). The first year of Registered Agent fees are included in the foundation of the company.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          (position += 14)
        );

        constantText =
          '$75 for Unique Accounting to act as the Registered Agent.';
        if (formData.agreement['fee'] == '$75') {
          doc.rect(paddingLeft, (position += 8), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 8), 4, 4);
        }

        doc.text(constantText, paddingLeft + 5, position + 3);

        constantText =
          '$150 (plus state fees) for the renewal of the NV state Business License & updating Annual List of Managers/Members. Unique Accounting acts as Registered Agent.';
        if (formData.agreement['fee'] == '$150') {
          doc.rect(paddingLeft, (position += 8), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 8), 4, 4);
        }
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft + 5,
          position + 3
        );

        constantText =
          'Unless you notify us, before the renewal comes due, that you want to cancel or do not want to automatically renew, you understand that the renewal will automatically continue and you authorize us (without notice to you, unless required by applicable law) to collect the applicable fees using any credit card we have on record for you.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          (position += 14)
        );

        constantText =
          'I will renew my NV state business license/annual list myself and release Unique Accounting from any Future late filing liabilities.';
        if (formData.agreement[5] == true) {
          doc.rect(paddingLeft, (position += 16), 4, 4, 'F');
        } else {
          doc.rect(paddingLeft, (position += 16), 4, 4);
        }

        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft + 7,
          position + 3
        );

        doc.line(paddingLeft, pageHeight - 55, 90, pageHeight - 55);
        constantText = 'Signature';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          pageHeight - 50
        );
        doc.text(
          pdfData.date,
          paddingLeft + 90,
          pageHeight - 55,
          // paddingLeft + 150,
          // pageHeight - 55
        );

        doc.line(
          paddingLeft + 90,
          pageHeight - 55,
          paddingLeft + 150,
          pageHeight - 55
        );
        constantText = 'Date';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft + 90,
          pageHeight - 50
        );

        doc.setFontSize(8);
        constantText =
          'The information provided is for general purposes only.  You should not rely upon it as advice about specific legal problems, It does not constitute The rendering of legal advice and does not create any attorney-client relationship.  If you need legal advice, you should consult with appropriate legal counsel.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          pageHeight - 40
        );

        doc.setFontSize(11);

        constantText =
          'Phone:  (702) 2020-CPA   |   Fax:  (702)476-3215   |   info@unique-accounting.com';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 22
        );

        constantText =
          'THE FINAL PIECE OF YOUR PUZZLE | WWW.UNIQUE-ACCOUNTING.COM';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 15
        );

        // EIN Pdf
        doc.addPage();

        doc.addImage(this, 10, 5, 120, 25);
        position = 40;
        heightLeft -= pageHeight;


        doc.setFontType('bold');
        doc.text('EIN', paddingLeft, position);


        doc.setFontType('normal');
        doc.text(
          'State where the business is physically located: ',
          paddingLeft,
          (position += 10)
        );
        doc.line(
          paddingLeft + 83,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.bussinessState,
          paddingLeft + 83,
          position
        );

        doc.text(
          'Name of responsible party of theCompany: ',
          paddingLeft,
          (position += 10)
        );
        doc.line(
          paddingLeft + 77,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.responsibleParty,
          paddingLeft + 77,
          position
        );

        doc.text('Social Security Number: ', paddingLeft, (position += 10));
        doc.line(
          paddingLeft + 43,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.socialSecurityNumber,
          paddingLeft + 43,
          position
        );

        doc.text('Date of Birth: ', paddingLeft, (position += 10));
        doc.line(
          paddingLeft + 25,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.dob,
          paddingLeft + 25,
          position
        );

        constantText =
          'Mailing and physical address: (Physical address must be U.S. address, no P.O. Box)';
        doc.text(constantText, paddingLeft, (position += 10));

        position += 10;

        doc.line(paddingLeft, position, pageWidth - paddingLeft, position);

        position += 10;

        doc.line(paddingLeft, position, pageWidth - paddingLeft, position);

        doc.text(
          'Highest number of employees expected in the next 12 months: ',
          paddingLeft,
          (position += 10)
        );
        doc.line(
          paddingLeft + 115,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.highestEmployee,
          paddingLeft + 115,
          position
        );

        doc.text('First date wages were paid: ', paddingLeft, (position += 10));
        doc.line(
          paddingLeft + 48,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.firstWageDate,
          paddingLeft + 48,
          position
        );

        doc.text('Principal business activity: ', paddingLeft, (position += 10));
        doc.line(
          paddingLeft + 47,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.principalBussinessActivity,
          paddingLeft + 47,
          position
        );

        doc.text(
          'FORM 2553 (S-CORPORATION ONLY):',
          paddingLeft,
          (position += 15)
        );

        doc.text('Shareholder name/Ownership: ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 55, position + 1, paddingLeft + 115, position + 1);
        doc.text(
          pdfData.shareholder_name,
          paddingLeft + 55,
          position
        );

        doc.text('/', paddingLeft + 117, position);

        doc.line(
          paddingLeft + 119,
          position + 1,
          pageWidth - paddingLeft,
          position + 1
        );
        doc.text(
          pdfData.shareholder_owner_ship,
          paddingLeft + 119,
          position
        );

        doc.text(
          '(Effective date will be date of organization creation.)',
          paddingLeft,
          (position += 10)
        );

        constantText =
          'Please note:  Your Name must match your ID.  Unique Accounting is not responsible for any re-filing of documents due to yourproper name not being indicated.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          (position += 20)
        );

        constantText =
          'Phone:  (702) 2020-CPA   |   Fax:  (702)476-3215   |   info@unique-accounting.com';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 30
        );

        constantText = 'CREDIT CARD PAYMENT AUTHORIZATION FORM';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 22
        );

        constantText =
          'THE FINAL PIECE OF YOUR PUZZLE | WWW.UNIQUE-ACCOUNTING.COM';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 15
        );

        // 3rd Pdf
        doc.addPage();

        doc.addImage(this, 10, 5, 120, 25);
        position = 40;
        heightLeft -= pageHeight;

        constantText =
          'Sign & complete this form to authorize Unique Accounting to make annual debits to your credit card listed below.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          position
        );

        constantText =
          'By signing this form, you give us permission to debit your account for the amount indicated on or after the indicated date.  This is permission for the agreed upon charges only, in accordance with the Secretary of Statearrangement,established with Unique Accounting.  This amount will continue until further notice or the arrangement is altered.   Unique Accounting is not responsible for any late fees that may occur.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          (position += 15)
        );

        position += 25;

        doc.line(paddingLeft, position, pageWidth - paddingLeft, position);

        doc.setFontType('bold');
        doc.text(
          'Please complete the information below:',
          paddingLeft,
          (position += 10)
        );
        doc.setFontType('normal');

        doc.text('I', paddingLeft, (position += 10));
        doc.line(paddingLeft + 2, position, paddingLeft + 60, position);
        doc.text(
          'authorize Unique Accounting to charge my credit card ',
          paddingLeft + 62,
          position
        );
        doc.text('(Full Name)', paddingLeft + 22, (position += 5));

        doc.text('Account indicated below for ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 50, position, paddingLeft + 100, position);
        doc.text(' on or after', paddingLeft + 102, position);
        doc.line(paddingLeft + 125, position, pageWidth - paddingLeft, position);
        doc.text('(Amount)', paddingLeft + 65, (position += 5));
        doc.text('(Date)', paddingLeft + 138, position);

        doc.text('This payment is for ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 35, position, pageWidth - paddingLeft, position);
        doc.text(
          '(Description of goods/services)',
          paddingLeft + 70,
          (position += 5)
        );

        doc.text('Billing Address: ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 30, position, paddingLeft + 110, position);

        doc.text('Phone: ', paddingLeft + 112, position);
        doc.line(paddingLeft + 130, position, pageWidth - paddingLeft, position);

        doc.text('City, State, Zip: ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 30, position, paddingLeft + 110, position);

        doc.text(' Email: ', paddingLeft + 112, position);
        doc.line(paddingLeft + 130, position, pageWidth - paddingLeft, position);

        position += 10;
        doc.line(paddingLeft, position, pageWidth - paddingLeft, position);

        doc.text('Account Type: ', paddingLeft, (position += 10));

        doc.rect(paddingLeft + 30, position - 4, 4, 4);
        doc.text('Visa', paddingLeft + 35, position);

        doc.rect(paddingLeft + 50, position - 4, 4, 4);
        doc.text('MasterCard ', paddingLeft + 55, position);

        doc.rect(paddingLeft + 80, position - 4, 4, 4);
        doc.text('AMEX', paddingLeft + 85, position);

        doc.rect(paddingLeft + 100, position - 4, 4, 4);
        doc.text('Discover', paddingLeft + 105, position);

        doc.text('Cardholder Name: ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 35, position, pageWidth - paddingLeft, position);

        doc.text('Card Account Number: ', paddingLeft, (position += 10));
        doc.line(paddingLeft + 40, position, paddingLeft + 110, position);

        doc.text(' Exp. Email: ', paddingLeft + 112, position);
        doc.line(paddingLeft + 140, position, pageWidth - paddingLeft, position);

        doc.text(
          'CVV2 (3 digit number on back of Visa/MC, 4 digits on front of AMEX): ',
          paddingLeft,
          (position += 10)
        );
        doc.line(paddingLeft + 125, position, pageWidth - paddingLeft, position);

        constantText =
          'Unless you notify us, before the renewal comes due, that you want to cancel or do not want to automatically renew, you understand that the renewal will automatically continue and you authorize us (without notice to you, unless required by applicable law) to collect the applicable fees using any credit card we have on record for you.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          (position += 14)
        );

        constantText =
          'I authorize the above named business to charge the credit card indicated in this authorization form, according to the termsoutlined above.  This payment authorization is for the goods/services described above, for the amount indicated above.';
        doc.text(
          doc.splitTextToSize(constantText, pageWidth - paddingLeft * 2),
          paddingLeft,
          (position += 30)
        );

        constantText =
          'Phone:  (702) 2020-CPA   |   Fax:  (702)476-3215   |   info@unique-accounting.com';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 22
        );

        constantText =
          'THE FINAL PIECE OF YOUR PUZZLE | WWW.UNIQUE-ACCOUNTING.COM';
        doc.text(
          constantText,
          StaticUtilities.pdfTextCenter(doc, constantText, 11),
          pageHeight - 15
        );
        resolve(doc);
        // doc.save('SECRETARY-OF-STATE.pdf');
        //  debugger;
        // return doc.output('blob');
        //var file = new File(doc.save(), 'SOS-form.pdf', { type: 'application/pdf', lastModified: Date.now() });
        //var formData2 = new FormData(); // To carry on your data
        //formData2.append('file', file);
        // formData2.append('data', JSON.stringify(thisConst.signature));
        //return formData2;

      };
      img.crossOrigin = '';
      img.src = '../../assets/images/logo-4.png';
      // debugger;
      // return doc.output('blob');
    });
  }
}