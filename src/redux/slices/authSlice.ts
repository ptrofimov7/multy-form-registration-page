import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthPayloadData, AuthStore } from '../types';
import { authService } from '../../api/registration';

const initialState: AuthStore = {
  user_data: {
    "id": 0,
    "token": '',
    "is_confirm_email": 0,
    "is_confirm_phone": 0,
    "is_profile_created": 0,
    "email": '',
    "phone": '',
    "password": '',
    "lname": '',
    "name": '',
    "sname": '',
    "birth_date": '',
    "reset_password_token": '',
    "confirm_phone_code": '',
    "gender_id": 0
  },
  status: 'idle',
};

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async ({ email, password, ref }: any) => {
    const response = await authService.signUp({ email, password, ref });
    const data = response.data
    const token = data.user_data.token
    return {
      token,
      email
    }
  }
);

export const confirmPhoneAsync = createAsyncThunk(
  'auth/confirmPhoneAsync',
  async ({ token, confirm_phone_code }: any) => {
    await authService.confirmPhone(token, { confirm_phone_code });
    return {
      confirm_phone_code
    }
  }
);

export const confirmPhoneSendSmsAsync = createAsyncThunk(
  'auth/confirmPhoneSendSmsAsync',
  async ({ token, phone }: any) => {
    await authService.confirmPhoneSendSms(token, { phone });
    return { phone }
  }
);

export const createProfileAsync = createAsyncThunk(
  'auth/createProfileAsync',
  async ({ token, body }: any) => {
    const response = await authService.profileCreate(token, body);
    console.log({ phone12: response.data.user_data.phone });
    return response.data.user_data
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthPayloadData>) => {
      state.user_data = { ...state.user_data, ...(action.payload.user_data || {}) }
    },
    clearAuthData: (state) => {
      state.user_data = initialState.user_data
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.user_data = { ...state.user_data, ...(action.payload || {}) }
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(createProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProfileAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.user_data = { ...state.user_data, ...(action.payload || {}) }
      })
      .addCase(createProfileAsync.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(confirmPhoneAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmPhoneAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.user_data = { ...state.user_data, ...(action.payload || {}) }
      })
      .addCase(confirmPhoneAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(confirmPhoneSendSmsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmPhoneSendSmsAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.user_data = { ...state.user_data, ...(action.payload || {}) }
      })
      .addCase(confirmPhoneSendSmsAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export const selectUserToken = (state: RootState) => state.auth.user_data.token;
export const selectUserName = (state: RootState) => state.auth.user_data.name;
export const selectUserEmail = (state: RootState) => state.auth.user_data.email;
export const selectUserPhone = (state: RootState) => state.auth.user_data.phone;
export const selectUserConfirmCodePhone = (state: RootState) => state.auth.user_data.confirm_phone_code;
export const selectUserData = (state: RootState) => state.auth.user_data

export default authSlice.reducer;
