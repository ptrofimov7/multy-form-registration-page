import { MenuItem, Select, Typography } from '@mui/material';

type MuiSelectProps = {
   id: string,
   data: Array<Record<string, any>>,
   label?: string,
   required?: boolean,
   placeholder?: string,
   disabled?: boolean,
   value: string | number,
   onChange: (value: string | number) => void,
   sx?: any,
   field?: Record<string, any>,
   error?: boolean,
   message?: string,
   defaultValue?: any,
}

const MuiSelect = ({ id, data, label, value, defaultValue, onChange, sx, disabled = false, field, placeholder = '', required = true, error = false, message = '' }: MuiSelectProps) => {
   return (
      <>
        <label htmlFor={id}>{label}{required && <sup style={{color: 'red'}}>*</sup>}</label>
         <Select
            id={id}
            sx={sx}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => {
               onChange(e.target.value)
            }}
            {...field}
            defaultValue={defaultValue}
         >
            {
               data.map(el => {
                  return (
                     <MenuItem key={el.value} value={el.value}>{el.label}</MenuItem>
                  )
               })
            }
         </Select>
         {error && <Typography color="error">{message}</Typography>}
      </>
   );
};

export default MuiSelect;