import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import NavMenu from './NavMenu'
import { useTranslation } from 'react-i18next'

export default function TopBar() {
  const { t } = useTranslation()

  const [isMenuVisisible, setIsMenuVisible] = useState(false)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsMenuVisible(!isMenuVisisible)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              { t('topbar.title') }
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {
        isMenuVisisible &&
        <NavMenu />
      }

    </>
  )
}
