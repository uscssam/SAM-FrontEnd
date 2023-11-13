export interface UserClaim {
    sub: string
    module: string
    name: string
    fullname: string
    role: string
    exp: number
    iss: string
    aud: string
}
