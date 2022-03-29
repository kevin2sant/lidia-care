import React, {useState, useEffect} from 'react';
import Body from '../../components/layouts/body';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import styles from '../../styles/User.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import clientAxios from '../../config/axios';
import MuiAlert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// agregar los alert comom un componente 
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

const Register = () => {
    useEffect(()=>{
        clientAxios.get('care/company/companyList')
        .then(res => {
            setCompanyList(res.data.data.response)
        })
        .catch(res => {
            setError({
                type : 'error',
                message : 'HUBO UN ERROR AL INGRESAR LOS DATOS'
            })
            handleClick()
        })
    }, [])

    const [open, setOpen] = useState(false);
    const [companyList, setCompanyList] = useState(false)
    const [dataForm,setDataForm] = useState({
        company : '',
        identification : ''
    })

    const handleClick = () => {
        setOpen(true);
    };
    
    const [error, setError] = useState({
        type : '',
        message : ''
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const setForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
    }

    return(
        <Body
        title='Compañia'>
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={12} md={6} xl={6}>
                        <Item>
                            <TextField
                                label="Nombre de la Compañia" 
                                variant="outlined"
                                id={"company"}
                                name="company"
                                type={"text"}
                                className="input_width"
                                value={dataForm.company}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} xl={6}>
                        <Item>
                            <TextField
                                label="Identificacion de la Compañia" 
                                variant="outlined"
                                id={"identification"}
                                name="identification"
                                type={"text"}
                                className="input_width"
                                value={dataForm.identification}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Item>
                        {companyList ? ( 
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <caption>Compañias registradas en la aplicación.</caption>
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Compañia</TableCell>
                                <TableCell align="center">Identificacion</TableCell>
                                <TableCell align="center">Fecha Creacion</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {companyList.map((value,item) => (
                                <TableRow key={item}>
                                <TableCell align="center">{value.v_company}</TableCell>
                                <TableCell align="center">{value.v_company_code}</TableCell>
                                <TableCell align="center">{value.d_created_at}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer> 
                        ) : (
                            <center><CircularProgress /></center>
                        )}         
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Body>
    )
} 

export default Register;