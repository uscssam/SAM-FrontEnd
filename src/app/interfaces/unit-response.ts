import { BaseResponse } from "./base-response";

export interface UnitResponse extends BaseResponse {
    id: number;
    name?: string;
    street?: string;
    neighborhood?: string;
    cep?: string;
    number?: number;
    phone?: string;
}
