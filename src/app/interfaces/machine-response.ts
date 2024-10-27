import { StatusMachineEnum } from "../enums/status-machine.enum"
import { BaseResponse } from "./base-response"

export interface MachineResponse extends BaseResponse {
    name: string
    status: StatusMachineEnum
    lastMaintenance: Date
    idUnit: number
    unit: string
}
