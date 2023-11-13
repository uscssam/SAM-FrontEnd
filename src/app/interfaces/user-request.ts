import { ProfileLevelEnum } from '../enums/profile-level.enum'

export interface UserRequest {
    userName: string
    fullname: string
    email: string
    phone: string
    level: ProfileLevelEnum
    speciality: number
}
