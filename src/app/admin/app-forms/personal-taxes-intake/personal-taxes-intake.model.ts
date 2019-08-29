import { BaseModel } from '../model/_base.model';

export class PersonalTaxesIntakeModel extends BaseModel {
    $deal_id = '';
    start_date = '';
    due_date = '';
    location = '';
    partner = '';
    manager = '';
    referral = '';
    assign_to = '';
    engagement_letter_received = '';
    send_engagement_letter = '';
    documents_held = '';
    deposit = '';

    federal = '';
    state = '';
    returning_client = '';
    partner_followup_needed = '';

    poa = '';
    name = '';
    birthday = '';
    dod = '';
    occupation = '';
    ss = '';
    phone = '';
    email = '';
    year = '';
    spouse_name = '';
    spouse_birthday = '';
    spouse_dod = '';
    spouse_occupation = '';
    spouse_ss = '';
    spouse_address = '';

    dependents: Dependent[];

    wages = '';
    alimony = '';
    bussiness_income = '';
    schedule_k1s = '';
    dividends = '';
    global_winnings = '';
    interest = '';
    rental_income = '';
    retirement_income = '';
    social_security = '';
    stock_sales = '';
    unemployment = '';
    income_from_other_states = '';
    dates = '';
    educator_expenses = '';

    standard_education = '';
    itemized = '';
    real_state_property_tax = '';
    mortgage_interest = '';
    tax_prapogation_fee = '';
    sales_tax = '';
    charitable_donation_cash = '';
    charitable_donation_non_cash = '';
    attorney_fees = '';
    medical_expenses = '';
    dmv = '';
    other = '';
    student_loan_interest = '';
    childcare = '';
    ira = '';
    moving_expense = '';
    energy_credits = '';

    c1095: '';
    a1095: '';
    other_item_needed: '';
    form_2016: '';
    ua_to_do: '';
    service_to_discuss: '';
    partner_acceptance: '';

    expeted_refund: '';
    routing_number: '';
    account_number: '';
    financial_istituion: '';
    date: '';
    estimated_tax: '';
}

export class Dependent {
    name = '';
    ss = '';
    relationship = '';
    education = '';
}