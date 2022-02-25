import React from 'react'
import { Button, Link, makeStyles, Typography} from '@material-ui/core'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    button: {
        // cursor: 'pointer',
        // color: theme.palette.grey[600],
        // "&:hover": {
        //     textDecoration: 'none',
        //     color: theme.palette.grey[800],
        // }

        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
        }

    }
}))

const LinkButton = ( props ) => {

    const classes = useStyles();

    return (
        <Button
            {...props}
            className={clsx(classes.button, props.className)} 
        >
        
            {props.children}
  
        </Button>
    )
}

export default LinkButton

//default