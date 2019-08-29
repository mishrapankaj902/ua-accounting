import { BaseModel } from './../model/_base.model';

export class BasicInfoModel extends BaseModel {
    $id: string = "";
    contact_person_name: string = "";
    company_name: string = "";
    query: string = "";
    representative: number = 0;
    title: string = "";
    deal_value: string = "";
    deal_currency: string = "USD";
    close_date: string = "";
    pipe_line: number = 1;
    type: number = 1;
    email: string = "";
    phone: string;
    ein: string;
    ssn: string;
    status: string = "active";
    address: string;
    deal_name: string;
    deal_size: string;
    deal_desc: string;
    start_date: any;
    meeting_length: string = '45';
    token: string = '';
    fillable_forms = [];
    ua_services = [];
    public clear() {
        this.$id = null;
        this.contact_person_name = null;
        this.title = "";
        this.deal_value = "";
        this.deal_currency = "";
        this.close_date = "";
        this.pipe_line = 1;
        this.type = 1;
        this.email = null;
        this.phone = null;
        this.ein = null;
        this.ssn = null;
        this.status = 'Active';
        this.address = null;
        this.deal_name = "";
        this.deal_size = "";
        this.deal_desc = "";
        this.start_date = "";
        this.meeting_length = "";
        this.fillable_forms = [];
        this.ua_services = [];
    }
}
