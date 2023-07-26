import { FormControl, FormHelperText, TextField } from '@mui/material';
import { ReactElement } from 'react';

type MuiInputProps = {
   type?: string,
   label: string,
   id: string,
   placeholder: string,
   disabled?: boolean,
   sx?: any,
   required?: boolean,
   error?: boolean,
   message?: string,
   endAdornment?: ReactElement,
   startAdornment?: ReactElement,
   registerProps?: Record<string, any>,
   inputComponent?: any,
   defaultValue?: any,
   inputProps?: any,
}

const MuiInput = ({ type = 'text', id, label, placeholder='', inputComponent, inputProps, registerProps={}, sx, disabled = false, error = false, required = true, startAdornment, endAdornment, message = '', defaultValue }: MuiInputProps) => {
   return (
      <FormControl fullWidth disabled={disabled} >
         <label htmlFor={id}>{label}{required && <sup style={{color: 'red'}}>*</sup>}</label>
         <TextField type={type} variant='standard'
            placeholder={placeholder}
            id={id}
            {...registerProps}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
            error={error}
            inputProps={inputProps}
            InputProps={{
               endAdornment,
               startAdornment,
               inputComponent,
            }}
         />
         <FormHelperText error={error}>
            {message || ''}
         </FormHelperText>
      </FormControl>
   );
};

export default MuiInput;