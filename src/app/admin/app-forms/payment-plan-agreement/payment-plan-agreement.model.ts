import { AngularFireDatabaseModule } from 'angularfire2/database';
import { OnDestroy } from '@angular/core';
import { BaseModel } from '../model/_base.model';

export class PaymentPlanAgreementModel extends BaseModel {
    $deal_id = "";
    client = '';
    business = '';
    payment_aggrement = '';
    total_amount = '';
    follows = '';
    on = '';
    and_$ = '';
    and_ = '';
    on_the = '';
    payment_cash = '';
    payment_card = '';
    account_type = '';
    cardholder_name = '';
    account_number = '';
    expiration_date = '';
    cvv = '';
    billing_address = '';
    phone = '';
    city_state_zip = '';
    email = '';
    customRadioInline1 = '';
    name_of_client = '';
    name_of_client_date = '';
    manager = '';
    manager_date = '';
}