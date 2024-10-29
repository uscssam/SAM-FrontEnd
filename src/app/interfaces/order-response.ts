import { StatusOrderServiceEnum } from "../enums/status-order-service.enum";
import { BaseResponse } from "./base-response";

export interface OrderResponse extends BaseResponse {
    description: string;
    status?: StatusOrderServiceEnum;
    opening: string;
    closed?: string;
    idMachine: number;
    idTechnician: number;
    createdBy: number;
    id: number;
}
