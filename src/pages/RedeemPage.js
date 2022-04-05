import { Alert, Button, Card, CardActions, CardContent, Container, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TopBar from '../components/TopBar'
import QrReader from 'react-qr-reader'
import { redeem, findOne } from '../services/services.service'
import { useParams } from 'react-router-dom'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const RedeemPage = () => {
  const { t } = useTranslation()
  
  const [code, setCode]  = useState(null)
  const [service, setService]  = useState(null)
  const [isSuccess, setIsSuccess]  = useState(null)
  
  const isRedeemable = shouldRedeem({ service })
  const isValidCode = shouldValidateCode({ code })
  const { appointment } = useParams();
  
  useEffect(() => {
    isValidCode && findOne({ 
      attendee: code,
      appointment,
    })
      .then(setService)
      .catch(console.warn)
  }, [code, appointment, isValidCode])

  function handleRedeem() {
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
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('redeem_page.unavailable_title')}
                </Typography>

                <RemoveCircleOutlineOutlinedIcon color="warning" sx={{ fontSize: 300}} />

                <Typography variant="body2" color="text.secondary">
                  {t('redeem_page.unavailable_text', {
                    attendee: service.attendee.name,
                    appointment: service.appointment.title
                  })}
                </Typography> 
              </CardContent>
              
              <CardActions>
                <Button onClick={() => reset()}>{t('redeem_page.new_reading')}</Button>
              </CardActions>
            </Card>
          )
        }

        {
          isRedeemable && (
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('redeem_page.available')}
                </Typography>

                <CheckCircleOutlineOutlinedIcon color="success" sx={{ fontSize: 300}} />

                <Typography variant="body2" color="text.secondary">
                  {t('redeem_page.available_text', {
                    attendee: service.attendee.name,
                    appointment: service.appointment.title
                  })}
                </Typography> 
              </CardContent>
              
              <CardActions>
                <Button onClick={() => handleRedeem()}>
                  {t('redeem_page.register_service')}
                </Button>
              </CardActions>
            </Card>
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

const shouldRedeem = ({ service }) => {
  if (!service) return
  return service.isRedeemed === false
}