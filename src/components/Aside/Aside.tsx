import { Box, Typography } from '@mui/material'
import backgroundImage from '../../app/assets/images/bg-image-aside.svg';
import { ReactNode } from 'react';
import { Variant } from '@mui/material/styles/createTypography';

type AsideProps = {
  title: string,
  variantTitle?: Variant,
  variantBody?: Variant,
  description: string,
  children?: ReactNode,
}

const Aside = ({ title, description, children, variantTitle = 'h4', variantBody = 'body1' }: AsideProps) => {
  return (
    <Box component="aside"
      sx={{
        position: 'relative', flex: '0 0 calc(600 * 100% / 1464)', height: '100%',
        background: 'linear-gradient(180deg, #8892FF 0%, #6D6BE5 18.75%)',
        color: '#fff',

        padding: {
          '@media (max-width: 361px)': {
            padding: '42px 42px 0px 42px',
          },
          xs: '42px 42px 0px 42px',
          lg: `${variantTitle === 'h4' ? '92px 42px 0px 64px' : '48px 168px 0px 64px'}`
        },

        display: {
          '@media (max-width: 361px)': {
            display: 'none',
          },
          xs: 'none',
          sm: 'block'
        },
        textAlign: 'left'
      }}>
      <Box component="section">
        <Typography variant={variantTitle} sx={{ marginBottom: '24px', color: '#fff' }}>{title}</Typography>
        <Typography variant={variantBody} sx={{
          marginBottom: {
            '@media (max-width: 361px)': {
              marginBottom: '24px',
            },
            xs: '24px',
            lg: `72px`
          }
        }}>
          {description}
        </Typography>
        {children && <Box sx={{
          fontWeight: 400,
          fontSize: 18,
          lineHeight: '24px',
          letterSpacing: '0em',
        }}>
          {children}
        </Box>}
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: { xs: '0', sm: '250px', md: '339px', lg: '430px' }, }}>
        <Box sx={{ backgroundImage: `url(${backgroundImage})`, height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom' }} />
      </Box>
    </Box>
  )
}

export default Aside