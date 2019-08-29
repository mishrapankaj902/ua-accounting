import { BaseModel } from '../model/_base.model';

export class BookKeepingFormModel extends BaseModel {
    $id = '';
    $deal_id = '';
    start_date = '';
    due_date = '';
    partner = '';
    manager = '';
    location = '';
    referral = '';
    assign_to = '';
    return_client = '';
    project_info = {
        period: '',
        budget: '',
        total_hours: '',
        ua: '',
        duvlin: '',
        return_client_doc: '',
    }
    bussiness_info = {
        name: '',
        nature: '',
        ein: '',
        phone: '',
        fax: '',
        email: '',
        address: '',
        owners: [
            {
                name: '',
                ssn: '',
                percent: '',
                address: '',
            }, {
                name: '',
                ssn: '',
                percent: '',
                address: '',
            }
        ],
        welcome_email: '',
        statement_requested: '',
        arrangement_card_letter: '',
        credit_card_number_on_file: '',
        edit_chart: '',
    };
    book_keeping_info = {
        quickbooks: '',
        banklogin: '',
        passwords: '',
        pw: '',
        security_question: '',
        security: ''
    };
    full_service_book_keeping = {
        months: 0,
        payroll: '',
        log_in: '',
        cc_log_in: '',
        security: '',
        pw: ''
    };
    other_item_paid = {
        healt_insurance: '',
        internet: '',
        auto_expense: '',
        professional_dues: '',
        cell_phone: '',
        equipment: '',
        office_total: 0
    };
    payroll_provider = {
        summary: '',
        loan_statement: '',
        depreciations: '',
        last_return: '',
        asset_list: '',
        personal_interest: '',
        notes: '',
        acceptance: ''
    }

    constructor() {
        super()
    }

    public clear() {

        return this;
    }
}
