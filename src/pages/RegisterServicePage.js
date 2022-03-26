import { Alert, Button, Container, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TopBar from '../components/TopBar'
import QrReader from 'react-qr-reader'
import { registerPresence, findOne } from '../services/services.service'
import { useLocation } from 'react-router-dom'

const RegisterServicePage = () => {
  const { t } = useTranslation()
  const location  = useLocation()
  
  const [code, setCode]  = useState(null)
  const [service, setService]  = useState(null)
  const [isSuccess, setIsSuccess]  = useState(null)
  const params = useMemo(() => new URLSearchParams(location.search), [location])
  
  const hasRegisterPresence = shouldRegisterPresence({ service })
  const isValidCode = shouldValidateCode({ code })
  const lecture = params.get('lecture')
  const meal = params.get('meal')
  
  useEffect(() => {
    isValidCode && findOne({ 
      attendee: code,
      lecture,
      meal
    })
      .then(setService)
      .catch(console.warn)
  }, [code, meal, lecture, isValidCode])

  function handleRegisterPresence() {
    registerPresence({ 
      attendee: code,
      lecture,
      meal
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
          {t('register_service_page.title')}
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
          service?.present && (
            <>
              <p>{t('register_service_page.unavailable')}</p> 
              <Button onClick={() => reset()}>{t('register_service_page.new_reading')}</Button>
            </>
          )
        }

        {
          hasRegisterPresence && (
            <>
              <p>{t('register_service_page.available')}</p> 
              <Button onClick={() => handleRegisterPresence()}>
                {t('register_service_page.register_service')}
              </Button>
            </>
          )
        }

        { !!code && !isValidCode &&
          <>
            <p>{t('register_service_page.invalid_code')}</p>

            <Button onClick={() => reset()}>{t('register_service_page.read_again')}</Button>
          </>
        }

        <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {t('register_service_page.register_success')}
          </Alert>
        </Snackbar>

        <Snackbar open={isSuccess === false} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {t('register_service_page.register_failure')}
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}

export default RegisterServicePage

const shouldValidateCode = ({ code }) => {
  if (!code) return
  return /^COMIC2022.*$/.test(code)
}

const shouldRegisterPresence = ({ service }) => {
  if (!service) return
  return service.present === false
}