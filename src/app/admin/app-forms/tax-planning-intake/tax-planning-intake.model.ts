import { BaseModel } from '../model/_base.model';

export class TaxPlanningIntakeModel extends BaseModel {
    $deal_id = '';
    start_date = '';
    due_date = '';
    location = '';
    partner = '';
    manager = '';
    assign_to = '';
    federal = '';
    state = '';
    returning_client = '';

    name = '';
    birthday = '';
    dod = '';
    occupation = '';
    ss = '';
    phone = '';
    email = '';

    spouse_name = '';
    spouse_birthday = '';
    spouse_dod = '';
    spouse_occupation = '';
    spouse_ss = '';
    spouse_address = '';

    dependents = { saly: '', number: '', over: '' }

    deductions = '';
    health_insurance = '';
    wages = {
        name: '',
        amount: '',
        with_held: ''
    }
    div_interest = '';
    nol = '';
    stock_sales = '';
    other = '';
    other_income = '';

    retirement_plan = '';
    election_needed = '';
    payroll_needed = '';

    QBI = {
        0: '',
        1: '',
        2: '',
    }
    other_notes = '';

    partner_acceptance = '';
    date = '';

}