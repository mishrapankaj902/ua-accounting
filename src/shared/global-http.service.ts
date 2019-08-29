import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpService {

  constructor(public http: HttpClient) {
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }
}
