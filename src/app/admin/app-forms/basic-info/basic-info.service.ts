import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../services/auth.service';
import { BasicInfoModel } from './basic-info.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class BasicInfoService {
    basicInfo: AngularFirestoreCollection<BasicInfoModel>;
    readonly origin = environment.base_url + 'ClientBasicInfo';
    token: string;
    constructor(
        public db: AngularFirestore,
        private auth: AuthService,
        private http: HttpClient,
    ) {
        //this.basicInfo = this.db.collection<BasicInfoModel>('Clients');
        this.basicInfo = this.db.collection<BasicInfoModel>('ClientBasicInfo');
        this.auth.afAuth.idToken.subscribe(d => {
            this.token = 'Bearer ' + d;
        })
    }

    create(data: any) {
        data._updatedAt = (new Date()).toISOString();
        data._createdAt = (new Date()).toISOString();
        return this.basicInfo.add(data);
    }

    addUserInfo(data: any) {
        return this.db.collection('Users').doc(data.$id).set(data);
    }
    getUserInfo(email: any) {
        return this.db.collection('Users', ref => ref.where('info.username', '==', email)).get();
    }

    createUser(email: string, password: string) {
        return this.auth.afAuth.auth.createUserWithEmailAndPassword(email, password)
    }

    update(values: any) {
        values._updatedBy = this.auth.id;
        values._updatedAt = (new Date()).toISOString();
        return this.basicInfo.doc(values.$id).update(values);
    }

    updateForm(data) {
        return this.http.post(this.origin, data, { headers: { 'Authorization': this.token } })
    }

    createClientLogin(data) {
        return this.http.post(this.origin + '/create-login', data)
    }

    delete() {

    }

    get() { }
}