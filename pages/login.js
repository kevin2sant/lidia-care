import React, {useState} from 'react'
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// action redux
import { useDispatch, useSelector } from 'react-redux'
import { validateAuth } from '../actions/loginAction';

const Login = () => {
    const loading = useSelector( state => state.login.loading)
    const [error, seterror] = useState(false)

    const [loginUser, setloginUser] = useState({
        user : '',
        passwd : ''
    });

    const {user, passwd} = loginUser
    
    const router = useRouter()

    const setForm = (e) => {
        setloginUser({
                ...loginUser,
                [e.target.name] : e.target.value
        })
    }

    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();
    // mandar llamar el action de validateAuth
    const userLogin = (userData) => dispatch( validateAuth(userData) ) 

    const authLogin = e => {
        e.preventDefault()
        seterror(false)

        if (user.length == 0){
            seterror(true)
            return false
        }

        if (passwd.length == 0){
            seterror(true)
            return false
        }

        userLogin({
            user,
            passwd
        })
    }

    
    return(
        <>
        <form onSubmit={authLogin} className={styles.login_card}>
            <Image src="/logo2_care.png" width={150} height={150} className={styles.app_logo} alt="Login"/>

            {/* <img src='logo.png' className={styles.app_logo} alt="logo" /> */}
            <br /> 
                <TextField
                    id="user"
                    label="Usuario"
                    className={styles.input_login}
                    value={user}
                    name="user"
                    onChange={(e) => setForm(e)}
                />

                <TextField
                    id="passwd"
                    label="Contraseña"
                    className={styles.input_login}
                    value={passwd}
                    name="passwd"
                    onChange={(e) => setForm(e)}
                    type="password"
                />

                
                <div className={styles.button_login}>
                    {loading ? 
                        <CircularProgress /> 
                    : 
                        <Button type="submit" onClick={e => authLogin(e)} className="button-bg-login" variant="contained" size="large" endIcon={<LoginIcon />}>
                            Entrar
                        </Button> 
                    }
                </div>
            <label className={styles.forgot_passwd}>¿Ha olvidado su contraseña?</label>
            
            {error && (
                <Alert severity="error">Usuario o Contraseña invalidas</Alert>
            )}
            
        </form>
        </>
        
    )
}

export default Login;