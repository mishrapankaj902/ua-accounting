import { HttpClientModule } from '@angular/common/http';
import { BusinessTaxesIntakeService } from './business-taxes-intake/business-taxes-intake.service';
import { CSSRequestService } from './css-request/css-request.service';
import { FinancialStatementIntakeService } from './financial-statement-intake/financial-statement-intake.service';
import { MailWaiverService } from './mail-waiver/mail-waiver.service';
import { PaymentPlanAgreementService } from './payment-plan-agreement/payment-plan-agreement.service';
import { PersonalTaxesIntakeService } from './personal-taxes-intake/personal-taxes-intake.service';
import { BookKeepingService } from './book-keeping/book-keeping.service';
import { TaxPlanningIntakeService } from './tax-planning-intake/tax-planning-intake.service';
import { SecretaryOfStatePacketService } from './secretary-of-state-packet/secretary-of-state-packet.service';
import { BankVerificationService } from './bank-verification/bank-verification.service';
import { BasicInfoService } from './basic-info/basic-info.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankVerificationComponent } from './bank-verification/bank-verification.component';
import { BookKeepingComponent } from './book-keeping/book-keeping.component';
import { CssRequestComponent } from './css-request/css-request.component';
import { FinancialStatementIntakeComponent } from './financial-statement-intake/financial-statement-intake.component';
import { BusinessTaxesIntakeComponent } from './business-taxes-intake/business-taxes-intake.component';
import { PersonalTaxesIntakeComponent } from './personal-taxes-intake/personal-taxes-intake.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { MailWaiverComponent } from './mail-waiver/mail-waiver.component';
import { PaymentPlanAgreementComponent } from './payment-plan-agreement/payment-plan-agreement.component';
import { CreditCardPaymentAuthorizationComponent } from './credit-card-payment-authorization/credit-card-payment-authorization.component';
import { ReceiptTemplateComponent } from './receipt-template/receipt-template.component';
import { LetterHeadTemplateComponent } from './letter-head-template/letter-head-template.component';
import { TaxPlanningIntakeComponent } from './tax-planning-intake/tax-planning-intake.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormService } from './service/form.service';
import { SecretaryOfStatePacketComponent } from './secretary-of-state-packet/secretary-of-state-packet.component';
import { ReceiptTemplateService } from './receipt-template/receipt-template.service';
import { LetterHeadTemplateService } from './letter-head-template/letter-head-template.service';
import { MatButtonModule, MatRadioModule } from '@angular/material';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { SchFormComponent } from './sch-form/sch-form.component';
import { SchFormService } from './sch-form/sch-form.service';
import { BookKeepingFormComponent } from './book-keeping-form/book-keeping-form.component';
import { BookKeepingFormService } from './book-keeping-form/book-keeping-form.service';
import { FinancialFormComponent } from './financial-form/financial-form.component';
import { RevisedBusinessFormComponent } from './revised-business-form/revised-business-form.component';
import { RevisedBusinessFormService } from './revised-business-form/revised-business-form.service';

import { FinancialFormService } from './financial-form/financial-form.service';
import { RevisedClientNotesComponent } from './revised-client-notes/revised-client-notes.component';
import { RevisedClientNotesService } from './revised-client-notes/revised-client-notes.service';


@NgModule({
  declarations: [
    BankVerificationComponent,
    BookKeepingComponent,
    CssRequestComponent,
    FinancialStatementIntakeComponent,
    BusinessTaxesIntakeComponent,
    BasicInfoComponent,
    PersonalTaxesIntakeComponent,
    MailWaiverComponent,
    PaymentPlanAgreementComponent,
    CreditCardPaymentAuthorizationComponent,
    ReceiptTemplateComponent,
    LetterHeadTemplateComponent,
    TaxPlanningIntakeComponent,
    SecretaryOfStatePacketComponent,
    SchFormComponent,
    BookKeepingFormComponent,
    FinancialFormComponent,
    RevisedBusinessFormComponent,
    RevisedClientNotesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskModule.forChild(options),
    MatButtonModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule
  ],
  exports: [
    BankVerificationComponent,
    BookKeepingComponent,
    CssRequestComponent,
    FinancialStatementIntakeComponent,
    BusinessTaxesIntakeComponent,
    PersonalTaxesIntakeComponent,
    MailWaiverComponent,
    PaymentPlanAgreementComponent,
    CreditCardPaymentAuthorizationComponent,
    ReceiptTemplateComponent,
    LetterHeadTemplateComponent,
    BasicInfoComponent,
    TaxPlanningIntakeComponent,
    SecretaryOfStatePacketComponent,
    MatSelectModule,
    SchFormComponent,
    BookKeepingFormComponent,
    FinancialFormComponent,
    RevisedBusinessFormComponent,
    RevisedClientNotesComponent
  ],
  entryComponents: [
  ]
})
export class AppFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppFormsModule,
      providers: [
        FormService,
        BasicInfoService,
        BankVerificationService,
        SecretaryOfStatePacketService,
        TaxPlanningIntakeService,
        ReceiptTemplateService,
        BookKeepingService,
        PersonalTaxesIntakeService,
        PaymentPlanAgreementService,
        MailWaiverService,
        FinancialStatementIntakeService,
        CSSRequestService,
        BusinessTaxesIntakeService,
        LetterHeadTemplateService,
        SchFormService,
        BookKeepingFormService,
        FinancialFormService,
        RevisedBusinessFormService,
        RevisedClientNotesService,
        RevisedClientNotesService
      ]
    };
  }
}