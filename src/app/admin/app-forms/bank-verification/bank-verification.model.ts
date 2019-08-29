import { BaseModel } from '../model/_base.model';

export class BankAccount {
    type_of_account: string = '';
    account_name: string = '';
    account_number: string = '';
    constructor() {

    }

    public clear() {
        this.type_of_account = '';
        this.account_name = '';
        this.account_number = '';
        return this;
    }
}
export class DepositeAccount {
    account_name: string = '';
    account_type: string = '';
    account_number: string = '';
    account_balance: string = '';
    average: string = '';
    date_opened: string = '';

    constructor() {

    }

    public clear() {
        this.account_name = '';
        this.account_type = '';
        this.account_number = '';
        this.account_balance = '';
        this.average = '';
        this.date_opened = '';
        return this
    }
}

export class AccountCreditLines {
    line_of_credit_account: string = '';
    type_of_credit_line: string = '';
    date_opened: string = '';
    approved_amount: string = '';
    current_balance: string = '';
    payments_required: string = '';
    secured_by: string = '';
    public clear() {
        this.line_of_credit_account = '';
        this.type_of_credit_line = '';
        this.date_opened = '';
        this.approved_amount = '';
        this.current_balance = '';
        this.payments_required = '';
        this.secured_by = '';
        
    }
}
export class BankVerificationModel extends BaseModel {

    $id: string = '';
    $deal_id: string = '';
    applicant: string = '';
    bank_address: string = '';
    bank_account: Array<BankAccount>;
    account_credit_lines: Array<AccountCreditLines> = [];
    mv_date: string = '';
    representative: string = '';
    deposite_account: Array<DepositeAccount>;
    additional_info: string = '';
    bank_representative: string = '';
    account_classification:string = 'individual';
    verification_date: string = '';

    constructor() {
        super()
     }
    public clear() {
        this.$id = '';
        this.applicant = '';
        this.bank_address = '';
        this.account_classification = '';
        this.bank_account = [(new BankAccount()).clear()],
        this.verification_date = '';
    }

    public getForm() {

    }
}