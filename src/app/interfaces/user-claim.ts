import { ProfileLevelEnum } from "../enums/profile-level.enum"

export interface UserClaim {
    subject: string
    module: string
    name: string
    fullname: string
    role: ProfileLevelEnum
    exp: number
    iss: string
    aud: string
}
