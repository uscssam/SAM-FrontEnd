import { StatusOrderServiceEnum } from "../enums/status-order-service.enum";
import { BaseRequest } from "./base.request";

export interface OrderRequest extends BaseRequest {
  description?: string;
  status?: number;
  opening?: string;
  closed?: string;
  idMachine?: number;
  idTechnician?: number;
  createdBy?: number;
}
