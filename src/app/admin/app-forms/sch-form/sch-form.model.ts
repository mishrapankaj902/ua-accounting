import { BaseModel } from '../model/_base.model';

export class SchFormModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    bussiness_name: string = '';
    address: string = '';
    principal_bussiness: string = '';
    operated_by: string = '';
    tax_payer_file: string = '';
    sale: string = '';
    expenses: string[] = ['', '', '', '', '', '', '', '', '', ''];
    vehicle_detail = {
        purchase_date: '',
        cost: 0,
        make_and_model: '',
        mile_driven: '',
        mile_bussiness: '',
        available_off_day: '',
        available_personal_use: '',
    };
    actual_expense: string[] = ['', '', '', '', '', '']
    business_expense = {
        area: '',
        total_area: '',
        rent: '',
        utility: '',
        other: ''
    }

    constructor() {
        super()
    }

    public clear() {
        return this;
    }
}