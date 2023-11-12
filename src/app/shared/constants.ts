import { environment } from "src/environments/environment";

export class Constants {
    constructor() {}

    static login = environment.baseUrlApi + 'login'
}