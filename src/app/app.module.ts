import { UsersService } from './admin/users/services/users.service';
import { environment } from './../environments/environment.prod';
import { UtilService } from './shared/service/util.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AclService } from './shared/service/acl.service';
//Outlook Code
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';

import { LoaderService } from './services/loader.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataInterceptor } from '../shared/data-interceptor';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { EventEmitterService } from './services/event-emitter.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({ closeButton: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(options),
    MsalModule.forRoot({
      clientID: OAuthSettings.appId
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true,
    },
    AclService,
    UtilService,
    UsersService,
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
