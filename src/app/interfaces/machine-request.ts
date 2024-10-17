import { StatusMachineEnum } from "../enums/status-machine.enum"
import { BaseRequest } from "./base.request"

export interface MachineRequest extends BaseRequest {
    name: string
    status: StatusMachineEnum,
    lastMaintenance: Date
}
