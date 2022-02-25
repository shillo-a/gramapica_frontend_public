import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react'
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>({
    icon: {
        // height: '3rem',
        // width: '3rem',
        color: theme.palette.primary.main
    }
}))

const CircularProgressPrimary = (props) => {

    const { className: parrentClassName, ...styleProps} = props;

    const classes = useStyles();

    return (
        <CircularProgress 
            {...styleProps}
            className={clsx(classes.icon, parrentClassName)}
        />
    )
}

export default CircularProgressPrimary


