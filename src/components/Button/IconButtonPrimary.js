import { IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },

    button: {
        backgroundColor: theme.palette.background.paper,
        // flexGrow: 1
    },

    buttonSignature: {
        ...theme.typography.caption
    }
}))

const IconButtonPrimary = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.buttonContainer}>

            <IconButton 
                color="primary"
                {...props}
                className={clsx(classes.button, props.className)}
            />
            {props.signature &&
                <Typography className={classes.buttonSignature}>
                    {props.signature}
                </Typography>
            }
        
        </div>
    )
}

export default IconButtonPrimary
