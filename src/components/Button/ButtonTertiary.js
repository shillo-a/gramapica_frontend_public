import React from 'react';
import { Button, makeStyles } from '@material-ui/core/';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    activeButton: {
        minWidth:0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    nonActiveButton: {
        minWidth:0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        
        backgroundColor: theme.palette.background.paper,
    }
}))

const ButtonTertiary = (props) => {
    const classes = useStyles();
    return (
        <Button 
            {...props}
            variant="contained" 
            color={props.state === 'active' ? 'primary' : 'default'} 
            className={ props.state === 'active' ? clsx(classes.activeButton, props.className) : clsx(classes.nonActiveButton, props.className)}
        />
    )
}

export default ButtonTertiary
