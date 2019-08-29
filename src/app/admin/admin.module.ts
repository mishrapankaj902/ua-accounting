import { AppFormsModule } from './app-forms/app-forms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { routing } from './admin.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { MatMenuModule } from '@angular/material/menu';
import { CalendarComponent } from './calendar/calendar.component';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { MatCheckboxModule } from '@angular/material';
import { ViewDealComponent } from './deal/view-deal/view-deal.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientChatsComponent } from './client-chats/client-chats.component';
import { ClientNotesComponent } from './client-notes/client-notes.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectTimelineComponent } from './project-timeline/project-timeline.component';
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { ClientTasksComponent } from './client-tasks/client-tasks.component';
import { ClientInvoiceComponent } from './client-invoice/client-invoice.component';
import { TaxesLetterPdfComponent } from './taxes-letter-pdf/taxes-letter-pdf.component';
import { SecretaryOfStatePdfService } from './pdf-service/secretary-of-state-pdf.service';
import { BookkeepingTaxesPdfService } from './pdf-service/bookkeeping-taxes-pdf.service';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    routing,
    LayoutModule,
    NgbModule,
    RouterModule,
    AppFormsModule,
    MatMenuModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    SharedModule,
    CKEditorModule
  ],
  declarations: [
    AdminComponent,
    IndexComponent,
    CalendarComponent,
    ViewDealComponent,
    ClientDashboardComponent,
    ClientChatsComponent,
    ClientNotesComponent,
    ProjectTimelineComponent,
    PastProjectsComponent,
    ClientTasksComponent,
    ClientInvoiceComponent,
    TaxesLetterPdfComponent,
    ClientDocumentsComponent
    // EditDealComponent
  ],
  exports: [
    ViewDealComponent
    // 	EditDealComponent
  ],
  entryComponents: [
    ViewDealComponent
    // EditDealComponent
  ],
  providers: [SecretaryOfStatePdfService, BookkeepingTaxesPdfService]
})
export class AdminModule {}
