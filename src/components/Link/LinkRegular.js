import React from 'react';
import { Link, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: 'pointer',
        color: 'inherit',
        textDecoration: 'underline',
        "&:hover": {
            color: theme.palette.primary.main,
        }
    }
}))

const LinkRegular = (props) => {

    const classes = useStyles();

    return (
        <Link
            {...props}
            className={clsx(classes.link, props.className)} 
        >
            {props.children}
        </Link>
    )
}

export default LinkRegular
