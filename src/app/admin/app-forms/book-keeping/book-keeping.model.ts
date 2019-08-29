import { BaseModel } from '../model/_base.model';

export class BookKeepingModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    start_date: string = '';
    partner: string = '';
    manager: string = '';
    return_client: string = 'NO';
    type: string = 'Project';
    project: Project = new Project();
    quote: Quote = new Quote();
    deposit_made: string = '';
    deposit_requested: string = '';
    deposit_required: string = '';
    business_info: BusinessInfo = new BusinessInfo();
    staff_responsible_for_quote: string = '';
    industry: string = '';
    software_quickbooks: string = '';
    software_other: string = '';
    bank_name: string = '';
    bank_qty: string = '';
    credit_card_name: string = '';
    credit_card_qty: string = '';
    loans: string = '';
    payroll_info: string = '';
    prior_depr_report: string = '';
    other_special_requests: string = '';
    quote_amount: string = '';
    quote_date: string = '';
    logins: string = '';
    sales_use_tax_issues: string = '';
    other_notes: string = '';
    description_business: string = '';
    security_questions: string = '';
    personally_paid_business_expenses: string = '';
    partner_acceptance: string = ''

    constructor() {
        super()
    }

    public clear() {
        this.type = '';
        this.industry = '';
        this.loans = '';
        this.other_special_requests = '';
        this.payroll_info = '';
        this.quote_amount = '';
        this.quote_date = '';
        this.software_other = '';
        this.software_quickbooks = '';
        this.staff_responsible_for_quote = '';
        this.deposit_made = '';
        this.deposit_requested = '';
        this.deposit_required = '';
        this.logins = '';
        this.manager = '';
        this.other_notes = '';
        this.partner = '';
        this.partner_acceptance = ''
        this.personally_paid_business_expenses = '';
        this.return_client = '';
        this.sales_use_tax_issues = '';
        this.security_questions = '';
        this.start_date = '';
        return this;
    }
}


export class BusinessInfo {
    owner: string = '';
    main_contact: string = '';
    contact_info: string = '';
    ein: string = '';
    phone: string = '';
    email: string = '';
    address: string = '';
    business_info: string = '';
    include_fs_letter: string = '';
    letter_sent_date: string = '';

    constructor() { }

    public clear() {
        this.address = '';
        this.business_info = '';
        this.contact_info = '';
        this.ein = '';
        this.email = '';
        this.include_fs_letter = '';
        this.letter_sent_date = '';
        this.main_contact = '';
        this.owner = '';
        this.phone = '';
        return this;
    }
}

export class Project {
    amount: string = '';
    due_date: string = '';
    duration: string = 'Monthly';

    constructor() { }

    public clear() {
        this.amount = '';
        this.duration = '';
        this.due_date = '';
        return this;
    }
}
export class Quote {
    won_date: string = '';
    lost_date: string = '';

    constructor() { }

    public clear() {

        return this;
    }
}