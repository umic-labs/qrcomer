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
      
      <div className='attendee-info'>
        <Typography variant="h4"> {attendee.name} </Typography>
        <Typography> {attendee.code} </Typography>
      </div>

      <div className='attende-service'>
        <Typography> {attendee.hasLectures && t('summary_attendee.has_lectures')} </Typography>
        <Typography> {attendee.hasMeals && t('summary_attendee.has_meals')} </Typography>
      </div>

      <div className='services-info'>
        <Typography variant="h6"> {t('summary_attendee.meals')} </Typography>
        <ul>
          {
            meals.map((service) => (
              <li
                className="service" 
                key={service.id}
              >
                {service.appointment?.title}{service.isRedeemed && ` - ✅`}
              </li>
            ))
          }
        </ul>
      </div>

      <div className='services-info'>
        <Typography variant="h6"> {t('summary_attendee.lectures')} </Typography>
        <ul>
          {
            lectures.map((service) => (
              <li
                className="service" 
                key={service.id}
              >
                {service.appointment?.title}{service.isRedeemed && ` - ✅`}
              </li>
            ))
          }
        </ul>
      </div>
      
      <div className='services-info'>
        <Typography variant="h6"> {t('summary_attendee.workshops')} </Typography>
        <ul>
          {
            workshops.map((service) => (
              <li
                className="service" 
                key={service.id}
              >
                {service.appointment?.title}{service.isRedeemed && ` - ✅`}
              </li>
            ))
          }
        </ul>
      </div>

    </Paper>
  )
}


function composeServicesByType({ services, type }) {
  if (!services || !type) return []
  return services.filter((service) => service?.appointment?.type ===  type)
}