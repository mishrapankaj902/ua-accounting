import { LetterHeadTemplateModel } from './letter-head-template.model';
import { QueryParam } from './../../../shared/service/query-param';
import { AuthService } from './../../../services/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LetterHeadTemplateService {
    readonly endPoint = 'LetterHeadTemplate'
    dbCollection: AngularFirestoreCollection<LetterHeadTemplateModel>;

    constructor(
        private db: AngularFirestore,
        private auth: AuthService,
        private storage: AngularFireStorage,
    ) {
        this.dbCollection = this.db.collection<LetterHeadTemplateModel>(this.endPoint);
    }

    create(data: any) {
        data._updatedAt = (new Date()).toISOString();
        data._createdAt = (new Date()).toISOString();
        return this.dbCollection.add(data);
    }

    update(values: any) {
        values._updatedBy = this.auth.id;
        values._updatedAt = (new Date()).toISOString();
        return this.dbCollection.doc(values.$id).update(values);
    }

    delete(values: any) {
        return this.dbCollection.doc(values.$id).delete();
    }

    fileHandler(location: string) {
        return this.storage.ref(location);
    }

    get(data?: QueryParam[]) {
        return this.db.collection<LetterHeadTemplateModel>(this.endPoint, (ref: any) => {
            data.forEach(e => {
                ref = ref.where(e.key, '==', e.value)
            })
            return ref
        }).snapshotChanges();
    }

}