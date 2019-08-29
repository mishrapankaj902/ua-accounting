import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    readonly endPoint = environment.base_url
    private token = ''
    constructor(
        public http: HttpClient,
        public afAuth: AngularFireAuth,
        private db: AngularFirestore,
    ) {
        this.afAuth.idToken.subscribe(token => {
            this.token = token;
        })
    }

    create(data: any) {

    }

    update(values: any) {

    }

    delete() {

    }

    get() {
        return this.http.get(this.endPoint + 'users', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        })
    }

    addUserInfo(data: any) {
        return this.db.collection('Users').doc(data.$id).set(data);
    }
    getUserInfo(email: any) {
        return this.db.collection('Users', ref => ref.where('info.username', '==', email)).get();
    }


}