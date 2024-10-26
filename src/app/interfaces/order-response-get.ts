import { BaseResponse } from "./base-response";

export interface OrderGetResponse extends BaseResponse {
    description: string;
    status: string;
    opening: string;
    closed?: string;
    idMachine: number;
    idTechnician: number;
    createdBy: number;
    id: number;
}