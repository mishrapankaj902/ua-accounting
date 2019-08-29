import { Component, OnInit } from '@angular/core';
import { StaticUtilities } from '../../../shared/static-utilities';
import { EventEmitterService } from '../../services/event-emitter.service';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-taxes-letter-pdf',
  templateUrl: './taxes-letter-pdf.component.html',
  styleUrls: ['./taxes-letter-pdf.component.css']
})
export class TaxesLetterPdfComponent implements OnInit {

  taxesLetterData = {
    Date: '12 June 2019',
    AuthorName: 'John Jones',
    Address: 'ABC Investment,LLC Las Vegas, NV',
    ServiceCharge: 500,
    FederalTaxReturn: 1000,
    PrintName: 'John Jones',
    Title: 'Tax returned',
    PrintDate: '12 June 2019'
  };

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeFirstComponentFunction.subscribe(() => {
        this.onExportPdf();
      });
    }
  }

  onExportPdf() {
    console.log('export clicked');
    const doc = new jsPDF();
    const img = new Image();

    const paddingLeft = 20;
    const thisConst = this;

    img.onload = function () {
      doc.addImage(this, 10, 5, 100, 30);

      let currentFontLocation = 40;
      const textSplitLimit = 170;
      const pageHeight = doc.internal.pageSize.height;

      doc.setFontSize(11);
      doc.text(
        thisConst.taxesLetterData.Date,
        paddingLeft,
        currentFontLocation
      );

      doc.text(
        thisConst.taxesLetterData.AuthorName,
        paddingLeft,
        currentFontLocation += 5
      );

      doc.text(
        thisConst.taxesLetterData.Address,
        paddingLeft,
        currentFontLocation += 5
      );

      let fontText = 'We are pleased to confirm our acceptance and understanding of the services we are to provide for the company.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'You have requested that we perform the following services:';
      doc.text(
        fontText,
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = '1. Bookkeeping services (Year ended 12/31/17) $' + thisConst.taxesLetterData.ServiceCharge + ' Monthly';
      doc.text(
        fontText,
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'a. Includes preparation of the bookkeeping reports (financial statements) which comprise the period balance sheets, and related statements of income. These financial statements will not include statements of cash flows and related notes to the financial statements.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 5
        // {maxWidth: textSplitLimit, align: 'justify'}
      );

      fontText = '2. Prepare federal tax returns (2017) $' + thisConst.taxesLetterData.FederalTaxReturn + ' Annual';

      doc.text(
        fontText,
        paddingLeft,
        currentFontLocation += 18
      );

      fontText = 'Payment for services will be charged to the card on file with our firm, monthly, upon presentation.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'The supervising engagement partner is Sheila Ildefonzo, CPA. The timeline to complete the taxes will start upon receipt of all or substantially of the information needed to file the tax return(s).';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'Delays caused by your office providing inaccurate information or failure to provide information may result in specific periods to require more work, therefore additional fees may apply.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 18
      );

      fontText = 'Our Responsibilities';

      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 15
      );

      fontText = 'The objective of our engagement is to prepare financial statements for the use of management in accordance with the tax basis of accounting principles or the cash basis of accounting based on information provided by you. We will conduct our engagement in accordance with Statements on Standards for Accounting and Review Services (SSARS) promulgated by the Accounting and Review Services Committee of the AICPA and comply with the AICPA’s Code of Professional Conduct, including the ethical principles of integrity, objectivity, professional competence, and due care.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'We are not required to, and will not, verify the accuracy or completeness of the information you will provide to us for the engagement or otherwise gather evidence for the purpose of expressing an opinion or a conclusion. Accordingly, we will not express an opinion, a conclusion, nor provide any assurance on the financial statements.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 35
      );

      fontText = 'Our engagement cannot be relied upon to identify or disclose any financial statement misstatements, including those caused by fraud or error, or to identify or disclose any wrong doing within the Company or noncompliance with laws and regulations.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'Management Responsibilities';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'The engagement to be performed is conducted on the basis that management acknowledges and understands that our role is the preparation of the financial statements in accordance with the tax basis or cash basis of accounting. Management has the following overall responsibilities that are fundamental to our undertaking the engagement to prepare your financial statements in accordance with SSARS:';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = '1) The selection of the tax basis or cash basis of accounting as the financial reporting framework to be applied in the preparation of the financial statements.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 25
      );

      doc.addPage();

      fontText = '2) The design, implementation, and maintenance of internal control relevant to the preparation and fair presentation of the financial statements that are free from material misstatement, whether due to fraud or error.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation = 15
      );


      fontText = '3) The prevention and detection of fraud.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 15
      );

      fontText = '4) To ensure that the Company complies with the laws and regulations applicable to its activities';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = '5) The accuracy and completeness of the records, documents, explanations, and other information, including significant judgments, you provide to us for the engagement to prepare financial statements.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = '6) To provide us with —';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 15
      );

      fontText = 'a) Documentation, and other related information that is relevant to the preparation and presentation of the financial statements';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit - 10),
        paddingLeft + 10,
        currentFontLocation += 10
      );

      fontText = 'b) Additional information that may be requested for the purpose of the preparation of the financial statements, and';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit - 10),
        paddingLeft + 10,
        currentFontLocation += 10
      );

      fontText = 'c) Unrestricted access to persons within the company with whom we determine it necessary to communicate.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit - 10),
        paddingLeft + 10,
        currentFontLocation += 10
      );


      fontText = 'The financial statements will not be accompanied by a report. However, you agree that the financial statements will clearly indicate that no assurance is provided on them.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 15
      );


      fontText = 'Tax Returns';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 15
      );

      fontText = 'You are responsible for the safeguarding of assets, the proper recording of transactions in the books of accounts, the substantial accuracy of the financial records, and the full and accurate disclosure of all relevant facts affecting the return(s) to us. You also have final responsibility for the tax return and, therefore, the appropriate officials should review the return carefully before an authorized officer signs and files it.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'We may provide you with a questionnaire or other document requesting specific information. Completing those forms will assist us in making sure you are well served for a reasonable fee. You represent that the information you are supplying to us is accurate and complete to the best of your knowledge and that you have disclosed to us all relevant facts affecting the returns. We will not verify the information you give us; however, we may ask for additional clarification of some information';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 25
      );

      fontText = 'If, during our work, we discover information that affects prior-year tax returns, we will make you aware of the facts. However, we cannot be responsible for identifying all items that may affect prior-year returns. If you become aware of such information during the year, please contact us to discuss the best resolution of the issue. We will be happy to prepare appropriate amended returns as a separate engagement.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 30
      );

      fontText = 'Our work in connection with the preparation of the tax return(s) does not include any procedures designed to discover defalcations or other irregularities, should any exist. The returns will be prepared solely from information provided to us without verification by us';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 25
      );

      fontText = 'By executing this engagement letter, you consent to using your tax return information to send to you by any medium: firm newsletters, surveys, press releases, information concerning firm seminars and non tax related services, and any other communication sent to some or all of the firm’s clients. This consent shall be valid for five years. The disclosure will include the disclosure of the entire federal income tax return, and you acknowledge, by signing this engagement letter, that you have the right to consent to a disclosure of less than the entire tax return, but have decided, without coercion, that you consent to the disclosure of the entire tax return. This consent is not conditioned on our providing services to you. In accordance with federal law, in no case will we disclose your tax return information to any location outside the United States, to another tax return preparer outside of our firm for purposes of a second opinion, or to any other third party for any purpose other than to prepare your return without first receiving your consent.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      doc.addPage();

      fontText = 'The Internal Revenue Code and regulations impose preparation and disclosure standards with noncompliance penalties on both the preparer of a tax return and on the taxpayer. To avoid exposure to these penalties, it may be necessary in some cases to make certain disclosures to you and/or in the tax return concerning positions taken on the return that do not meet these standards. Accordingly, we will advise you if we identify such a situation and we will discuss those tax positions that may increase the risk of exposure to penalties and any recommended disclosures with you before completing the preparation of the return. If we conclude that we are obligated to disclose a position and you refuse to permit the disclosure, we reserve the right to withdraw from the engagement. Likewise, where we disagree about the obligation to disclose a position, you also have a right to choose another professional to prepare your return. In either event, you agree to compensate us for our services to the date of withdrawal. Our engagement with you will terminate upon our withdrawal.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation = 15
      );

      fontText = 'The IRS permits you to authorize us to discuss, on a limited basis, aspects of your return for one year after the return’s due date. Your consent to such a discussion is evidenced by checking a box on the return. Unless you tell us otherwise, we will check that box authorizing the IRS to discuss your return with us.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 55
      );

      fontText = 'It is our policy to keep records related to this engagement for seven years. However, we do not keep any of your original records, so we will return those to you upon the completion of the engagement. When records are returned to you, it is your responsibility to retain and protect the records for possible future use, including potential examination by governmental or regulatory agencies. By signing this engagement letter, you agree that upon the expiration of the seven year period, we are free to destroy our records related to this engagement.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'Certain communications involving tax advice are privileged and not subject to disclosure to the IRS. By disclosing the contents of those communications to anyone, or by turning over information about those communications to the government, you, your employees, or agents may be waiving this privilege. To protect this right to privileged communication, please consult with us or your attorney prior to disclosing any information about our tax advice. Should you decide that it is appropriate for us to disclose any potentially privileged communication, you agree to provide us with written, advance authority to make that disclosure.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 30
      );

      fontText = 'Should we receive any request for the disclosure of privileged information from any third party, including a subpoena or IRS summons, we will notify you. In the event you direct us not to make the disclosure, you agree to hold us harmless from any expenses incurred in defending the privilege, including, by way of illustration only, our attorney’s fees, court costs, outside adviser’s costs, or penalties or fines imposed as a result of your asserting the privilege or your direction to us to assert the privilege.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 35
      );

      fontText = 'The return(s) may be selected for review by the taxing authorities. In the event of an audit, you may be requested to produce documents, records, or other evidence to substantiate the items of income and deduction shown on a tax return. Any proposed adjustments by the examining agent are subject to certain rights of appeal. In the event of a tax examination, we will be available, upon request, to represent you. However, such additional services are not included in the fees for the preparation of the tax return(s).';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 30
      );

      fontText = 'Other Relevant Information';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 30
      );

      fontText = 'You agree to hold us harmless and to release, indemnify, and defend us from any liability or costs, including attorney\'s fees, resulting from management\'s knowing misrepresentations to us.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'We may from time to time, and depending on the circumstances, use certain third-party service providers in serving your account. We may share confidential information about you with these service providers, but remain committed to maintaining the confidentiality and security of your information. Accordingly, we maintain internal policies, procedures, and safeguards to protect the confidentiality of your personal information. In addition, we will secure confidentiality agreements with all service providers to maintain the confidentiality of your information and we will take reasonable precautions to determine that they have appropriate procedures in place to prevent the unauthorized release of your confidential information to others. In the event that we are unable to secure an appropriate confidentiality agreement, you will be asked to provide your consent prior to the sharing of your confidential information with the third-party service provider. Furthermore, we will remain responsible for the work provided by any such third-party service providers.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 15
      );

      doc.addPage();

      fontText = 'In the event that we are or may be obligated to pay any cost, settlement, judgment, fine, penalty, or similar award or sanction as a result of a claim, investigation, or other proceeding instituted by any third party, then to the extent that such obligation is or may be a direct or indirect result of your intentional or knowing misrepresentation or provision to us of inaccurate or incomplete information in connection with this engagement, and not any failure on our part to comply with professional standards, you agree to indemnify us, defend us, and hold us harmless as against such obligations.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation = 15
      );

      fontText = 'In accordance with our firm policies, work may be suspended if your account becomes 15 days or more overdue and will not be resumed until your account is paid in full. If we elect to terminate our services for nonpayment, our engagement will be deemed to have been completed upon written notification of termination, even if we have not completed our financial statement preparation. You will be obligated to compensate us for all time expended and to reimburse us for all out-of-pocket expenditures through the date of termination.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation = 45
      );

      fontText = 'In recognition of the relative risks and benefits of this agreement to you and our accounting firm, we have discussed and have agreed on the fair allocation of risk between us. As such, you agree, to the fullest extent permitted by law, to limit the liability of our accounting firm to you for any and all claims, losses, costs, damages of any nature whatsoever or claims expenses from any cause or causes, including attorney’s fees and all costs of litigation, so that the total aggregate liability of our accounting firm to you shall not exceed our total fee for services rendered under this agreement. It is mutually intended and agreed that this limitation apply to any and all liability or cause of action against our accounting firm, however alleged or arising, unless otherwise prohibited by law.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 30
      );

      fontText = 'Any litigation arising out of this engagement, except actions by us to enforce payment of our professional invoices, must be asserted within one year from the date any such cause of action accrues, or within three years from the completion of the engagement, whichever is earlier, notwithstanding any statutory provision to the contrary. ';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 40
      );

      fontText = 'Unique Accounting, LLC is a Nevada limited liability company that has elected to be organized under and governed by the Nevada Revised Statutes Title 7. Our agreement will be interpreted under the laws of the State of Nevada. Venue for any cause of action arising out of or relating to this agreement shall lie in the Eighth Judicial District Court, County of Clark, Nevada.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'CIRCULAR 230 DISCLOSURE: Pursuant to Regulations Governing Practice before the Internal Revenue Service, any tax advice contained herein is not intended or written to be used and cannot be used by a taxpayer for the purpose of avoiding tax penalties that may be imposed on the taxpayer.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'We appreciate the opportunity to be of service to you and believe this letter accurately summarizes the significant terms of our engagement. If you have any questions, please let us know. If you agree with the terms of our engagement as described in this letter, please sign the enclosed copy and return it to us.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'Please don’t hesitate to contact our office with any questions.';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'Unique Accounting, LLC';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );

      fontText = 'Sheila Ildefonzo, CPA';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 20
      );

      fontText = 'Partner';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 3
      );

      fontText = 'ACCEPTED AND AGREED TO BY:';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 10
      );
      doc.line(
        paddingLeft,
        (currentFontLocation += 2),
        doc.getStringUnitWidth(fontText) * 10 - 75,
        currentFontLocation
      );



      doc.line(
        paddingLeft,
        (currentFontLocation += 15),
        60,
        currentFontLocation
      );
      doc.text(
        thisConst.taxesLetterData.PrintName,
        paddingLeft,
        currentFontLocation - 3
      );
      fontText = 'Print Name';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 3
      );


      doc.line(paddingLeft + 80, currentFontLocation - 3, paddingLeft + 120, currentFontLocation - 3);
      doc.text(
        thisConst.taxesLetterData.Title,
        paddingLeft + 80,
        currentFontLocation - 6
      );
      fontText = 'Title';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft + 80,
        currentFontLocation
      );



      doc.line(
        paddingLeft,
        (currentFontLocation += 15),
        60,
        currentFontLocation
      );
      fontText = 'Signature';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft,
        currentFontLocation += 4
      );



      doc.line(paddingLeft + 80, currentFontLocation - 3, paddingLeft + 120, currentFontLocation - 3);
      doc.text(
        thisConst.taxesLetterData.PrintDate,
        paddingLeft + 80,
        currentFontLocation - 6
      );
      fontText = 'Date';
      doc.text(
        doc.splitTextToSize(fontText, textSplitLimit),
        paddingLeft + 80,
        currentFontLocation
      );



      doc.save('Bookkeeping-taxes-letter.pdf');
    };
    img.crossOrigin = '';
    img.src = '../../assets/images/unique_accouting_logo_pdf.PNG';

  }

}
