import { AngularFireAuthModule } from '@angular/fire/auth';
import { AclService } from './../../shared/service/acl.service';
import { DataInterceptor } from './../../../shared/data-interceptor';
import { LoaderService } from './../../services/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { UsersService } from './services/users.service';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'menu', component: ListMenuComponent }
];
@NgModule({
  declarations: [
    ListUsersComponent,
    ListMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true,
    },
    AclService,
    UsersService
  ]
})
export class UsersModule { }
