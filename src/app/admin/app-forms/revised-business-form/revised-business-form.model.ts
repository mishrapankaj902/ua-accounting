import { BaseModel } from '../model/_base.model';

export class RevisedBusinessFormModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    start_date = '';
    due_date = '';
    partner = '';
    manager = '';
    location = '';
    referral = '';
    assign_to = '';
    return_client = '';

    client_notes = {
        federal: '',
        books: '',
        s_election: '',
        state: '',
        _1099s: '',
        deposit: '',
        return_docs: '',
        business_name: '',
        email: '',
        nature_of_business: '',
        business_address: '',
        ein: '',
        phone: ''
    }
    owner = [{
        ua_prepares: '',
        ssn: '',
        percent: '',
        need: '',
    }, {
        ua_prepares: '',
        ssn: '',
        percent: '',
        need: '',
    }]
    owners_address: '';

    business_info = {
        format: '',
        special_notes: '',
        officer_salary: '',
        payments: ''
    }

    ua_books = {
        months: '',
        years: '',
    }

    attach_passwords = {
        bank_accounts: '',
        loans: '',
        cc_loans: '',
        payroll: '',
    }

    other_items = {
        health_insurance: '',
        internet: '',
        auto_expense: '',
        professinal_dues: '',
        cell_phone: '',
        equipment: '',
        home_office: '',
        total: ''
    }

    others = {
        summary: '',
        loan_statement: '',
        depreciation_report: '',
        last_year_return: '',
        cell_phone: '',
        personal_interest: '',
        notes: '',
        partner_acceptance: ''
    }
    constructor() {
        super()
    }

    public clear() {
        return this;
    }
}