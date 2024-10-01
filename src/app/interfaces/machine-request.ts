export interface MachineRequest {
    id?: number,
    name: string
    status: Boolean,
    lastMaintenance: Date
    preventive: Date
}
