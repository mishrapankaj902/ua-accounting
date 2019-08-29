import { BaseModel } from '../model/_base.model';

export class RevisedClientNotesModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    start_date = '';
    due_date = '';
    partner = '';
    manager = '';
    location = '';
    assign_to = '';
    referal = '';
    document_held = '';
    deposit_30 = '';
    federal = '';
    state = '';
    return_client = '';

    client_notes = {
        poa: '',
        type: '',
        col1: {
            name: '',
            bithday: '',
            dod: '',
            occupation: '',
            ss: '',
            phone: '',
            email: '',
        },
        col2: {
            spouse_name: '',
            birthday: '',
            dod: '',
            occupation: '',
            ss: '',
            phone: '',
            email: '',
        }
    }

    dependents = [
        {
            name: '',
            dob: '',
            ss: '',
            relation_ship: '',
            education: '',
        },
        {
            name: '',
            dob: '',
            ss: '',
            relation_ship: '',
            education: '',
        },
        {
            name: '',
            dob: '',
            ss: '',
            relation_ship: '',
            education: '',
        }
    ];

    income = {
        wage: '',
        alimony: '',
        business_income: '',
        schedule: '',
        dividends: '',
        gambling: '',
        interest: '',
        rental_income: '',
        retirement_income: '',
        social_security: '',
        syock_sales: '',
        un_employment: '',
        from_state: '',
        educator_expense: '',
        healthcare: '',
        form_2016: ''
    };

    deduction = {
        property_tax: '',
        mortage_interest: '',
        tax_preparation_fees: '',
        non_disc: '',
        sale_tax: '',
        charitable_donation_cash: '',
        charitable_donation_noncash: '',
        attorney_fees: '',
        medical_expenses: '',
        dmv: '',
        education_expense: '',
        student_loan: '',
        childcare: '',
        retirement_contribution: '',
        moving_expense: '',
        energy_credits: '',
    };


    others = {
        other_notes: '',
        refund: '',
        routing_number: '',
        account_number: '',
        financial_institution: '',
        date: '',
        coupons_needed: '',
        partner_acceptance: '',
    }
    constructor() {
        super()
    }

    public clear() {
        return this;
    }
}