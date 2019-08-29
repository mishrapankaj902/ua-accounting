import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocusignComponent } from './docusign/docusign.component';
import { Routes, RouterModule } from '@angular/router';
import { DocusignService } from '../../services/docusign.service';


const routes: Routes = [
  { path: '', component: DocusignComponent },
  { path: 'docusign', component: DocusignComponent },
];

@NgModule({
  declarations: [
    DocusignComponent
  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    DocusignService
  ]
})
export class CallbackModule { }
