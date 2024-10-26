import { BaseResponse } from "./base-response";

export interface OrderResponse extends BaseResponse {
    description: string;
    status: string;
    opening: string;
    closed?: string;
    machine: number;
    technician: number;
    createdBy: number;
    id: number;
}