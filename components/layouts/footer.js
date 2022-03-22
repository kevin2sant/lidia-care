import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FaceIcon from '@mui/icons-material/Face';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Redux
import { useDispatch } from 'react-redux';
import { authClose } from '../../actions/loginAction';

export default function Footer() {
    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch(); 

    const closeSession = () => {
        dispatch(authClose())
    }
    
    return (
    <Box sx={{ width: '100%', position :'fixed', bottom : 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Perfil" icon={<FaceIcon />} />
        <BottomNavigationAction label="Notificaciones" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Salir" icon={<ExitToAppIcon />} onClick={() => closeSession()}/>
      </BottomNavigation>
    </Box>
  );
}