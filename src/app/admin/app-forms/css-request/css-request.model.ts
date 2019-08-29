import { BaseModel } from '../model/_base.model';

export class CSSRequestModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    start_date: string = '';
    location: string = "";
    partner: string = "";
    manager: string = "";
    returning_client: string = "";
    send_result_to: SendResultTo = new SendResultTo();

    business_name: string = "";
    business_name_poa: string = "";
    personal_name: string = "";
    personal_name_poa: string = "";
    personal_name_spouse: string = "";
    personal_name_spouse_poa: string = "";

    section_a: SectionA = new SectionA();
    seceretary_of_state: SeceretaryOfState = new SeceretaryOfState()
    wage_income_transcripts: WageIncomeTranscripts = new WageIncomeTranscripts()
    account_transcripts: AccountTranscripts = new AccountTranscripts()
    compliance_check: ComplianceCheck = new ComplianceCheck()
    other_request: OtherRequest = new OtherRequest()

    other_notes: string = "";
    partner_acceptance: string = "";
    what_is_plan: string = '';

    constructor() {
        super()
    }

    public clear() {
        this.business_name = '';
        this.location = "";
        this.manager = "";
        this.other_notes = "";
        this.partner = "";
        this.partner_acceptance = "";
        this.personal_name = "";
        this.personal_name_spouse = "";
        this.returning_client = "";
        this.start_date = '';
        this.what_is_plan = '';
        return this;
    }
}

export class AccountTranscripts {
    years: string = "";
    fee: string = "";
    bill_collect_now: string = "";
    apply_to_credit: string = "";
    collect_later: string = "";
    due_date: string = "";
    
    status: string = "";


    constructor() { }

    public clear() {
        this.apply_to_credit = "";
        this.bill_collect_now = "";
        this.collect_later = "";
        this.due_date = "";
        this.fee = "";
        this.status = "";
        this.years = "";
        return this;
    }
}

export class ComplianceCheck {
    years: string = "";
    fee: string = "";
    bill_collect_now: string = "";
    apply_to_credit: string = "";
    collect_later: string = "";
    due_date: string = "";
    status: string = "";

    constructor() { }

    public clear() {
        this.apply_to_credit = "";
        this.bill_collect_now = "";
        this.collect_later = "";
        this.due_date = "";
        this.fee = "";
        this.status = "";
        this.years = "";
        return this;
    }
}

export class SeceretaryOfState {
    fee: string = "";
    collect_now: string = "";
    apply_to_credit: string = "";
    collect_later: string = "";
    due_date: string = "";
    status: string = "";

    see_form = ''
    email_client = ''
    circle = ''

    constructor() { }

    public clear() {
        this.apply_to_credit = "";
        this.collect_later = "";
        this.collect_now = "";
        this.due_date = "";
        this.fee = "";
        this.status = "";
        return this;
    }
}

export class SectionA {
    address_business: string = '';
    address_personal: string = '';
    email: string = '';
    phone: string = '';
    ein: string = '';
    taxpayer_ssn: string = '';
    spouce_ssn: string = '';

    constructor() { }

    public clear() {
        this.address_business = '';
        this.address_personal = '';
        this.email = '';
        this.phone = '';
        this.ein = '';
        this.taxpayer_ssn = '';
        return this;
    }
}

export class SendResultTo {
    look_in_cs_practice: string = '';
    name: string = '';
    constructor() { }

    public clear() {
        this.look_in_cs_practice = '';
        this.name = '';
        return this;
    }
}

export class WageIncomeTranscripts {
    fee: string = "";
    years: string = "";
    bill_collect_now: string = "";
    apply_to_credit: string = "";
    collect_later: string = "";
    due_date: string = "";

    status: string = "";

    constructor() { }

    public clear() {
        this.apply_to_credit = "";
        this.bill_collect_now = "";
        this.collect_later = "";
        this.due_date = "";
        this.fee = "";
        this.status = "";
        this.years = "";
        return this;
    }
}

export class OtherRequest {
    request: string = "";
    fee: string = "";
    bill_collect_now: string = "";
    apply_to_credit: string = "";
    collect_later: string = "";
    due_date: string = "";

    status: string = "";

    constructor() { }

    public clear() {
        this.apply_to_credit = "";
        this.bill_collect_now = "";
        this.collect_later = "";
        this.due_date = "";
        this.fee = "";
        this.status = "";
        return this;
    }
}