import { ReceiptTemplateModel } from './receipt-template.model';
import { QueryParam } from './../../../shared/service/query-param';
import { AuthService } from './../../../services/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptTemplateService {
    readonly endPoint = 'ReceiptTemplate'
    dbCollection: AngularFirestoreCollection<ReceiptTemplateModel>;


    constructor(
        private db: AngularFirestore,
        private auth: AuthService,
    ) {
        this.dbCollection = this.db.collection<ReceiptTemplateModel>(this.endPoint);
    }

    create(data: ReceiptTemplateModel) {
        data._updatedAt = (new Date()).toISOString();
        data._createdAt = (new Date()).toISOString();
        return this.dbCollection.add(data);
    }

    update(values: ReceiptTemplateModel) {
        values._updatedBy = this.auth.id;
        values._updatedAt = (new Date()).toISOString();
        return this.dbCollection.doc(values.$id).update(values);
    }

    delete() {

    }

    get(data?: QueryParam[]) {
        return this.db.collection<ReceiptTemplateModel>(this.endPoint, (ref: any) => {
            data.forEach(e => {
                ref = ref.where(e.key, '==', e.value)
            })
            return ref
        }).snapshotChanges();
    }

}