import React, { useState } from 'react'
import { FormControl, Button, Container, Typography, Box, Link, Dialog, DialogContent, DialogActions, InputAdornment, IconButton } from '@mui/material';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Close } from '@mui/icons-material';
import { ReactComponent as RedCircleIcon } from '../app/assets/icons/icon_circle-close-filled.svg'
import { ReactComponent as ArrowSquareLeft } from '../app/assets/icons/arrow_square-left.svg'
import Aside from '../components/Aside/Aside';
import { confirmPhoneSendSmsAsync, createProfileAsync, selectUserData, setAuthData } from '../redux/slices';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { MuiInput, Select } from '../app/ui-components';
import InputMask from 'react-input-mask';


interface CustomInputMaskProps {
   mask: string;
   maskChar: string
   // Add other props specific to your use case
}

const CustomInputMask: React.FC<CustomInputMaskProps> = ({ mask, maskChar, ...rest }) => {
   return <InputMask mask={mask} maskChar={maskChar} {...rest} />;
};

const schema = z.object({
   sname: z.string().nonempty('Фамилия - обязательное поле!'),
   name: z.string().nonempty('Имя - обязательное поле!'),
   lname: z.string().nonempty('Отчество - обязательное поле!'),
   birth_date: z.string().nonempty('Дата рождения - обязательное поле!'),
   gender_id: z.number(),
   phone: z.string().nonempty('Телефон - обязательное поле!'),
})

const GENDERS = [
   { label: "Мужской", value: 1 },
   { label: "Женский", value: 2 },
   { label: "Другой", value: 3 },
]

type FormSchema = z.infer<typeof schema>
export const RegisterPage: React.FC = () => {

   const {
      control,
      register,
      handleSubmit,
      getValues,
      formState: { isDirty, isSubmitting, errors },
   } = useForm<FormSchema>()
   const [open, setOpen] = React.useState(false);
   const [serverError, setServerError] = useState<string>('')
   const dispatch = useAppDispatch()
   const userData = useAppSelector(selectUserData)
   console.log({ userData });

   const token = userData.token
   const email = userData.email

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const navigate = useNavigate()

   const onSubmit: SubmitHandler<FormSchema> = async (data) => {
      console.log({ data })
      try {
         await dispatch(createProfileAsync({ token, body: data })).unwrap()
         navigate('/confirmationphone')
      } catch (error: any) {
         if ("message" in error) {
            setServerError(error.message)
         }
      }
   }

   const handleClickConfirmPhone = async () => {
      const phone = getValues('phone') || ''
      if (!token || !phone) {
         setServerError("Token or phone is empty")
         return
      }
      const formData = {
         user_data: {
            name: getValues("name"),
            lname: getValues("lname"),
            sname: getValues("sname"),
            birth_date: getValues("birth_date"),
            gender_id: getValues('gender_id')
         }
      }
      try {
         dispatch(setAuthData(formData))
         await dispatch(confirmPhoneSendSmsAsync({ token, phone })).unwrap()
         navigate('/confirmationphone')
      } catch (error: any) {
         console.log(error, '232');
         if ("message" in error)
            setServerError(error.message)
      }
   }

   if (!token) {
      navigate('/')
   }

   return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
         <Aside
            title="Регистрация пользователя" variantTitle='h5'
            description="Заполните информацию о себе, чтобы начать использовать все преимущества платформы" />
         <Box component="main" sx={{ flex: 1 }}>
            <Container maxWidth="sm" sx={{ height: '100%', marginLeft: '0' }}>
               <Box component="section" sx={{ height: '100%', overflow: 'hidden' }}>
                  <Typography variant="h6" sx={{ marginTop: '48px', marginBottom: '24px' }}>
                     Профиль пользователя
                  </Typography>
                  {serverError && <Box component="p" sx={{ color: 'red' }}>{serverError}</Box>}
                  <Box component="form" onSubmit={handleSubmit(onSubmit)}
                     sx={{ height: 'calc(100% - 100px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                     <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '24px' }}>
                        <MuiInput
                           id="sname" label="Фамилия"
                           placeholder="Укажите вашу фамилию"
                           registerProps={register('sname')}
                           type="text"
                           error={Boolean(errors?.sname)}
                           message={errors.sname?.message || ''}
                           defaultValue={userData.sname}
                        />

                        <MuiInput
                           id="name" label="Имя"
                           placeholder="Укажите ваше имя"
                           registerProps={register('name')}
                           type="text"
                           error={Boolean(errors?.name)}
                           message={errors.name?.message || ''}
                           defaultValue={userData.name}
                        />
                        <MuiInput
                           id="lname" label="Отчество"
                           placeholder="Укажите ваше отчество"
                           registerProps={register('lname')}
                           type="text"
                           error={Boolean(errors?.lname)}
                           message={errors.lname?.message || ''}
                           defaultValue={userData.lname}
                        />
                     </Box>

                     <MuiInput
                        id="birth_date" label="Дата рождения"
                        placeholder="YYYY-MM-DD"
                        registerProps={register('birth_date')}
                        type="text"
                        error={Boolean(errors?.birth_date)}
                        message={errors.birth_date?.message || ''}
                        inputComponent={CustomInputMask}
                        inputProps={{ mask: '9999-99-99', maskChar: '-' }}
                        defaultValue={userData.birth_date}
                     />

                     <FormControl fullWidth>
                        <Controller
                           name="gender_id"
                           control={control}
                           render={({ field: { ref, ...field } }) => {
                              return (
                                 <Select
                                    id="gender_id" label="Пол"
                                    placeholder='Укажите ваш пол' error={Boolean(errors.gender_id)}
                                    message={errors.gender_id?.message || ''}
                                    {...field}
                                    data={GENDERS}
                                    defaultValue={userData.gender_id}
                                 />)
                           }}
                        />
                     </FormControl>

                     <MuiInput
                        id="phone" label="Телефон"
                        placeholder="+38 (050) 725 60 09"
                        registerProps={register('phone')}
                        type="text"
                        error={Boolean(errors?.phone)}
                        message={errors.phone?.message || ''}
                        endAdornment={
                           <InputAdornment position="end">
                              <Link component="button" type="button"
                                 sx={{ fontSize: '12px', paddingRight: '8px', color: 'rgba(78, 90, 242, 1)' }}
                                 variant="body2" onClick={handleClickConfirmPhone}>Подтвердить телефон</Link>
                           </InputAdornment>
                        }
                        inputComponent={CustomInputMask}
                        inputProps={{ mask: '+38 (099) 999 99 99', maskChar: ' ' }}
                        defaultValue={userData.phone}
                     />
                     <MuiInput
                        id="email"
                        label="E-mail"
                        defaultValue={email}
                        placeholder="Укажите вашe почту"
                        disabled
                     />
                     <Box sx={{
                        display: 'flex', justifyContent: 'space-between',
                        marginTop: 'auto', marginBottom: '24px'
                     }}>
                        <Button variant="outlined" type="button" onClick={handleClickOpen}
                           startIcon={<ArrowSquareLeft />}>
                           Выход
                        </Button>
                        <Button variant="contained" type="submit" disabled={isSubmitting || !isDirty} >
                           Далее
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Container>
            <Dialog open={open} onClose={handleClose}>
               <DialogContent
                  sx={{
                     padding: '64px', display: 'flex', flexDirection: 'column',
                     justifyContent: 'center', gap: '24px', alignItems: 'center'
                  }}>
                  <RedCircleIcon />
                  <Box>
                     <Typography variant="h6" sx={{ marginBottom: '12px' }}>
                        Подтверждение выхода из аккаунта
                     </Typography>
                     <Typography variant="body1" sx={{ fontSize: '12px', lineHeight: 1.2 }}>
                        Вы действительно хотите выйти из своей учетной записи?
                     </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                     <Button variant="contained" onClick={handleClose}
                        sx={{ marginBottom: '12px', fontSize: '12px', }}>
                        Продолжить
                     </Button>
                     <Button variant="outlined"
                        sx={{
                           borderRadius: '20px', fontSize: '12px', border: '1px solid rgba(210, 216, 232, 1)',
                           color: 'rgba(141, 151, 176, 1)'
                        }} onClick={() => {
                           navigate('/')
                        }}>
                        Выйти
                     </Button>
                  </Box>
               </DialogContent>
               <DialogActions>
                  <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '12px', right: '12px' }}>
                     <Close />
                  </IconButton>
               </DialogActions>
            </Dialog>
         </Box>

      </Box>
   );
};

export default RegisterPage