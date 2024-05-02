export class Client {
    constructor(name: string) {
        this.FullName = name
    }
    "dateTime": number | string | Date = new Date().toLocaleString();
    "FullName": string = '';
    "Status": number | string = 0;
    "id": number | string;
}