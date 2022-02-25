import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',

        backgroundColor: theme.palette.background.paper,
        [`& fieldset`]: {
            borderRadius: 0
        },
    },
    inputProps: {
        padding: theme.spacing(0, 'auto'),
    },
    notchedOutline: {
        border: themeProps => themeProps.noBorder ? 'none' : ''
    },
}));

const TextInput = (props) => {

    const {noBorder, inputClassName, ...styleProps} = props;
    const themeProps = {noBorder: noBorder};
    const classes = useStyles(themeProps);

    return (
        <TextField 
            {...styleProps} 
            className={clsx(classes.textField, props.className)}
            variant="outlined" 
            size="small"
            InputProps={{
                className: clsx(classes.inputProps, inputClassName),
                classes:{
                    notchedOutline: classes.notchedOutline
                }
            }}
            
        /> 
       
    )
}

export default TextInput;
