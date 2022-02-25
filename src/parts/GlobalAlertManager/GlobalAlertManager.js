import React from 'react'
import { useDispatch } from 'react-redux';

import { Button, makeStyles } from '@material-ui/core';

import { useSelector } from 'react-redux';
import AlertPrimary from './AlertPrimary';
import { addAlert, launchAlert, removeAlert } from '../../store/slices/globalAlertSlice';


const useStyles = makeStyles((theme) => ({

    alertsContainer: {
        position: 'fixed', 
        bottom: 0,
        right: 0,
        width:'300px',
        overflow: 'hidden',
        opacity: 1,
        zIndex: 2000,
        padding: theme.spacing(2)
        // boxSizing: 'content-box'
    }

}))


const GlobalAlertManager = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const alerts = useSelector(state => state.globalAlert)

    const handleClose = (id) => {
        dispatch(removeAlert(id))
    }

    return (
        <div className={classes.alertsContainer}>
            { alerts.length > 0 &&
                alerts.map(item => {
                    return (
                        <AlertPrimary 
                            key={item.id} 
                            itemId={item.id}
                            severity={item.type}
                            handleClose={handleClose}
                        >{item.body}</AlertPrimary>
                    )
                })
            }
        </div>
    )
}

export default GlobalAlertManager


// Для проверки
// <Button onClick={()=>{dispatch(launchAlert({body: 'Тестовый алёрт', type:'warning'}))}}>add</Button>
