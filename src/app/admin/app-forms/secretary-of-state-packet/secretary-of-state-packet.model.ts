import { BaseModel } from '../model/_base.model';

export class SecretaryOfStatePacketModel extends BaseModel {
    $deal_id = "";
    company_name = "";
    phone_number: String = "";
    company_type = "";
    company_address = "";
    email_address = "";
    officers_address: "";
    agreement = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        signature: '',
        date: '',
        fee: ''
    };

    EIN = {
        bussiness_state: "",
        responsible_party: "",
        social_security_number: '',
        dob: '',
        mailing_address: '',
        highest_employee: '',
        first_wage_date: '',
        principal_bussiness_activity: '',
        shareholder_name: '',
        shareholder_owner_ship: '',
        shareholder_effective_from: '',
        initials:  ''
    };
    name = '';
    amount = '';
    after_date = '';
    payment_for = '';
    billing_address = '';
    phone = '';
    city = '';
    email = '';
    account_type = '';
    card_holder_name = '';
    card_account_number = '';
    exp_date = '';
    cvv2 = '';

}