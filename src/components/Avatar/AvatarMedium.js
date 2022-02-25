import { Avatar, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '48px',
        height: '48px'
    },
}))

const AvatarMedium = ({ className: parrentClassName, src }) => {

    const classes = useStyles();

    return (
        <Avatar 
            className={clsx(classes.avatar, parrentClassName)} 
            src={src}
            variant="rounded"
        />
    )
}

export default AvatarMedium
