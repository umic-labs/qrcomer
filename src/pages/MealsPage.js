import { Container, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TopBar from '../components/TopBar'
import { fetch } from '../services/meals-service'

const HomePage = () => {
  const { t } = useTranslation()

  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetch().then(setMeals)
  }, [])

  const mealsByDate = composeMealsByDate({ meals })

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
            mealsByDate?.map(day => (
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
                        day.meals.map(meal => (
                          <div key={meal.id}>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={ t(`meals_page.${meal.type}`) } />
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

export default HomePage

const composeMealsByDate = ({ meals }) => {
  if(!meals) return

  const uniqueDates = [...new Set(meals.map(meal => meal.date))]

  return uniqueDates.map(date => (
    {
      date: date,
      meals: meals.filter((meal) => meal.date === date)
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