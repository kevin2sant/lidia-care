import React, { useState, useEffect } from 'react'
import Body from '../../components/layouts/body';

import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';


// icons
import AddBoxIcon from '@mui/icons-material/AddBox';
import SchoolIcon from '@mui/icons-material/School';
import ImageIcon from '@mui/icons-material/Image';
//

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

// imageList
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ListPsy = props => {
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
        console.log(data)
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
                        {infoPsy.v_names} {infoPsy.v_surnames}
                    </Typography>
                    
                </Toolbar>
                </AppBar>
                <div className="container">
                    <div className="offset-md-3 col-md-6">
                        <center>
                            <Image src={infoPsy.v_image_profile} width={500} height={500} alt="Psy"/>
                        </center>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-justify" style={{"textAlign" : "justify"}}>{infoPsy.v_about_me}</p>
                        </div> 

                        <Divider />
                        <div className="offset-md-1 offset-lg-1 col-md-11" style={{"padding" : "10px"}}>
                            <h2> <AddBoxIcon/> Especialidades</h2>
                            <div style={{"paddingLeft" : "20px"}}>
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality1} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality2} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality3} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality4} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality5} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality6} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality7} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality8} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality9} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_specialities.speciality10} </li>)}
                            </div>
                        </div>  

                        <Divider />
                        <div className="offset-md-1 offset-lg-1 col-md-11" style={{"padding" : "10px"}}>
                            <h2><SchoolIcon/> Educación</h2>
                            <div style={{"paddingLeft" : "20px"}}>
                            {infoPsy && ( <li> {infoPsy.j_education.education1} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education2} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education3} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education4} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education5} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education6} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education7} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education8} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education9} </li>)}
                            {infoPsy && ( <li> {infoPsy.j_education.education10} </li>)}
                            </div>
                        </div> 

                        <Divider />
                        <div className="col-md-12" style={{"padding" : "10px"}}>
                            <h2><ImageIcon/> Galeria</h2>
                            {infoPsy &&(
                                <ImageList variant="masonry" cols={2} gap={8}>
                                    {infoPsy.j_images.image1 && (
                                        <ImageListItem key="image1">
                                        <img
                                            src={`${infoPsy.j_images.image1}?w=248&fit=crop&auto=format`}
                                            srcSet={`${infoPsy.j_images.image1}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt="image1"
                                            loading="lazy"
                                        />
                                        </ImageListItem>
                                    )}
                                    {infoPsy.j_images.image2 && (
                                        <ImageListItem key="image2">
                                        <img
                                            src={`${infoPsy.j_images.image2}?w=248&fit=crop&auto=format`}
                                            srcSet={`${infoPsy.j_images.image2}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt="image2"
                                            loading="lazy"
                                        />
                                        </ImageListItem>
                                    )}
                                    {infoPsy.j_images.image3 && (
                                        <ImageListItem key="image3">
                                        <img
                                            src={`${infoPsy.j_images.image3}?w=248&fit=crop&auto=format`}
                                            srcSet={`${infoPsy.j_images.image3}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt="image3"
                                            loading="lazy"
                                        />
                                        </ImageListItem>
                                    )}
                                    {infoPsy.j_images.image4 && (
                                        <ImageListItem key="image4">
                                        <img
                                            src={`${infoPsy.j_images.image4}?w=248&fit=crop&auto=format`}
                                            srcSet={`${infoPsy.j_images.image4}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt="image4"
                                            loading="lazy"
                                        />
                                        </ImageListItem>
                                    )}
                                </ImageList>
                            )}
                            
                        </div> 
                    </div>
                </div>
            </Dialog>
        </Body>
    )
}

export default ListPsy;