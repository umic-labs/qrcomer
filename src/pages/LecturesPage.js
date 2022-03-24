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
import TopBar from '../components/TopBar'
import { fetch } from '../services/lectures.service'

const SessionsPage = () => {
  const { t } = useTranslation()

  const [lectures, setLectures] = useState([])

  useEffect(() => {
    fetch().then(setLectures)
  }, [])

  const lecturesByDate = composeLecturesByDate({ lectures })

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
          {t('meals_page.title')}
        </Typography>

          {
            lecturesByDate?.map(day => (
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
                        day.lectures?.map(lecture => (
                          <div key={lecture.id}>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={lecture.title} />
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

export default SessionsPage

const composeLecturesByDate = ({ lectures }) => {
  if(!lectures) return

  const uniqueDates = [...new Set(lectures.map(lecture => lecture.date))]

  return uniqueDates.map(date => (
    {
      date: date,
      lectures: lectures.filter((lecture) => lecture.date === date)
    }
  ))
}

const composeDateTitle = ({ date }) => {
  if (!date) return
  return new Date(date).toLocaleDateString("pt-BR", {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
}