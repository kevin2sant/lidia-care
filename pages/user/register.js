import React, {useState, useEffect} from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Body from '../../components/layouts/body';
import BasicTable from '../../components/user/tableUser';
import styles from '../../styles/User.module.css';
import clientAxios from '../../config/axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


// tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// agregar los alert comom un componente
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
  }));

const RegisterUser = () => {
    const [dataForm, setDataForm] = useState({
        company : '',
        plan : '',
        users : ''
    })
    const [error, setError] = useState({
        type : '',
        message : ''
    })

    const [userAdd, setUserAdd] = useState(false)

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [plan, setPlan] = useState('')
    const [company, setCompany] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    
    const setForm = (event) => {
        setDataForm({
                ...dataForm,
                [event.target.name] : event.target.value
        })
    }
    // al cargar la pagina cargara los datos de la compañias y planes 
    
    useEffect(()=>{
        clientAxios.get('care/company/getDataRegister')
        .then(res => {
            setCompany(res.data.data.company)
            setPlan(res.data.data.plan)
        })
        .catch(res => {

        })
    }, [])
    
    

    const handleOnChange = async (e) => {
        try{
            const fileContents = await readFile(e.target.files[0])
            setDataForm({
                ...dataForm,
                users : fileContents 
            })
        }catch(err){
            console.log(err)
        }
    };

    const readFile = (files) => {
        const fileReader = new FileReader();
        return new Promise((resolve,reject) => {
            fileReader.onload = () => {
                let arr = fileReader.result.split('\r\n');
                let arr_str = "["
                arr.map((value) => {
                    arr_str += `"${value}",` 
                }) 
                resolve(arr_str.slice(0,-1)+']')
            };

            fileReader.readAsText(files)
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setUserAdd(false)
        setError({
            type : '',
            message : ''
        })
        
        if(!dataForm.company){
            setError({
                type : 'error',
                message : 'DEBE SELECCIONAR UNA COMPAÑIA'
            })
            handleClick()
            return false
        }    
        
        if(!dataForm.plan){
            setError({
                type : 'error',
                message : 'DEBE SELECCIONAR EL PLAN'
            })
            
            handleClick()
            return false
        }    

        if (!dataForm.users) {
            
            setError({
                type : 'error',
                message : 'DEBE SELECCIONAR EL ARCHIVO'
            })

            handleClick()
            return false
        }

        setLoading(true)
        clientAxios.post('care/user/usersRegister', dataForm)
        .then(res => {
            setUserAdd(res.data.data)
            setError({
                type : 'success',
                message : 'LOS DATOS SE REGISTRARON CORRECTAMENTE'
            })
            handleClick()
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError({
                type : 'error',
                message : 'HUBO UN ERROR AL INGRESAR LOS DATOS'
            })
            handleClick()
            setLoading(false)
        })
    };

    return (
        <>
        <Body
            title="Usuarios">
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={12} md={6} xl={6}>
                        <Item>
                        {company ? 
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Compañia</InputLabel>
                            <Select
                                id="company"
                                name="company"
                                label="Compañia"
                                className={styles.select}
                                input={<OutlinedInput label="Compañia" />}
                                onChange={setForm}
                                value={dataForm.company}
                            >
                                {company.map((value,item) => (
                                    <MenuItem key={value.i_idcompany} value={value.i_idcompany}>{value.v_company}</MenuItem>
                                ))}
                                
                            </Select>
                            </FormControl>
                        :
                        <center><CircularProgress /></center>
                        }
                        </Item>
                        <br/>
                        <Item>
                        {plan ? 
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Plan</InputLabel>
                            <Select
                                labelId="Plan"
                                id="plan"
                                name="plan"
                                label="Plan"
                                className={styles.select}
                                onChange={setForm}
                                value={dataForm.plan}
                            >
                                {plan.map((value,item) => (
                                    <MenuItem key={value.i_idplan} value={value.i_idplan}>{value.v_plan}</MenuItem>
                                ))}
                                
                            </Select>
                            </FormControl>
                        :
                        <center><CircularProgress /></center>
                        }
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} xl={6}>
                        <Item>
                        Cargar Archivo con usuarios<br/><br/>
                        <form>
                            <TextField
                                id={"csvFileInput"}
                                name="csvFileInput"
                                accept={".csv"}
                                className={styles.input_json}
                                type={"file"}
                                onChange={handleOnChange}
                            /><br/><br/>
                            {loading ? 
                                <center><CircularProgress /></center>
                            : 
                                <Button className="btn btn-block btn-primary" onClick={(e) => { handleOnSubmit(e) }} variant="contained">Cargar Usuarios</Button>
                            }
                        </form>
                        
                        </Item>
                    </Grid>

                    
                    {userAdd && (
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <Item> 
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <caption>Usuarios importados desde el archivo.</caption>
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center">Usuario</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {userAdd.map((value,item) => (
                                    <TableRow key={item}>
                                    <TableCell align="center">{value.v_identification}</TableCell>
                                    <TableCell align="center">{value.status}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>          
                            </Item>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Body>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={error.type} sx={{ width: '100%' }}>
                {error.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default RegisterUser;