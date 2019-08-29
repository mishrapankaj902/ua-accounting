import { AppFormsModule } from './../app-forms/app-forms.module';
import { SharedModule } from './../../shared/shared.module';
import { routing } from './deal.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from './../../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealComponent } from './deal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ViewDealComponent } from './view-deal/view-deal.component';
import { EditDealComponent } from './edit-deal/edit-deal.component';

@NgModule({
	declarations: [
		DealComponent,
		ViewDealComponent,
		EditDealComponent,
	],
	imports: [
		CommonModule,
		routing,
		LayoutModule,
		NgbModule,
		SharedModule,
		AppFormsModule,
		DragDropModule
	]
})
export class DealModule { }
