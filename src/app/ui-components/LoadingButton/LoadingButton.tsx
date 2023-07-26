import React, { ReactNode } from 'react';
import Loader from '../Loader/Loader';
import { Button } from '@mui/material';

type MuiLoadingButtonProps = {
   children: ReactNode,
   color?: any,
   variant?: any,
   disabled?: boolean,
   loading?: boolean,
   onClick: (e: any) => void
}

const MUILoadingButton = ({ children, onClick, color = 'default',  variant = "default", disabled = false, loading = false}: MuiLoadingButtonProps) => {
   return (
      <Button
         variant={variant}
         onClick={onClick}
         color={color}
         disabled={loading || disabled}
         startIcon={loading && <Loader />} // Иконка загрузки в конце кнопки
      >{children}
      </Button>
   );
};

export default MUILoadingButton;