import { Card, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import QrReader from 'react-qr-reader'
import SummaryAttendee from '../components/SummaryAttendee'
import TopBar from '../components/TopBar'
import { findOne } from '../services/attendee.service'

const AttendeePage = () => {
  const [code, setCode]  = useState(null)
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
          </Card>
        }
      </Container>

      {
        attendee && (
          <SummaryAttendee attendee={attendee}/>
        )
      }
    </>
  )
}

export default AttendeePage

function mockAttendee() {
  return {
    "id": 35,
    "name": "Monica",
    "code": "COMIC2022-d29a0f4a",
    "createdAt": "2022-04-20T03:38:02.426Z",
    "updatedAt": "2022-04-20T03:38:02.426Z",
    "registrationCode": "123",
    "qrCodeUrl": "https://api.qrserver.com/v1/create-qr-code/?size=750x750&data=COMIC2022-d29a0f4a",
    "hasLectures": true,
    "hasMeals": true,
    "services": [
        {
            "id": 105,
            "createdAt": "2022-04-20T03:38:02.450Z",
            "updatedAt": "2022-04-20T03:38:02.450Z",
            "isRedeemed": true,
            "appointment": {
                "id": 11,
                "title": "culto",
                "Description": null,
                "date": "2022-04-22T21:30:00.000Z",
                "type": "lecture",
                "createdAt": "2022-04-20T01:56:42.060Z",
                "updatedAt": "2022-04-20T01:56:52.575Z"
            }
        },
        {
            "id": 106,
            "createdAt": "2022-04-20T03:38:02.450Z",
            "updatedAt": "2022-04-20T03:38:02.450Z",
            "isRedeemed": false,
            "appointment": {
                "id": 12,
                "title": "ceia",
                "Description": null,
                "date": "2022-04-23T03:00:00.000Z",
                "type": "lecture",
                "createdAt": "2022-04-20T02:11:18.436Z",
                "updatedAt": "2022-04-20T02:11:18.436Z"
            }
        },
        {
            "id": 107,
            "createdAt": "2022-04-20T03:38:02.450Z",
            "updatedAt": "2022-04-20T03:38:02.450Z",
            "isRedeemed": false,
            "appointment": {
                "id": 13,
                "title": "almoco",
                "Description": null,
                "date": "2022-04-22T03:00:00.000Z",
                "type": "meal",
                "createdAt": "2022-04-20T02:11:36.016Z",
                "updatedAt": "2022-04-20T02:11:36.016Z"
            }
        },
        {
            "id": 108,
            "createdAt": "2022-04-20T03:38:02.450Z",
            "updatedAt": "2022-04-20T03:38:02.450Z",
            "isRedeemed": false,
            "appointment": {
                "id": 14,
                "title": "janta",
                "Description": null,
                "date": "2022-04-23T03:00:00.000Z",
                "type": "meal",
                "createdAt": "2022-04-20T02:11:47.044Z",
                "updatedAt": "2022-04-20T02:11:47.044Z"
            }
        },
        {
            "id": 109,
            "createdAt": "2022-04-20T03:38:13.980Z",
            "updatedAt": "2022-04-20T03:38:13.980Z",
            "isRedeemed": false,
            "appointment": {
                "id": 15,
                "title": "workshop joaao",
                "Description": null,
                "date": "2022-04-23T03:00:00.000Z",
                "type": "workshop",
                "createdAt": "2022-04-20T02:12:29.062Z",
                "updatedAt": "2022-04-20T02:12:29.062Z"
            }
        },
        {
            "id": 110,
            "createdAt": "2022-04-20T03:38:24.045Z",
            "updatedAt": "2022-04-20T03:38:24.045Z",
            "isRedeemed": false,
            "appointment": {
                "id": 16,
                "title": "workshop maira",
                "Description": null,
                "date": "2022-04-23T03:00:00.000Z",
                "type": "workshop",
                "createdAt": "2022-04-20T02:12:44.927Z",
                "updatedAt": "2022-04-20T02:12:44.927Z"
            }
        }
    ]
}
}


const shouldValidateCode = ({ code }) => {
  if (!code) return
  return /^COMIC2022.*$/.test(code)
}