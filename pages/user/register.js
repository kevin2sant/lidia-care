import React, {useState, useEffect} from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Body from '../../components/layouts/body';
import BasicTable from '../../components/user/tableUser';
import styles from '../../styles/User.module.css';
import clientAxios from '../../config/axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
        company : false,
        plan : false,
        users : false
    })
    const [error, setError] = useState({
        type : false,
        message : false
    })

    const [userAdd, setUserAdd] = useState(false)

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [plan, setPlan] = useState(false)
    const [company, setCompany] = useState(false)
    
    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    
    const setForm = (e) => {
        console.log(e)
        setDataForm({
                ...dataForm,
                [e.target.name] : e.target.value
        })
    }
    // al cargar la pagina cargara los datos de la compañias y planes 
    
    useEffect(()=>{
        clientAxios.get('care/company/getDataRegister')
        .then(res => {
            setCompany(res.data.data.company)
            setPlan(res.data.data.plan)
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
            type : false,
            message : false
        })
        
        if(!dataForm.company){
            setError({
                type : 'error',
                message : 'Debe seleccionar la compañia'
            })
            handleClick()
            return false
        }    
        
        if(!dataForm.plan){
            setError({
                type : 'error',
                message : 'Debe seleccionar el plan'
            })
            
            handleClick()
            return false
        }    

        if (!dataForm.users) {
            
            setError({
                type : 'error',
                message : 'Debe seleccionar el archivo'
            })

            handleClick()
            return false
        }

        clientAxios.post('care/user/usersRegister', dataForm)
        .then(res => {
            setUserAdd(res.data.data)
            setError({
                type : 'success',
                message : 'Los datos se registraron correctamente'
            })
            handleClick()
        })
        .catch(err => {
            console.log(err)
            setError({
                type : 'error',
                message : 'Hubo un error al ingresar los datos'
            })
        })
    };

    return (
        <>
        <Body>
            <Box sx={{ flexGrow: 1, marginTop :'70px'}}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                        Seleccione compañia<br/><br/>
                        {company ? 
                            <Select
                                labelId="Compañia"
                                id="company"
                                name="company"
                                label="Compañia"
                                className={styles.select}
                                input={<OutlinedInput label="Compañia" />}
                                onChange={(e) => setForm(e)}
                            >
                                {company.map((value,item) => (
                                    <MenuItem key={value.i_idcompany} value={value.i_idcompany}>{value.v_company}</MenuItem>
                                ))}
                                
                            </Select>
                        :
                        <center><CircularProgress /></center>
                        }
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Item>
                        Seleccione plan<br/><br/>
                        {plan ? 
                            <Select
                                labelId="Plan"
                                id="plan"
                                name="plan"
                                label="Plan"
                                className={styles.select}
                                input={<OutlinedInput label="Plan" />}
                                onChange={setForm}
                            >
                                {plan.map((value,item) => (
                                    <MenuItem key={value.i_idplan} value={value.i_idplan}>{value.v_plan}</MenuItem>
                                ))}
                                
                            </Select>
                        :
                        <center><CircularProgress /></center>
                        }
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} xl={4}>
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

                            <Button class="btn btn-block btn-primary" onClick={(e) => { handleOnSubmit(e) }} variant="contained">Cargar Usuarios</Button>
                        </form>
                        
                        </Item>
                    </Grid>
                    {userAdd && (
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <Item> 
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <th>Usuario</th>
                                        <th>Estado</th>
                                    </thead>  
                                    <tbody>
                                    {userAdd.map((value,item) => (
                                        <tr key={item}>
                                            <td key={item}>{value.v_identification}</td>
                                            <td key={item}>{value.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>    
                                </table>                 
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