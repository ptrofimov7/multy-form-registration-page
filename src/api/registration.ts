import { axiosInstance } from "./instance";
import { RequestBodyPhoneConfirm, RequestBodyProfileCreate, RequestBodySendSms, SignupBody } from "./types";
import md5 from 'md5';

class AuthService {

  async signUp(body: SignupBody) {
    body.password = md5(body.password);
    const response = await axiosInstance.post('/registration', body);
    if (response.data.msg) {
      throw new Error(response.data.msg)
    }
    return response;
    // {
    //   "status": string "success",
    //   "msg": string "",
    //   "user_data":
    //   {
    //       "token": string
    //   }
  }

  async confirmPhoneSendSms(userToken: string, body: RequestBodySendSms) {
    const response = await axiosInstance.post('/confirmPhoneSendSms', body, {
      headers: {
        userToken
      }
    });
    if (response.data?.msg) {
      throw new Error(response.data.msg)
    }
    return response;
    // {
    //             "status": "success",
    //             "msg": ""
    // }
  }


  async profileCreate(userToken: string, body: RequestBodyProfileCreate) {
    const response = await axiosInstance.post('/profileCreate', body, {
      headers: {
        userToken
      }
    });
    if (response.data?.msg) {
      throw new Error(response.data.msg)
    }
    return response;
    // {
    //   "status": "success",
    //   "msg": "",
    //   "user_data": {
    //       "id": int,
    //       "token": string,
    //       "is_confirm_email": int,
    //       "is_confirm_phone": int,
    //       "is_profile_created": int,
    //       "email": string,
    //       "phone": string,
    //       "password": string,
    //       "lname": string,
    //       "name": string,
    //       "sname": string,
    //       "birth_date": string,
    //       "reset_password_token": string,
    //       "confirm_phone_code": string,
    //       "gender_id": int
    //   }
    //}
  }


  async confirmPhone(userToken: string, body: RequestBodyPhoneConfirm) {
    const response = await axiosInstance.post('/confirmPhone', body, {
      headers: {
        userToken
      }
    });
    if (response.data?.msg) {
      throw new Error(response.data.msg)
    }
    return response;
    // {
    //             "status": "success",
    //             "msg": ""
    // }
  }
}

export const authService = new AuthService();

