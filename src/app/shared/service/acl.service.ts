import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './../../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AclModel } from '../model/acl.model';
import * as _ from 'lodash'
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AclService {
    user: User;
    userPermissions: string[] = [];
    credentialChanged: Subject<boolean> = new Subject();
    aclChange: Subject<string[]> = new Subject();
    aclModel: AclModel = new AclModel();
    profile: any = {}
    constructor(
        private db: AngularFirestore
    ) { }

    async ngOnInit() {
        const d = await this.db.collection('Users').doc(this.id).get().toPromise();
        if (d.data() !== undefined) {
            this.profile = d.data();
            this.profile.id = d.id;
            this.userPermissions = this.aclModel.getPermission(d.data().roles)
            this.aclChange.next(this.userPermissions);
        }
    }

    get isLoggedIn(): boolean {
        this.user || (this.user = JSON.parse(localStorage.getItem('user')));
        return this.user !== null;
    }

    get id(): string {
        this.user || (this.user = JSON.parse(localStorage.getItem('user')));
        return this.user.uid;
    }

    get isAdmin() {
        return this.profile && (this.profile.roles === '*');
    }

    get isClient() {
        return this.profile && _.isArray(this.profile.roles) && (this.profile.roles.indexOf('client') === -1);
    }

    public checkPermission(requestedPermission: string[], operator = 'and') {
        let granted = true;
        if (operator.toLocaleLowerCase() == 'or') {
            for (const checkPermission of requestedPermission) {
                if (_.findIndex(this.userPermissions, checkPermission) !== -1) {
                    return true;
                }
            }
            return false
        }
        if (operator.toLocaleLowerCase() == 'and') {
            for (const checkPermission of requestedPermission) {
                granted = (granted && (_.indexOf(this.userPermissions, checkPermission) !== -1))
                if (granted == false) {
                    return granted;
                }
            }
        }
        return granted;
    }
}
