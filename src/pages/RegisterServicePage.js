import { Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TopBar from '../components/TopBar'
import QrReader from 'react-qr-reader'
import { update } from '../services/services.service'
import { useLocation } from 'react-router-dom'

const RegisterServicePage = () => {
  const [code, setCode]  = useState(null)
  const { t } = useTranslation()
  const location  = useLocation()
  
  const params = useMemo(() => new URLSearchParams(location.search), [location])
  
  useEffect(() => {
    shouldValidateCode({ code }) && update({ 
      attendee: code,
      lecture: params.get('lecture'),
      meal: params.get('meal')

    })
  }, [code, params])

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

        <p>{ code }</p>

        { !!code && !shouldValidateCode({ code }) &&
          <>
            <p>Codigo invalido</p>

            <Button onClick={() => setCode(null)}>Ler novamente</Button>
          </>
        }

      </Container>
    </>
  )
}

export default RegisterServicePage

const shouldValidateCode = ({ code }) => {
  if (!code) return
  return /^COMIC2022.*$/.test(code)
}