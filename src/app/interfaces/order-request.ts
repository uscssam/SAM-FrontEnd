import { BaseRequest } from "./base.request";

export interface OrderRequest extends BaseRequest {
    description: string;
    status: string;
    opening: string;
    closed?: string;
    machine: number;
    technician: number;
    createdBy: number;
}