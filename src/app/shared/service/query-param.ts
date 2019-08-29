export class QueryParam {
    key: string;
    opr: string;
    value: string;
    constructor(key: string, value = "", opr = "==") {
        this.key = key;
        this.opr = opr;
        this.value = value;
    }
    clear() {
        this.key = "";
        this.opr = "";
        this.value = "";
    }
}