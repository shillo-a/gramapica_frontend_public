import React from 'react'

import { Dialog, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import ButtonPrimary from '../../components/Button/ButtonPrimary'
import ButtonTertiary from '../../components/Button/ButtonTertiary'

const useStyles = makeStyles((theme) => ({
    dialog:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '999992 !important'
    },
    dialogContainer: {
        backgroundColor: theme.palette.background.paper,
        height: 'auto',
        width: 'auto',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        
        //to disable borders added by browser
        outline: 0,
    },
    dialogHeader: {
        ...theme.typography.subtitle1,
        fontWeight: 900
    },
    dialogSubheader: {
        marginTop: theme.spacing(2),
        ...theme.typography.subtitle2,
    },
    dialogButtons: {
        marginTop: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    dialogButton:{
    }
}))

const DialogPrimary = ({ 
    isOpened, 
    handleClose, 
    handleConfirm, 
    handleDecline,
    header,
    subheader,
    buttonName
}) => {

    const classes = useStyles();

    return (
        <Modal className={classes.dialog} open={isOpened} onClose={handleClose}>
            <div className={classes.dialogContainer}>
                <Typography className={classes.dialogHeader}>{header}</Typography>
                <Typography className={classes.dialogSubheader}>{subheader}</Typography>
                <Grid container spacing={1} className={classes.dialogButtons}>
                    <Grid item><ButtonTertiary className={classes.dialogButton} onClick={handleDecline}>Отмена</ButtonTertiary></Grid>
                    <Grid item><ButtonPrimary className={classes.dialogButton} onClick={handleConfirm}>{buttonName}</ButtonPrimary></Grid>
                </Grid>
            </div>
        </Modal>
    )
}

export default DialogPrimary
