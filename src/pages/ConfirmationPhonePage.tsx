import React, { useState } from 'react';
import { Typography, Button, Box, IconButton, FormHelperText, Container, Dialog, DialogContent, DialogActions, Link } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as SquareFlag } from '../app/assets/icons/content.svg';
import { ReactComponent as SquareLeft } from '../app/assets/icons/arrow_square-left.svg';
import Aside from '../components/Aside/Aside';
import CountdownTimer from '../components/CountDownTimer/CountDownTimer';
import { MuiInput } from '../app/ui-components';
import { Close } from '@mui/icons-material';
import { confirmPhoneAsync, selectUserPhone, selectUserToken } from '../redux/slices';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router';

const schema = z.object({
   confirm_phone_code: z.number().min(1, 'Код подтверждения не должен быть пустой!'),
})

type FormSchema = z.infer<typeof schema>

const ConfirmationPhonePage: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { isDirty, isSubmitting, errors },
   } = useForm<FormSchema>()

   const [open, setOpen] = React.useState(false);
   const token = useAppSelector(selectUserToken)
   const phone = useAppSelector(selectUserPhone)
   const [serverError, setServerError] = useState('')
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const onSubmit: SubmitHandler<FormSchema> = async (data) => {
      console.log({ data })
      if (!token) {
         setServerError("Token is empty")
      }
      try {
         await dispatch(confirmPhoneAsync({ token, confirm_phone_code: data.confirm_phone_code })).unwrap()
         handleClickOpen()
      } catch (error: any) {
         if ("message" in error)
            setServerError(error.message)
      }
   }

   if (!token) {
      navigate('/')
   }

   return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
         <Aside title="Регистрация пользователя" variantTitle="h5"
            description="Заполните информацию о себе, чтобы начать использовать все преимущества платформы"
         />
         <Box component="main" sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Container maxWidth="xs">
               <Box component="section" sx={{ textAlign: 'center', marginTop: '92px' }}>
                  <Typography variant="h6" sx={{ marginBottom: '16px' }}>Подтверждение телефона</Typography>
                  {serverError && <Box component="p" style={{ color: 'red' }}>{serverError}</Box>}
                  <Typography variant="body2"
                     sx={{ fontSize: '12px', lineHeight: 1, fontWeight: 500, color: 'grey', marginBottom: '32px' }}>
                     Мы отправили SMS с 6-значным кодом подтверждения на номер {phone}
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ textAlign: 'left' }}>
                     <Box sx={{ marginBottom: '32px' }}>
                        <MuiInput
                           id="confirm_phone_code" label="Sms-код"
                           placeholder="Укажите код подтвеждения"
                           registerProps={register('confirm_phone_code')}
                           type="number"
                        />
                        <CountdownTimer />
                        <FormHelperText error={Boolean(errors?.confirm_phone_code)}>
                           {errors.confirm_phone_code?.message || ''}
                        </FormHelperText>
                     </Box>
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || !isDirty}
                        fullWidth
                     >
                        Подтвердить
                     </Button>
                  </Box>
                  <Dialog open={open} onClose={handleClose} fullScreen>
                     <DialogContent
                        sx={{
                           background: 'linear-gradient(180deg, #8892FF 0%, #6D6BE5 18.75%)',
                           color: '#fff', maxWidth: 'none', maxHeight: 'none', display: 'flex',
                           flexDirection: 'column', gap: '48px', alignItems: 'center', justifyContent: 'center'
                        }}>
                        <SquareFlag />
                        <Typography variant="h6" sx={{ color: '#fff' }}>Телефон успешно подтвержден.</Typography>
                        <Button
                           component={Link}
                           href="/profile"
                        >
                           Перейти в Профиль пользователя
                        </Button>
                     </DialogContent>
                     <DialogActions sx={{ position: 'absolute', top: '12px', right: '12px' }}>
                        <IconButton onClick={handleClose}>
                           <Close />
                        </IconButton>
                     </DialogActions>
                  </Dialog>
               </Box>
            </Container>

            <Box sx={{
               display: 'flex', justifyContent: 'space-between',
               marginTop: 'auto', marginBottom: '24px'
            }}>
               <Button variant="outlined"
                  component={Link}
                  startIcon={<SquareLeft />}
                  href="/registration">
                  Назад
               </Button>
            </Box>
         </Box>
      </Box>
   );
};

export default ConfirmationPhonePage;
