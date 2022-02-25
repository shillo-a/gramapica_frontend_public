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
        ...theme.typography.subtitle1,
        fontWeight: 900,
        height: '100%'
    },
    notchedOutline: {
        border: themeProps => themeProps.noBorder ? 'none' : ''
    }
}));

const SubheaderInput = (props) => {

    const {noBorder, ...styleProps} = props;
    const themeProps = {noBorder: noBorder};
    const classes = useStyles(themeProps);

    return (
        <TextField 
            {...styleProps} 
            id="outlined-basic" 
            variant="outlined" 
            size="small"
            InputProps={{
                className: classes.inputProps,
                classes:{notchedOutline:classes.notchedOutline}
            }}
            multiline
            className={clsx(classes.textField, props.className)}
        /> 
       
    )
}

export default SubheaderInput;