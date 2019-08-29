import { AngularFireAuth } from '@angular/fire/auth';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class DataInterceptor implements HttpInterceptor {
  token: string = '';
  constructor(
    public afAuth: AngularFireAuth
  ) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req = req.clone({
    //   headers: req.headers
    //     .set('Accept', 'application/json')
    //     .append(
    //       'Authorization',
    //       'Bearer ' + this.token
    //     )
    // });
    return next.handle(req);

  }

  getToken() {
    return this.afAuth.idToken.subscribe(token => this.token = token);
  }
}
