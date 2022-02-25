import { Avatar, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '112px',
        height: '112px'
    },
}))

const AvatarLarge = ({ src }) => {

    const classes = useStyles();

    return (
        <Avatar 
            className={classes.avatar} 
            src={src}
            variant="rounded"
        />
    )
}

export default AvatarLarge
