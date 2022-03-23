import React from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Body from '../../components/layouts/body';
import BasicTable from '../../components/user/tableUser';
import styles from '../../styles/User.module.css'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
  }));

const RegisterUser = () => {
    return (
        <>
        <Body>
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                        Cargar Archivo con usuarios<br/><br/>
                        <TextField
                            id="user"
                            className={styles.input_login}
                            type="file"
                            name="user"
                        /><br/><br/>
                        <Button variant="contained">Cargar Usuarios</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} xl={8}>
                        <BasicTable/>
                    </Grid>
                </Grid>
            </Box>
        </Body>
        </>
    )
}

export default RegisterUser;