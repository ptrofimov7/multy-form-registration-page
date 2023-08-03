import React, { ComponentType, useState } from 'react'
import Header from '../components/Header'
import { MuiInput } from '../app/ui-components'
import { IconButton, InputAdornment, Button, Container, Typography, Box, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogContent, DialogActions } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as OpenEyeIcon } from '../app/assets/icons/icon_eye.svg';
import { ReactComponent as CloseEyeIcon } from '../app/assets/icons/icon_eye-close.svg';
import { ReactComponent as KeyIcon } from '../app/assets/icons/icon_key-fill.svg';
import { ReactComponent as TickIcon } from '../app/assets/icons/tick_square-light.svg';
import { ReactComponent as Close } from '../app/assets/icons/close.svg';
import { ReactComponent as Facebook } from '../app/assets/icons/facebook.svg';
import { ReactComponent as Google } from '../app/assets/icons/google.svg';
import { ReactComponent as LinkedIn } from '../app/assets/icons/linkedin.svg';
import { ReactComponent as SquareFlag } from '../app/assets/icons/content.svg';
import Aside from '../components/Aside/Aside';
import { registerAsync } from '../redux/slices';
import { useAppDispatch } from '../redux/hooks';

type FormData = {
  email: string,
  password: string,
  confirmPassword: string,
}

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(14, 'Пароль должен содержать максимум 14 символов')
    .regex(/[a-z]/, 'Пароль должен содержать строчные буквы')
    .regex(/[A-Z]/, 'Пароль должен содержать заглавные буквы'),
  confirmPassword: z.string().min(8, 'Подтверждение пароля должен содержать минимум 8 символов')
    .max(14, 'Подтверждение пароля должен содержать максимум 14 символов')
}).refine((data: FormData) => data.confirmPassword === data.password, {
  message: 'Пароли не совпадают',
  path: ['confirm_password'],
})
type FormSchema = z.infer<typeof schema>

const listItems = [
  "Автоматизация HR", "Интеграция с job-порталами", "Оценка персонала",
  "Синхронизация с Outlook", "Безопасность данных", "Мультиязычность",
  "Парсинг резюме", "Конструктор отчетности"
]

const socialIcons = [
  Google,
  Facebook,
  LinkedIn
]
console.log({ ENV: process.env.NODE_ENV});

const REDIRECT_URL = process.env.NODE_ENV  === 'production' ? 'https://multy-form-registration-page-odkf69bql-ptrofimov7.vercel.app/' : 'http://localhost:3000/registration'

export const LoginPegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    confirmPassword: false,
    password: false
  })

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>()

  const [serverError, setServerError] = useState<string>('')
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => ({ ...prev, password: !prev.password }));
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }));
  };

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log({ data })
    try {
      await dispatch(registerAsync({ email: data.email, password: data.password, ref: REDIRECT_URL })).unwrap()
      handleClickOpen()
    } catch (error: any) {
      if ("message" in error) {
        setServerError(error.message)
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header />
      <Aside title="Войти в аккаунт" description="Введите ваш E-mail и пароль, чтобы начать использовать все преимущества платформы:">
        <List sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridRowGap: 24 }}>
          {listItems.map(title => (
            <ListItem key={title} sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: '32px' }}>
                <TickIcon color='green' />
              </ListItemIcon>
              <ListItemText secondary={title} sx={{
                margin: 0, '& p': {
                  color: '#fff'
                }
              }} />
            </ListItem>
          ))}
        </List>
      </Aside>
      <Box component="main" sx={{ flex: 1}}>
        <Container maxWidth="sm" sx={{ marginTop: '92px' }}>
          <Box sx={{ width: '100%' }}>
            <Tabs value={1} centered sx={{
              '& .MuiTabs-indicator': {
                background: 'rgba(78, 90, 242, 1)', height: '4px'
              }
            }}>
              <Tab label="Вход" sx={{ textTransform: 'none' }} />
              <Tab label="Регистрация" sx={{ textTransform: 'none' }} />
            </Tabs>
          </Box>
          <Box sx={{ maxWidth: '400px', marginTop: '48px', marginInline: 'auto' }}>
            {serverError && <Box component="p" sx={{ color: 'red' }}>{serverError}</Box>}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <MuiInput id="email" label="E-mail" placeholder="Укажите почту" registerProps={register('email')} />
              <MuiInput
                id="password" label="Придумайте пароль"
                placeholder="Укажите ваш пароль"
                registerProps={register('password')}
                type={showPassword.password ? 'text' : 'password'}
                error={Boolean(errors?.password)}
                message={errors.password?.message || ''}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword.password ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </IconButton>
                    <IconButton>
                      <KeyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />

              <MuiInput
                id="confirmPassword" label="Повторите Пароль"
                placeholder="Повторите ваш пароль"
                registerProps={register('confirmPassword')}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                error={Boolean(errors?.confirmPassword)}
                message={errors.confirmPassword?.message || ''}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                      {showPassword.confirmPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </IconButton>
                  </InputAdornment>
                }

              />

              <Button type="submit" variant="contained" color="primary"
              disabled={isSubmitting || !isDirty} fullWidth>
                <b>Зарегистрировать</b>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBlock: '32px' }}>
              <Typography variant="body2" sx={{
                position: 'relative',
                width: '100%',
                textAlign: 'center',
                color: 'rgba(141, 151, 176, 1)',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  height: '1px',
                  width: '20%',
                  backgroundColor: 'rgba(141, 151, 176, 1)',
                },
                '&::before': {
                  left: 0,
                },
                '&::after': {
                  right: 0,
                },
              }}>
                Или войдите с помощью
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', mt: 2, width: '100%', gap: '12px' }}>
              {socialIcons.map((Component: ComponentType, index: number) => (
                <IconButton key={index} color="inherit" sx={{ padding: '8px 40px',
                border: '1px solid #D2D8E8', flex: 1, borderRadius: 0, bgcolor: '#fff' }}>
                  <Component />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Container>
        <Dialog open={open} onClose={handleClose} fullScreen sx={{ textAlign: 'center'}}>
          <DialogContent sx={{background: 'linear-gradient(180deg, #8892FF 0%, #6D6BE5 18.75%)',
          color: '#fff', maxWidth: 'none', maxHeight: 'none', display: 'flex',
          flexDirection: 'column', gap: '48px', alignItems: 'center', justifyContent: 'center'}}>
            <SquareFlag />
            <Typography variant="body1" sx={{ textAlign: 'center', lineHeight: '24px' }}>
              Аккаунт был успешно зарегистрирован. <br/>На ваш E-Mail отправлено письмо с ссылкой для подтверждения
              </Typography>
          </DialogContent>
          <DialogActions sx={{position: 'absolute', top: '12px', right: '12px'}}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </DialogActions>
        </Dialog>
      </Box >
    </Box >
  );
};


export default LoginPegisterPage