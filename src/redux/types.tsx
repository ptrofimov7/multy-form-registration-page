
type Statuses = 'idle' | 'loading' | 'failed'

export type UserData = {
    "id": number,
    "token": string,
    "is_confirm_email": number,
    "is_confirm_phone": number,
    "is_profile_created": number,
    "email": string,
    "phone": string,
    "password": string,
    "lname": string,
    "name": string,
    "sname": string,
    "birth_date": string,
    "reset_password_token": string,
    "confirm_phone_code": string,
    "gender_id": number
}
export interface AuthStore {
  user_data: Partial<UserData>
  status: Statuses,
}

export type AuthPayloadData = Partial<Omit<AuthStore, 'status'>>