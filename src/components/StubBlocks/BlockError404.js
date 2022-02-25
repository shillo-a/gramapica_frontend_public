import React from 'react'
import { Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    blockError404Container: {
        background: theme.palette.background.paper,
        padding: theme.spacing(3)
    }
}))

const BlockError404 = () => {

    const classes = useStyles();

    return (
        <div className={classes.blockError404Container}>
            <Container maxWidth='md'>
                404: Миша, все х.., давай по новой!
            </Container> 
        </div>
    )
}

export default BlockError404
