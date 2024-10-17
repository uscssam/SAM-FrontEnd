import { ProfileLevelEnum } from "../enums/profile-level.enum"
import { BaseResponse } from "./base-response"

export interface UserResponse extends BaseResponse {
  userName: string
  fullname: string
  email: string
  phone: string
  level: ProfileLevelEnum
  speciality: number
}
