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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
        clientAxios.get('/care/plans/getDataRegister')
        .then(res => {
            setPlansList(res.data.data.plans)
            setPlansIntervals(res.data.data.intervals)

        })
        .catch(res => {
            setAlert({
                type : 'error',
                message : 'HUBO UN ERROR AL EXTRAER LOS DATOS'
            })
            handleClick()
        })
    }, [])

    const [plansList, setPlansList] = useState(false)
    const [intervalsLists, setPlansIntervals] = useState(false)

    const [loading, setLoading] = useState(false)

    const [dataForm,setDataForm] = useState({
        v_plan : '',
        v_plan_description :'',
        i_beneficiaries : '',
        i_idplan_interval : '',
        i_price_per_beneficiary : '',
        i_internal_price_per_beneficiary : '',
        i_appointments : '',
        i_extra_appointments : '',
        n_discount_appointment :'',
        n_discount_particular : ''
    })
    

    const setForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
    }

    
    
    const handleOnSubmit = (e) => {
        
        e.preventDefault()
        
        if(!dataForm.v_plan){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL PLAN'}))
            return false
        }    

        if(!dataForm.i_beneficiaries){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA CANTIDAD DE BENEFICIARIOS'}))
            return false
        }    

        if(!dataForm.i_idplan_interval){
            dispatch(openAlert({type : 'error', message : 'DEBE SELECCIONAR EL INTERVALO'}))
            return false
        }    

        if(!dataForm.i_price_per_beneficiary){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL PRECIO BENEFICIARIO'}))
            return false
        } 

        if(!dataForm.i_internal_price_per_beneficiary){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL PRECIO INTERNO'}))
            return false
        } 

        if(!dataForm.i_appointments){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA CANTIDAD DE CITAS'}))
            return false
        } 

        if(!dataForm.i_appointments){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA CANTIDAD DE CITAS EXTRAS'}))
            return false
        } 

        if(!dataForm.n_discount_appointment){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL DESCUENTO CITA'}))
            return false
        } 

        if(!dataForm.n_discount_particular){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL DESCUENTO PARTICULAR'}))
            return false
        } 

        setLoading(true)

        clientAxios.post('care/plans/planAdd',dataForm)
        .then(res => {
            console.log(res.data.type)
            if(res.data.type == 'success'){
                dispatch(openAlert({type : 'success', message :  `PLAN AGREGADA CON ID : ${res.data.data.id}`}))
                
                setPlansList(res.data.data.plans)

                setDataForm({
                    v_plan : '',
                    v_plan_description :'',
                    i_beneficiaries : '',
                    i_idplan_interval : '',
                    i_price_per_beneficiary : '',
                    i_internal_price_per_beneficiary : '',
                    i_appointments : '',
                    i_extra_appointments : '',
                    n_discount_appointment :'',
                    n_discount_particular : ''
                })
            }
            setLoading(false)
        })
        .catch(res =>{
            dispatch(openAlert({type : 'error', message :  `OCURRIO UN ERROR NO SE PUDO AGREGAR EL PLAN`}))     
            setLoading(false)
        })
        
    }

    return(
        <Body
        title='Planes'>
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Nombre del Plan" 
                                variant="outlined"
                                id={"v_plan"}
                                name="v_plan"
                                type={"text"}
                                className="input_width"
                                value={dataForm.v_plan}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Descripcion del Plan" 
                                variant="outlined"
                                id={"v_plan_description"}
                                name="v_plan_description"
                                type={"text"}
                                className="input_width"
                                value={dataForm.v_plan_description}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>

                        <Item>
                            {intervalsLists ? 
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Intervalo</InputLabel>
                                <Select
                                    labelId="i_idplan_interval"
                                    id="i_idplan_interval"
                                    name="i_idplan_interval"
                                    label="i_idplan_interval"
                                    className={styles.select}
                                    onChange={setForm}
                                    value={dataForm.i_idplan_interval}
                                >
                                    {intervalsLists.map((value,item) => (
                                        <MenuItem key={value.i_idplan_interval} value={value.i_idplan_interval}>{value.v_plan_interval}</MenuItem>
                                    ))}
                                    
                                </Select>
                                </FormControl>
                            :
                            <center><CircularProgress /></center>
                            }
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Beneficiarios" 
                                variant="outlined"
                                id={"i_beneficiaries"}
                                name="i_beneficiaries"
                                type={"number"}
                                className="input_width"
                                value={dataForm.i_beneficiaries}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>
  
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Precio Beneficiario" 
                                variant="outlined"
                                id={"i_price_per_beneficiary"}
                                name="i_price_per_beneficiary"
                                type={"number"}
                                className="input_width"
                                value={dataForm.i_price_per_beneficiary}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Precio Interno" 
                                variant="outlined"
                                id={"i_internal_price_per_beneficiary"}
                                name="i_internal_price_per_beneficiary"
                                type={"number"}
                                className="input_width"
                                value={dataForm.i_internal_price_per_beneficiary}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Citas" 
                                variant="outlined"
                                id={"i_appointments"}
                                name="i_appointments"
                                type={"number"}
                                className="input_width"
                                value={dataForm.i_appointments}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Citas Extra" 
                                variant="outlined"
                                id={"i_extra_appointments"}
                                name="i_extra_appointments"
                                type={"number"}
                                className="input_width"
                                value={dataForm.i_extra_appointments}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Descuento Cita" 
                                variant="outlined"
                                id={"n_discount_appointment"}
                                name="n_discount_appointment"
                                type={"number"}
                                className="input_width"
                                value={dataForm.n_discount_appointment}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Descuento Particular" 
                                variant="outlined"
                                id={"n_discount_particular"}
                                name="n_discount_particular"
                                type={"number"}
                                className="input_width"
                                value={dataForm.n_discount_particular}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item className="padding-button">
                        {loading ? 
                            <center><CircularProgress /></center>
                        : 
                            <Button className="btn btn-block btn-primary" onClick={(e) => { handleOnSubmit(e) }} variant="contained">Registrar Plan</Button>
                        }
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Item>
                        {plansList ? ( 
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <caption>Planes registradas en la aplicación.</caption>
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Plan</TableCell>
                                <TableCell align="center">Descripción</TableCell>
                                <TableCell align="center">Intervalo</TableCell>
                                <TableCell align="center">Beneficiarios</TableCell>
                                <TableCell align="center">Citas</TableCell>
                                <TableCell align="center">Citas Extras</TableCell>
                                <TableCell align="center">Descuento Cita</TableCell>
                                <TableCell align="center">Descuento Particular</TableCell>
                                <TableCell align="center">Precio Beneficiario</TableCell>
                                <TableCell align="center">Precio Interno</TableCell>
                                <TableCell align="center">Fecha Creacion</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {plansList.map((value,item) => (
                                <TableRow key={item}>
                                <TableCell align="center">{value.v_plan}</TableCell>
                                <TableCell align="center">{value.v_plan_description}</TableCell>
                                <TableCell align="center">{value.v_plan_interval}</TableCell>
                                <TableCell align="center">{value.i_beneficiaries}</TableCell>
                                <TableCell align="center">{value.i_appointments}</TableCell>
                                <TableCell align="center">{value.i_extra_appointments}</TableCell>
                                <TableCell align="center">{value.n_discount_appointment}</TableCell>
                                <TableCell align="center">{value.n_discount_particular}</TableCell>
                                <TableCell align="center">{value.i_price_per_beneficiary}</TableCell>
                                <TableCell align="center">{value.i_internal_price_per_beneficiary}</TableCell>
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