import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({

    nonActiveButton: {
        borderRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: 0, 

        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
        }
    },

    activeButton: {
        boxShadow: `inset 0 -2px 0 ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,

        borderRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: 0, 

        '&:hover': {
            backgroundColor: "transparent",
        }
    },
}))

const TabButton = (props) => {
    
    const classes = useStyles();

    return (
        <Button
            {...props}
            className = { props.state === 'active' ? clsx(classes.activeButton, props.className) : clsx(classes.nonActiveButton, props.className)}
        >
            { props.children }
        </Button>
    )
}

export default TabButton

