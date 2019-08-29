import { BaseModel } from '../model/_base.model';

export class BusinessTaxesIntakeModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    start_date: string = '';
    due_date: string = '';
    location: string = '';
    partner: string = '';
    manager: string = '';
    source: string = '';
    assign_to: string = '';
    return_client: string = '1';
    client_notes: ClientNotes = new ClientNotes();
    business_name: string = '';
    ein: string = '';
    phone: string = '';
    email: string = '';
    business_address: string = '';
    owner: string = '';
    owner_address: string = '';
    industry_type: string = '';
    type_of_business: string = '1120S';
    year_to_be_filled: string = '';
    bookkeeping_information: BookkeepingInformation = new BookkeepingInformation()

    us_todo_books: USTodoBooks = new USTodoBooks()
    personally_paid_items: PersonallyPaidItems = new PersonallyPaidItems()

    // description_of_business: string = '';
    // is_service: string = '';
    // owner_ssn: string = '';
    // return_docs: string = '';
    
    copy_of_w2_w3s_pr: string = "";
    loan_statements: string = "";
    prior_depreciation_reports: string = "";
    copy_of_last_year_return: string = "";
    personal_interest: string = ''
    notes: string = '';
    additional_service: string = '';
    partner_acceptance: string = '';

    constructor() {
        super()
    }

    public clear() {
        this.additional_service = '';
        this.assign_to = '';
        this.business_address = '';
        this.business_name = '';
        // this.description_of_business = '';
        this.due_date = '';
        this.ein = '';
        this.email = '';
        // this.is_service = '';
        this.location = '';
        this.manager = '';
        this.notes = '';
        this.owner = '';
        this.owner_address = '';
        // this.owner_ssn = '';
        this.partner = '';
        this.partner_acceptance = '';
        this.personal_interest = ''
        this.phone = '';
        this.return_client = '';
        // this.return_docs = '';
        this.source = '';
        this.start_date = '';
        this.copy_of_w2_w3s_pr = "";
        this.copy_of_last_year_return = "";
        this.loan_statements = "";
        this.prior_depreciation_reports = "";
        return this;
    }
}

export class BookkeepingInformation {
    is_excel: string = '';
    is_other: string = '';
    is_pbc: string = '';
    is_qbooks: string = '';
    officer_salary: string = '';
    passwords: string = '';
    special_notes: string = '';


    constructor() { }

    public clear() {
        this.officer_salary = '';
        this.passwords = '';
        this.special_notes = '';
        this.is_excel = '';
        this.is_other = '';
        this.is_pbc = '';
        this.is_qbooks = '';
        return this;
    }
}

export class ClientNotes {
    federal: string = '';
    books: string = '';
    s_election_amount: string = '';
    state_name: string = '';
    state_amount: string = '';
    label_1099s: string = '';
    deposit: string = '';
    s_election_is_late: string = '';
    followup_needed: string = '';
    engagement_letter: string = '1';
    constructor() { }

    public clear() {
        this.label_1099s = '';
        this.books = '';
        this.deposit = '';
        this.federal = '';
        this.s_election_amount = '';
        this.s_election_is_late = '';
        this.state_amount = '';
        this.state_name = '';
        return this;
    }
}

export class PersonallyPaidItems {
    auto_expense: string = '';
    cell_phone: string = '';
    computers_internet: string = '';
    furniture_equipment: string = '';
    health_insurance: string = '';
    home_office: string = '';
    professional_dues: string = '';
    total: string = '';

    constructor() { }

    public clear() {
        this.auto_expense = '';
        this.cell_phone = '';
        this.computers_internet = '';
        this.furniture_equipment = '';
        this.health_insurance = '';
        this.home_office = '';
        this.professional_dues = '';
        this.total = '';
        return this;
    }
}

export class USTodoBooks {
    bank_accounts: string = '';
    cc_accounts: string = '';
    loans: string = '';
    months: string = '';
    payroll: string = '';
    years: string = '';

    constructor() { }

    public clear() {
        this.bank_accounts = '';
        this.cc_accounts = '';
        this.loans = '';
        this.months = '';
        this.payroll = '';
        this.years = '';
        return this;
    }
}