import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { Button, Container, Typography } from '@mui/material'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <TopBar title="QRComer" />

      <Container maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Typography variant="h2" component="h2">
          QRComer
        </Typography>

        <Button
          variant="outlined"
          size="large"
          sx={{ mb: 2 }}
          onClick={() => navigate('/meals')}
        >
          Refecoes
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{ mb: 2 }}
          onClick={() => navigate('/lectures')}
        >
          Palestras
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{ mb: 2 }}
          onClick={() => navigate('/attendee')}
        >
          Participante
        </Button>

      </Container>
    </>
  )
}

export default HomePage
