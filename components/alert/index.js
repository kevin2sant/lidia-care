import React, {useState, useEffect} from 'react';
import MuiAlert from '@mui/material/Alert';

import { useDispatch, useSelector } from 'react-redux'
import { closeAlert } from '../../actions/snackBarAction';

import Snackbar from '@mui/material/Snackbar';

// agregar los alert comom un componente 
const AlertMui = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertShow = props => {
    const show = useSelector( state => state.snackBar)
    
    const dispatch = useDispatch();
    
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        dispatch( closeAlert() ) 
    };

    return(
        <div>
            <Snackbar open={show.alert} autoHideDuration={2000} onClose={handleClose}>
                <AlertMui onClose={handleClose} severity={show.type} sx={{ width: '100%' }}>
                    {show.message}
                </AlertMui>
            </Snackbar>
        </div>
    )
}

export default AlertShow