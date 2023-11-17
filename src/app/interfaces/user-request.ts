import { ProfileLevelEnum } from '../enums/profile-level.enum'

export interface UserRequest {
    id?: number,
    userName: string
    password?: string
    fullname: string
    email: string
    phone: string
    level: ProfileLevelEnum
    speciality: number
}
