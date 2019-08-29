import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators'
import { AclService } from '../service/acl.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private acl: AclService
  ) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable {
  //   if (this.authService.isLoggedIn) {
  //     return true;
  //   }
  //   this.router.navigateByUrl('/authentication/page-login');
  //   return false;
  // }

  canActivate() {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.pipe(
        take(1),
        tap(async user => {
          if (user) {
            this.acl.user = user;
            await this.acl.ngOnInit()
            localStorage.setItem('user', JSON.stringify(user.toJSON()));
            resolve(true);
          } else {
            localStorage.setItem('user', null);
            this.router.navigate(['/authentication/page-login']);
            resolve(false);
          }
        })
      ).subscribe()
    })
  }
}
