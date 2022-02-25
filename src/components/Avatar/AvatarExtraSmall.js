import { Avatar, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '18px',
        height: '18px'
    },
}))

const AvatarExtraSmall = ({ src, className: parrentClassName }) => {

    const classes = useStyles();

    return (
        <Avatar 
            className={clsx(classes.avatar, parrentClassName)} 
            src={src}
            variant="rounded"
        />
    )
}

export default AvatarExtraSmall
