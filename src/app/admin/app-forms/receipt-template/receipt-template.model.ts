import { BaseModel } from '../model/_base.model';

export class ReceiptTemplateModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    amount: string = '';
    balance_due: string = '';
    cash: string = '';
    check: string = '';
    client_name: string = '';
    date: string = '';
    description: string = '';
    invoice: string = '';
    partner: string = '';
    prepayment: string = '';
    received_by: string = '';

    constructor() {
        super()
    }

    public clear() {
        this.amount = '';
        this.balance_due = '';
        this.cash = '';
        this.check = '';
        this.client_name = '';
        this.date = '';
        this.description = '';
        this.invoice = '';
        this.partner = '';
        this.prepayment = '';
        this.received_by = '';
        return this;
    }
}