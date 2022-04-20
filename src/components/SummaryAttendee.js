import { Paper, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SummaryAttendee({ attendee }) {
  const { t } = useTranslation()

  const lectures = composeServicesByType({ services: attendee.services, type: 'lecture' })
  const meals = composeServicesByType({ services: attendee.services, type: 'meal' })
  const workshops = composeServicesByType({ services: attendee.services, type: 'workshop' })

  return (
    <Paper sx={{ padding: 2 }}>
     
      <Typography variant="h4"> {attendee.name} </Typography>
      <Typography> {attendee.code} </Typography>

      <Typography> {attendee.hasLectures && t('summary_attendee.has_lectures')} </Typography>
      <Typography> {attendee.hasMeals && t('summary_attendee.has_meals')} </Typography>



      <Typography variant="h6"> {t('summary_attendee.meals')} </Typography>
      <ul>
        {
          meals.map((service) => (
            <li>{service.appointment?.title} - {service.isRedeemed && `resgatado`}</li>
          ))
        }
      </ul>

      <Typography variant="h6"> {t('summary_attendee.lectures')} </Typography>
      <ul>
        {
          lectures.map((service) => (
            <li>{service.appointment?.title} - {service.isRedeemed && `resgatado`}</li>
          ))
        }
      </ul>
      
      <Typography variant="h6"> {t('summary_attendee.workshops')} </Typography>
      <ul>
        {
          workshops.map((service) => (
            <li>{service.appointment?.title} - {service.isRedeemed && `resgatado`}</li>
          ))
        }
      </ul>

    </Paper>
  )
}


function composeServicesByType({ services, type }) {
  if (!services || !type) return []
  return services.filter((service) => service?.appointment?.type ===  type)
}