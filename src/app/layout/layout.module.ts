import { AppFormsModule } from './../admin/app-forms/app-forms.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { NgxMaskModule } from 'ngx-mask'
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
		RouterModule,
		SharedModule,
		NgbCollapseModule,
		AppFormsModule.forRoot(),
		NgxMaskModule.forChild(),
	],
	declarations: [
		HeaderComponent,
		SidebarComponent,
		PageLoaderComponent,
		LoaderComponent,
		SidebarClientComponent
	],
	exports: [
		HeaderComponent,
		SidebarComponent,
		PageLoaderComponent,
		SidebarClientComponent,
		LoaderComponent
	]
})
export class LayoutModule { }
