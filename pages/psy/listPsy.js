import React, { useState, useEffect } from 'react'
import Body from '../../components/layouts/body';

import CircularProgress from '@mui/material/CircularProgress';
// required
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// 

import Image from 'next/image'

// modal full
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
// 

// components
import CardPsyHorizontal from '../../components/psyco/cardPsyHorizontal';
// 

// Axios
import clientAxios from '../../config/axios';
// 

// dispatch
import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../actions/snackBarAction';
// 

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ListPsy = () => {
    const dispatch = useDispatch();
    const [dataPsy, setDataPsy] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        clientAxios.get('/care/psy/getListPsyActive')
        .then(res => {
            setDataPsy(res.data.data.psy)
            console.log(dataPsy)
            setLoading(false)
        })
        .catch(res => {
            dispatch(openAlert({type : 'error', message : 'HUBO UN ERROR AL EXTRAER LOS DATOS'}))
        })
    },[])

    const [open, setOpen] = useState(false);
    const [infoPsy, setInfoPsy] = useState(false)

    const handleClickOpen = (data) => {
        setInfoPsy(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Body title="Ver Psicologos">
            <Box sx={{ flexGrow: 1, marginTop :'90px'}}>
                <Grid container spacing={2}>
                {dataPsy ? 
                    dataPsy.map((value,item) => (
                        <Grid item xs={12} sm={12} md={6} xl={6} key={item}>
                            <div className="row" style={{"margin" : "0px 10px 0px 10px"}} onClick={() => handleClickOpen(value)}>    
                            <CardPsyHorizontal idPsy={value}/>
                            </div>
                        </Grid>
                     ))
                : 
                <center><CircularProgress /></center>
                }
                </Grid> 
            </Box>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {infoPsy.v_names}
                    </Typography>
                    
                </Toolbar>
                </AppBar>
                {infoPsy.v_about_me}
            </Dialog>
        </Body>
    )
}

export default ListPsy;