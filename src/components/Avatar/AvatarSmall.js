import { Avatar, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '28px',
        height: '28px'
    },
}))

const AvatarSmall = ({ src, className: parrentClassName }) => {

    const classes = useStyles();

    return (
        <Avatar 
            className={clsx(classes.avatar, parrentClassName)} 
            src={src}
            variant="rounded"
        />
    )
}

export default AvatarSmall