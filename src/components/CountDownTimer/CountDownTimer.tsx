import { Box, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ReactComponent as TimerIcon } from '../../app/assets/icons/timer.svg'
import { confirmPhoneSendSmsAsync, selectUserPhone, selectUserToken } from '../../redux/slices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { formatTimeFromSeconds } from '../../app/helpers';

const initialTime = 180

const CountdownTimer: React.FC = () => {
   const [remainingTime, setRemainingTime] = useState<number>(initialTime);
   const [timerActive, setTimerActive] = useState<boolean>(true);
   const [serverError, setServerError] = useState('')
   const dispatch = useAppDispatch()
   const token = useAppSelector(selectUserToken)
   const phone = useAppSelector(selectUserPhone)

   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (timerActive && remainingTime > 0) {
         interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
         }, 1000);
      } else if (remainingTime === 0) {
         setTimerActive(false);
      }

      return () => clearInterval(interval);
   }, [remainingTime, timerActive]);

   const handleResendCode = async () => {
      if (!token || !phone) {
         setServerError("Token or phone is empty")
      }
      try {
         await dispatch(confirmPhoneSendSmsAsync({ token, phone })).unwrap()
         setRemainingTime(initialTime);
         setTimerActive(true);
      } catch (error: any) {
         if ("message" in error)
            setServerError(error.message)
      }
   };

   return (
      <Box sx={{ fontSize: '12px', lineHeight: 2, fontWeight: 600, textAlign: 'right' }}>
         {timerActive ? (
            <Box
               sx={{
                  display: 'flex', justifyContent: 'flex-end', marginTop: 0,
                  color: 'rgba(141, 151, 176, 1)', alignItems: 'center', gap: '4px'
               }}>
               <TimerIcon />{formatTimeFromSeconds(remainingTime)}</Box>
         ) : (
            <Link
               component="button"
               variant="body2"
               onClick={handleResendCode}
               sx={{ color: 'rgba(56, 67, 237, 1)', fontSize: '12px', lineHeight: 2, fontWeight: 600, }}
            >
               Отправить код повторно
            </Link>
         )}
         {serverError && <p>{serverError}</p>}
      </Box>
   );
};

export default CountdownTimer;
