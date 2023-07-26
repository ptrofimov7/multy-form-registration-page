
export type RequestBodySendSms =
  {
    "phone": string
  }

export type RequestBodyPhoneConfirm = { "confirm_phone_code": number }

export type RequestBodyProfileCreate = { "birth_date": string, "lname": string, "name": string, "sname": string, "phone": string, "gender_id": number }

export type SignupBody =  { email: string, password: string, ref: string }
