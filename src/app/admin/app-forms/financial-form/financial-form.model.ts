import { BaseModel } from '../model/_base.model';

export class FinancialFormModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    start_date: string = '';
    due_date: string = '';
    partner: string = '';
    manager: string = '';
    location: string = '';
    assign_to: string = '';
    referral: string = '';
    return_client = '';
    return_client_document = '';

    financial_form = {
        business_name: '',
        nature_of_business: '',
        ein: '',
        phone: '',
        email: '',
        bid_amount: '',
        length_of_contract: '',
        bank_verification: ''

    };
    check_all_that_apply = {
        compilation_personal_financial_statement: '',
        compilation_full_disc: '',
        compilation_non_disc: '',
        compilation_development: '',
        compilation_cash_flows: '',
        compilation_wip: '',
        review_personal_financial_statement: '',
        review_full_disc: '',
        review_non_disc: '',
        review_development: '',
        review_cash_flows: '',
        review_wip: '',
        audit: '',
        period_of_financial: ''
    };

    bookkeeping_info = {
        quickbooks: '',
        passwords: '',
        security_questions: '',
        full_service: '',
        notes: '',
        personal_notes: '',
        partner_acceptance: ''
    }

    constructor() {
        super()
    }

    public clear() {
        return this;
    }
}