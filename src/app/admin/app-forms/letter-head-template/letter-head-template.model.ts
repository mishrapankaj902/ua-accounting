import { BaseModel } from '../model/_base.model';

export class LetterHeadTemplateModel extends BaseModel {
    $id: string = '';
    $deal_id: string = '';
    file_name: string = '';
    file_path: string = '';
    temp_name: string = '';

    constructor() {
        super()
    }

    public clear() {
        this.file_name = '';
        this.file_path = '';
        this.temp_name = '';
        return this;
    }
}