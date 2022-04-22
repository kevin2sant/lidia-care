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
import { Button } from '@mui/material';
import AlertShow from '../../components/alert'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../actions/snackBarAction';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

const Register = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        clientAxios.get('care/company/companyList')
        .then(res => {
            setCompanyList(res.data.data.response)
        })
        .catch(res => {
            dispatch(openAlert({type : 'error', message :  `HUBO UN ERROR AL INGRESAR LOS DATOS`}))
        })
    }, [])

    const [companyList, setCompanyList] = useState(false)
    const [loading, setLoading] = useState(false)

    const [dataForm,setDataForm] = useState({
        company : '',
        identification : ''
    })
    

    const setForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
    }

    
    
    const handleOnSubmit = (e) => {
        
        e.preventDefault()

        
        if(!dataForm.company){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA COMPAÑIA'}))
            
            return false
        }    

        if(!dataForm.identification){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL ID DE LA COMPAÑIA'}))
            return false
        }    

        setLoading(true)

        clientAxios.post('care/company/companyAdd',dataForm)
        .then(res => {
            if(res.data.type == 'success'){
                dispatch(openAlert({type : 'success', message :  `COMPAÑIA AGREGADA CON ID : ${res.data.data.id}`}))
                
                setCompanyList(res.data.data.companies)

                setDataForm({
                    company : '',
                    identification : ''
                })
            }else{
                dispatch(openAlert({type : 'warning', message :  `ID DE EMPRESA YA SE ENCUENTRA REGISTRADO`}))
            }
            setLoading(false)
        })
        .catch(res =>{
            dispatch(openAlert({type : 'error', message :  `OCURRIO UN ERROR NO SE PUSO AGREGAR LA COMPAÑIA`}))     
            setLoading(false)
        })
        
    }

    return(
        <Body
        title='Compañia'>
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={12} md={4} xl={4}>
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

                    <Grid item xs={12} sm={12} md={4} xl={4}>
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

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item className="padding-button">
                        {loading ? 
                            <center><CircularProgress /></center>
                        : 
                            <Button className="btn btn-block btn-primary" onClick={(e) => { handleOnSubmit(e) }} variant="contained">Registrar Compañia</Button>
                        }
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
            <AlertShow/>
        </Body>
    )
} 

export default Register;