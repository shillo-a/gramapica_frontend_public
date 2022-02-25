import React from 'react'
import { Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    blockError404Container: {
        background: theme.palette.background.paper,
        padding: theme.spacing(3)
    }
}))

const BlockError403 = () => {

    const classes = useStyles();

    return (
        <div className={classes.blockError404Container}>
            <Container maxWidth='md'>
                403: Вы кто такие, я Вас не звал ...!
            </Container> 
        </div>
    )
}

export default BlockError403
