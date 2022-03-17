import React, {useState} from 'react';
import styles from '../../styles/Footer.module.css';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
    const [value, setValue] = useState('recents');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <BottomNavigation className={styles.footer} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Rutas"
                value="Rutas"
                icon={<LocationOnIcon />}
            />
            
            <BottomNavigationAction
                label="Perfil"
                value="Perfil"
                icon={<PersonIcon />}
            />
            <BottomNavigationAction
                label="Reporte"
                value="Reporte"
                icon={<BarChartIcon />}
            />
        </BottomNavigation>
    )
}

export default Footer