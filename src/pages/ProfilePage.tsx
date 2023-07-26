import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clearAuthData, selectUserToken } from '../redux/slices'
import { useNavigate } from 'react-router'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectUserToken)
  const handleClick = () => {
    dispatch(clearAuthData)
    navigate('/')
  }

  if (!token) {
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
      <Typography variant="h4">Profile Page</Typography>
      <Button variant='contained' onClick={handleClick} sx={{ marinTop: 'auto' }}>Logout</Button>
    </Box>
  )
}

export default ProfilePage