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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import es from 'date-fns/locale/es'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

const RegisterPsy = () => {
    const [value, setValue] = React.useState(new Date());


    const dispatch = useDispatch();

    useEffect(()=>{
        clientAxios.get('care/psy/psyList')
        .then(res => {
            setPsyList(res.data.data.response)
        })
        .catch(res => {
            dispatch(openAlert({type : 'error', message :  `HUBO UN ERROR AL INGRESAR LOS DATOS`}))
        })
    }, [])

    const [psyList, setPsyList] = useState(false)
    const [loading, setLoading] = useState(false)

    const [dataForm,setDataForm] = useState({
        psy_user        : '',
        names           : '',
        surnames        : '',
        identification  : '',
        password        : '',
        email           : '',
        sex             : '',
        birth_date      : '',
        about_me        : '',
        specialities    : '',
        education       : ''
    })
    

    const setForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
    }

 
    
    
    const handleOnSubmit = (e) => {
        
        e.preventDefault()

        
        if(!dataForm.psy_user){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL USUARIO'}))
            
            return false
        }    

        if(!dataForm.names){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LOS NOMBRES'}))
            return false
        }    

        if(!dataForm.surnames){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LOS APELLIDOS'}))
            return false
        }  

        if(!dataForm.identification){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA IDENTIFICACION'}))
            return false
        }  

        if(!dataForm.password){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA CONTRASEÑA'}))
            return false
        }  

        if(!dataForm.email){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL EMAIL'}))
            return false
        }  

        if(!dataForm.sex){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR EL SEXO'}))
            return false
        }  

        if(!dataForm.birth_date){
            dispatch(openAlert({type : 'error', message : 'DEBE INGRESAR LA FECHA DE NACIMIENTO'}))
            return false
        }

        setLoading(true)

        clientAxios.post('care/psy/psyAdd',dataForm)
        .then(res => {
            if(res.data.type == 'success'){
                dispatch(openAlert({type : 'success', message :  `PSICOLOGO AGREGADO CON ID : ${res.data.data.id}`}))
                
                setPsyList(res.data.data.psy)

                setDataForm({
                    psy_user        : '',
                    names           : '',
                    surnames        : '',
                    identification  : '',
                    password        : '',
                    email           : '',
                    sex             : '',
                    birth_date             : '',
                    about_me        : '',
                    specialities    : '',
                    education       : ''
                })
            }else{
                dispatch(openAlert({type : 'warning', message :  `USUARIO Y/O IDENTIFICACIÓN YA EXISTE`}))
            }
            setLoading(false)
        })
        .catch(res =>{
            dispatch(openAlert({type : 'error', message :  `OCURRIO UN ERROR NO SE PUDO AGREGAR EL PSICOLOGO`}))     
            setLoading(false)
        })
        
    }

    return(
        <Body
        title='Psicologo'>
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Usuario" 
                                variant="outlined"
                                id={"psy_user"}
                                name="psy_user"
                                type={"text"}
                                className="input_width"
                                value={dataForm.psy_user}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Contraseña" 
                                variant="outlined"
                                id={"password"}
                                name="password"
                                type={"text"}
                                className="input_width"
                                value={dataForm.password}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Nombres" 
                                variant="outlined"
                                id={"names"}
                                name="names"
                                type={"text"}
                                className="input_width"
                                value={dataForm.names}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Apellidos" 
                                variant="outlined"
                                id={"surnames"}
                                name="surnames"
                                type={"text"}
                                className="input_width"
                                value={dataForm.surnames}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Identificacion" 
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
                        <Item>
                            <TextField
                                label="Email" 
                                variant="outlined"
                                id={"email"}
                                name="email"
                                type={"text"}
                                className="input_width"
                                value={dataForm.email}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>       
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                    <Select
                                        labelId="sex"
                                        id="sex"
                                        name="sex"
                                        label="sex"
                                        className={styles.select}
                                        onChange={setForm}
                                        value={dataForm.sex}
                                    >
                                        <MenuItem value={'F'}>Femenino</MenuItem> 
                                        <MenuItem value={'M'}>Masculino</MenuItem>                              
                                        <MenuItem value={'O'}>Otros</MenuItem>                                                          
                                    </Select>
                                </FormControl>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es} >
                                <Stack spacing={3}>
                                    <DatePicker
                                        locale={es}
                                        mask= '__/__/____'
                                        disableFuture
                                        label="Fecha de nacimiento"
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={value}
                                        onChange={(newValue) => {
                                          setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                                </Stack>
                            </LocalizationProvider>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Cuentanos sobre ti" 
                                variant="outlined"
                                id={"about_me"}
                                name="about_me"
                                type={"text"}
                                pattern="[0-9]*"
                                className="input_width"
                                value={dataForm.about_me}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Especialidades" 
                                variant="outlined"
                                id={"specialities"}
                                name="specialities"
                                type={"text"}
                                pattern="[0-9]*"
                                className="input_width"
                                value={dataForm.specialities}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                            <TextField
                                label="Educacion" 
                                variant="outlined"
                                id={"education"}
                                name="education"
                                type={"text"}
                                pattern="[0-9]*"
                                className="input_width"
                                value={dataForm.education}
                                onChange={(e) => setForm(e)}
                            />
                        </Item>
                    </Grid>
                              
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item className="padding-button">
                        {loading ? 
                            <center><CircularProgress /></center>
                        : 
                            <Button className="btn btn-block btn-primary" onClick={(e) => { handleOnSubmit(e) }} variant="contained">Registrar Psicologo</Button>
                        }
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Item>
                        {psyList ? ( 
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <caption>Psicologos registrados</caption>
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Usuario</TableCell>
                                <TableCell align="center">Nombres</TableCell>
                                <TableCell align="center">Identificacion</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Sexo</TableCell>
                                <TableCell align="center">Edad</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {psyList.map((value,item) => (
                                <TableRow key={item}>
                                <TableCell align="center">{value.i_idpsy}</TableCell>
                                <TableCell align="center">{value.v_psy_user}</TableCell>
                                <TableCell align="center">{value.v_names +' '+ value.v_surnames}</TableCell>
                                <TableCell align="center">{value.v_identification}</TableCell>
                                <TableCell align="center">{value.b_active}</TableCell>
                                <TableCell align="center">{value.v_email}</TableCell>
                                <TableCell align="center">{value.v_sex}</TableCell>
                                <TableCell align="center">{value.i_birth_date}</TableCell>
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

export default RegisterPsy;