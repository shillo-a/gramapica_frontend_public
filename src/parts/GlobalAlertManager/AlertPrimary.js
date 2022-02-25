import { IconButton, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
const useStyles = makeStyles((theme) => ({
    alert: {
        margin: theme.spacing(1, 0),
        animation: '$slideInRight 1s ease',
    },
    
    alertHide: {
        margin: theme.spacing(1, 0),
        animation: '$slideOutRight 1s ease',
    },

    "@keyframes slideInRight": {
        "0%": {
            transform: 'translateX(100%)'
          },
          "100%": {
            transform: 'translateX(0%)'
          }
    },

    "@keyframes slideOutRight": {
        "0%": {
            transform: 'translateX(0%)'
          },
          "100%": {
            transform: 'translateX(120%)'
          }
    }
}))

const AlertPrimary = (props) => {
    
    const classes = useStyles();

    //чтобы изменить перечень классов создаем стейт
    const [alertClasses, setAlertClasses] = useState([
        props.className,
        classes.alert
    ])

    //удаляем элекменты только через 1 после закрытия
    //до этого показываем анимацию
    const handleClose = (e) => {
        setAlertClasses([
            props.className,
            classes.alertHide
        ])
        setTimeout(() => {
            props.handleClose(props.itemId)
        }, 1000)
        
    }

    //через 5 секунды после создания элемента убираем его
    useEffect(()=>{
        setTimeout(() => {
            setAlertClasses([
                props.className,
                classes.alertHide
            ])
        }, 5000)
    }, [])

    return (
        <Alert 
            className={clsx(...alertClasses)}
            variant="filled"
            severity={props.severity}
            action={
                <IconButton
                    
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={(e) => handleClose(e)}
                >
                    <CloseRoundedIcon fontSize="inherit" />
                </IconButton>
            }
        >
            {props.children}
        </Alert>
    )
}

export default AlertPrimary
