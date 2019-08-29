import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AclService } from '../shared/service/acl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private acl: AclService,
    public router: Router,
    private db: AngularFirestore
  ) { }

  async  login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  get isLoggedIn(): boolean {
    return this.acl.isLoggedIn;
  }

  get id(): string {
    return this.acl.id;
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  getUserInfo(id) {
    return this.db.collection('Users').doc(id).get()
  }
}
