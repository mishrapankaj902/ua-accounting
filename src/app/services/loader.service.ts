import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface LoaderInterface {
  loader: boolean;
  options?: any;
}
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader$: Subject<LoaderInterface>
  constructor() {
    this.loader$ = new Subject()
   }

  loader(value: boolean, opt = {}) {
    this.loader$.next({ loader: value, options: opt })
  }
}
