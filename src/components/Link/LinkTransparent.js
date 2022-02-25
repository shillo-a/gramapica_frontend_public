import React from 'react';
import { Link, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: 'pointer',
        color: 'inherit',
        "&:hover, &:focus, &:active": {
            textDecoration: 'none',
            color: 'inherit'
        }
    }
}))

const LinkTransparent = (props) => {

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

export default LinkTransparent;
