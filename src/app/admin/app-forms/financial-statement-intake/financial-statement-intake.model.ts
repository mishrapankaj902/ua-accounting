import { BaseModel } from '../model/_base.model';

export class FinancialStatementIntakeModel extends BaseModel {
    
    $id: string = "";
    $deal_id: string = '';
    start_date: string = "";
    due_date: string = "";
    location: string = "";
    partner: string = "";
    manager: string = "";
    source: string = "";
    assign_to: string = "";

    returning_client: string = "";
    documents_returned: string = "";
    FS: string = "";
    book_cleanup: string = ""; 
    deposit: string = "";

    business_name: string = "";
    EIN: string = "";
    phone: string = "";
    email: string = "";
    address: string = "";
    industry_type: string = "";
    business_owner: string = ""; 
    bid_amount: string = "";
    length_of_contract: string = "";
    cs_project_template_id: string = "";

    compliation: Compilation = new Compilation();
    review: Review = new Review();
    book_keeping_info: BookKeepingInformation = new BookKeepingInformation();
    entity_type: string = "";
    peiod_of_financial: string = "";


    notes: string = "";
    partner_acceptance: string = "";
    personal_note: string = "";

    constructor() {
        super()
    }

    public clear() {
        this.EIN = "";
        this.FS = "";
        this.address = "";
        this.assign_to = "";
        this.bid_amount = "";
        this.book_cleanup = ""; 
        this.business_name = "";
        this.business_owner = ""; 
        this.cs_project_template_id = "";
        this.deposit = "";
        this.documents_returned = "";
        this.due_date = "";
        this.email = "";
        this.entity_type = "";
        this.industry_type = "";
        this.length_of_contract = "";
        this.location = "";
        this.manager = "";
        this.notes = "";
        this.partner = "";
        this.partner_acceptance = "";
        this.peiod_of_financial = "";
        this.personal_note = "";
        this.phone = "";
        this.returning_client = "";
        this.source = "";
        this.start_date = "";
        return this;
    }
}

export class BookKeepingInformation {
    full_service_bookkeeping:string = "";
    passwords:string = "";
    quickbooks_others:string = "";
    security_questions:string = ""; 


    constructor() {}

    public clear() {
        this.full_service_bookkeeping = "";
        this.passwords = "";
        this.quickbooks_others = "";
        this.security_questions = ""; 
        return this;
    }
}

export class Compilation {
    full_disc: string = "";
    non_disc: string = "";
    CPFS: string = "";
    WIP: string = "";
    tax_gaap: string = "";     
    cash_flows: string = "";

    constructor() {}

    public clear() {
        this.CPFS = "";
        this.WIP = "";
        this.cash_flows = "";
        this.full_disc = "";
        this.non_disc = "";
        this.tax_gaap = "";   
        return this;
    }
}

export class Review {
    full_disc: string = "";
    non_disc: string = "";
    RPFS: string = "";
    WIP: string = "";
    tax_gaap: string = ""; 
    cash_flows: string = "";

    constructor() {}

    public clear() {
        this.RPFS = "";
        this.WIP = "";
        this.cash_flows = "";
        this.full_disc = "";
        this.non_disc = "";
        this.tax_gaap = ""; 
        return this;
    }
}