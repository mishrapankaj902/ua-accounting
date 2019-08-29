import { QueryParam } from './../../../shared/service/query-param';
import { AuthService } from './../../../services/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { BankVerificationModel } from './bank-verification.model';
import { Injectable } from '@angular/core';
import { GlobalHttpService } from '../../../../shared/global-http.service';
import { GlobalUrls } from '../../../../shared/global-urls';
import { Observable } from 'rxjs/internal/Observable';
import { AclService } from '../../../shared/service/acl.service';

@Injectable()
export class BankVerificationService {
    readonly endPoint = 'BankVeriicationForm'
    dbCollection: AngularFirestoreCollection<BankVerificationModel>;


    constructor(
        private db: AngularFirestore,
        private auth: AclService,
        public http: GlobalHttpService 
    ) {
        this.dbCollection = this.db.collection<BankVerificationModel>(this.endPoint);
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

    delete() {

    }

    get(data?: QueryParam[]) {
        return this.db.collection<BankVerificationModel>(this.endPoint, (ref: any) => {
            data.forEach(e => {
                ref = ref.where(e.key, '==', e.value)
            })
            return ref
        }).snapshotChanges();
    }


uploadPdfOnPandaDoc(body: any): Observable<any>  {
  return this.http.post(GlobalUrls.createDocumetnFromPdf, body);
}


}