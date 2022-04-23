import { Button, Card, Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import QrReader from 'react-qr-reader'
import SummaryAttendee from '../components/SummaryAttendee'
import TopBar from '../components/TopBar'
import { findOne } from '../services/attendee.service'

const AttendeePage = () => {
  const [code, setCode]  = useState(null)
  const [manualCode, setManualCode]  = useState(null)
  const [attendee, setAttendee]  = useState(null)
  const [error, setError]  = useState(null)
  const { t } = useTranslation()

  const isValidCode = shouldValidateCode({ code })

  useEffect(() => {
    isValidCode && findOne({
      attendee: code
    })
      .then(setAttendee)
      .catch(setError)
  }, [code, isValidCode])

  return (
    <>
      <TopBar />

      <Container
        sx={{ p: 2 }}
        maxWidth="md"
      >
        
        { !code &&
          <Card sx={{ textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{ mb: 3 }}
            >
              {t('redeem_page.title')}
            </Typography>

            <QrReader
              delay={300}
              onError={console.warn}
              onScan={setCode}
              style={{ width: '100%' }}
            />

            <Box sx={{ padding: 2 }}>
              <TextField
                id="outlined-basic"
                label="Código"
                variant="outlined"
                onChange={(e) => setManualCode(e.target.value)}
                sx={{ mr: 2 }}
              />

              <Button
                variant="contained"
                color="success"
                onClick={() => setCode(`COMIC2022-${manualCode}`)}
              >
                Enviar
              </Button>
            </Box>

          </Card>
        }
      </Container>

      {
        attendee && (
          <SummaryAttendee attendee={attendee}/>
        )
      }

      {
        error && (
          <Typography
            variant="h5"
            sx={{ mb: 3 }}
          >
            { error.message }
          </Typography>
        )
      }
    </>
  )
}

export default AttendeePage

const shouldValidateCode = ({ code }) => {
  if (!code) return
  return /^COMIC2022.*$/.test(code)
}