import { Alert, Button, Container, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TopBar from '../components/TopBar'
import QrReader from 'react-qr-reader'
import { redeem, findOne } from '../services/services.service'
import { useParams } from 'react-router-dom'

const RedeemPage = () => {
  const { t } = useTranslation()
  
  const [code, setCode]  = useState(null)
  const [service, setService]  = useState(null)
  const [isSuccess, setIsSuccess]  = useState(null)
  
  const hasRegisterPresence = shouldRegisterPresence({ service })
  const isValidCode = shouldValidateCode({ code })
  const { appointment } = useParams();
  
  useEffect(() => {

    console.log({ appointment })

    isValidCode && findOne({ 
      attendee: code,
      appointment,
    })
      .then(setService)
      .catch(console.warn)
  }, [code, appointment, isValidCode])

  function handleRegisterPresence() {
    redeem({ 
      attendee: code,
      appointment,
    })
      .then(() => setIsSuccess(true))
      .catch(console.warn)
      .finally(() => reset())
  }

  function reset() {
    setCode(null)
    setService(null)
  }

  function handleClose() {
    setIsSuccess(null)
  }

  return (
    <>
      <TopBar />

      <Container
        sx={{ p: 2 }}
        maxWidth="md"
      >
        <Typography
          variant="h5"
          sx={{ mb: 3 }}
        >
          {t('redeem_page.title')}
        </Typography>
        
        { !code &&
          <QrReader
            delay={300}
            onError={console.warn}
            onScan={setCode}
            style={{ width: '100%' }}
          />
        }

        {
          service?.isRedeemed && (
            <>
              <p>{t('redeem_page.unavailable')}</p> 
              <Button onClick={() => reset()}>{t('redeem_page.new_reading')}</Button>
            </>
          )
        }

        {
          hasRegisterPresence && (
            <>
              <p>{t('redeem_page.available')}</p> 
              <Button onClick={() => handleRegisterPresence()}>
                {t('redeem_page.register_service')}
              </Button>
            </>
          )
        }

        { !!code && !isValidCode &&
          <>
            <p>{t('redeem_page.invalid_code')}</p>

            <Button onClick={() => reset()}>{t('redeem_page.read_again')}</Button>
          </>
        }

        <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {t('redeem_page.register_success')}
          </Alert>
        </Snackbar>

        <Snackbar open={isSuccess === false} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {t('redeem_page.register_failure')}
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}

export default RedeemPage

const shouldValidateCode = ({ code }) => {
  if (!code) return
  return /^COMIC2022.*$/.test(code)
}

const shouldRegisterPresence = ({ service }) => {
  if (!service) return
  return service.isRedeemed === false
}