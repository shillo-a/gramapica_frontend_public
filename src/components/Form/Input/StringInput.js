import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%'
    }
}));

const StringInput = (props) => {

    const classes = useStyles();

    return (
        <TextField 
            {...props} 
            variant="outlined" 
            size="small"
            className={clsx(classes.textField, props.className)}
        /> 
       
    )
}

export default StringInput;
