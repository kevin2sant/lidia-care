import React, { useState } from 'react'
import Body from '../../components/layouts/body';

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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ListPsy = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Body title="Ver Psicologos">
            <Box sx={{ flexGrow: 1, marginTop :'90px'}}>
                <Grid container spacing={2}>
                <div className="row" style={{"margin" : "0px 0px 0px 16px"}} onClick={handleClickOpen}>
                    <div className="col-md-6">
                        <div className="card mb-3" style={{"border" : "3px solid #1976d2","border-radius" : "5px", "box-shadow" : "0px 6px 11px #585858a1", "cursor" : "pointer"}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <center>
                                    <Image src="/profile.jpg" width={500} height={500} alt="Psy"/>
                                    </center>
                                </div>
                                
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Enrique Pineda</h5>
                                        <p className="card-text">Me gusta mariconear 24/7</p>
                                        <p className="card-text"><small className="text-muted">Ver mas ...</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-3" style={{"border" : "3px solid #1976d2","border-radius" : "5px", "box-shadow" : "0px 6px 11px #585858a1", "cursor" : "pointer"}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <center>
                                    <Image src="/profile.jpg" width={500} height={500} alt="Psy"/>
                                    </center>
                                </div>
                                
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Franco Veliz de Pineda</h5>
                                        <p className="card-text">Me gusta hacer cochinadas en la cama y que quede la caga.</p>
                                        <p className="card-text"><small className="text-muted">Ver mas ...</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    Enrique Pineda
                    </Typography>
                    
                </Toolbar>
                </AppBar>
                Hola mundo
            </Dialog>
        </Body>
    )
}

export default ListPsy;