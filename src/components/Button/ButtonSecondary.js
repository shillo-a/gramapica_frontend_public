import React from 'react';
import { Button, makeStyles } from '@material-ui/core/';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    button: {
        background: theme.palette.background.paper,
    }
}))

const ButtonSecondary = (props) => {
    const classes = useStyles();
    return (
        <Button variant="outlined" color="primary"
            {...props}
            className={clsx(classes.button, props.className)}
        />
    )
}

export default ButtonSecondary
