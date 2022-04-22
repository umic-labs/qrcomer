import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import TopBar from '../components/TopBar'
import { fetch } from '../services/appointments.service'

const AppointmentsPage = ({ type }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch({ type }).then(setAppointments)
  }, [type])

  const appointmentsByDate = composeAppointmentsByDate({ appointments })

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
          {t(`appointments_page.redeem_${type}`)}
        </Typography>

          {
            appointmentsByDate?.map(day => (
              <Box key={day.date} sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb:1 }}
                >
                  { composeDateTitle({ date: day.date }) }
                </Typography>

                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      {
                        day.appointments?.map(appointment => (
                          <div key={appointment.id}>
                            <ListItem disablePadding>
                              <ListItemButton
                                onClick={() => navigate(`/redeem/${appointment.id}`)}
                              >
                                <ListItemText primary={appointment.title} />
                              </ListItemButton>
                            </ListItem>

                            <Divider />
                          </div>
                        ))
                      }
                    </List>
                  </nav>
                </Box>
              </Box>
            ))
          }
      </Container>
    </>
  )
}

export default AppointmentsPage

const composeAppointmentsByDate = ({ appointments }) => {
  if(!appointments) return

  const uniqueDates = [...new Set(appointments.map(appointment => getDayMonthAndYearFromDate(appointment.date)))]

  return uniqueDates.map(date => (
    {
      date: date,
      appointments: appointments.filter((appointment) => 
        getDayMonthAndYearFromDate(appointment.date) === getDayMonthAndYearFromDate(date))
    }
  ))
}

const getDayMonthAndYearFromDate = date => String(date).split('T')[0]

const composeDateTitle = ({ date }) => {
  if (!date) return
  return new Date(date).toLocaleDateString("pt-BR", {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
}