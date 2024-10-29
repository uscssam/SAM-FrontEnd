import { ProfileLevelEnum } from '../enums/profile-level.enum'
import { SpecialityEnum } from '../enums/speciality.enum'
import { BaseRequest } from './base.request'

export interface UserRequest extends BaseRequest {
    userName?: string
    password?: string
    fullname?: string
    email?: string
    phone?: string
    level?: ProfileLevelEnum
    speciality?: SpecialityEnum
}
