import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AddDealComponent } from './../admin/deal/add-deal/add-deal.component';
import { AppFormsModule } from './../admin/app-forms/app-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDealComponent } from '../admin/deal/new-deal/new-deal.component';
import { NotificationComponentComponent } from './component/notification-component/notification-component.component';
import { MatProgressButtonsModule } from 'mat-progress-buttons'
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatCheckboxModule } from '@angular/material';
import { HasPermissionDirective } from './directive/has-permission.directive';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    NewDealComponent,
    NotificationComponentComponent,
    AddDealComponent,
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppFormsModule,
    MatProgressButtonsModule,
    NgSelectModule,
    NgxMaskModule.forChild(options),
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NewDealComponent,
    AddDealComponent,
    MatProgressButtonsModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HasPermissionDirective
  ],
  entryComponents: [
    AddDealComponent,
    NewDealComponent
  ]
})
export class SharedModule { }
