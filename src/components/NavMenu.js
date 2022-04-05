import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AppsIcon from '@mui/icons-material/Apps';
import { useTranslation } from 'react-i18next';

export default function NavMenu() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Paper sx={{ width: 250 }}>
      <MenuList>
        <MenuItem onClick={ () => navigate('/')}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> Home </ListItemText>
        </MenuItem>

        <MenuItem onClick={ () => navigate('/meals')}>
          <ListItemIcon>
            <RestaurantIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('nav_menu.redeem_meal')} </ListItemText>
        </MenuItem>

        <MenuItem onClick={ () => navigate('/lectures')}>
          <ListItemIcon>
            <ConfirmationNumberIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('nav_menu.redeem_lecture')} </ListItemText>
        </MenuItem>
        
        <MenuItem onClick={ () => navigate('/meals')}>
          <ListItemIcon>
            <AppsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('nav_menu.check_attendee')} </ListItemText>
        </MenuItem>

      </MenuList>
    </Paper>
  );
}
