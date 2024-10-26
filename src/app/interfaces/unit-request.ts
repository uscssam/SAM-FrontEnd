import { BaseRequest } from "./base.request";

export interface UnitRequest extends BaseRequest {
    name: string;
    street: string;
    neighborhood: string;
    cep: string;
    number: number;
    phone: string;
}