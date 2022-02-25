import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ButtonPrimary from '../../../components/Button/ButtonPrimary'
import StringInput from '../../../components/Form/Input/StringInput'

const useStyles = makeStyles((theme) => ({
    
    forgotBlockContainer: {
        textAlign: 'center'
    },

    forgotBlockButton : {
        marginTop: theme.spacing(2)
    }
}))

const ChangePasswordBlock = () => {
    
    const classes = useStyles();

    return (
        <div className={classes.forgotBlockContainer}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <StringInput placeholder="Новый пароль" type="password"/>
                </Grid>
                <Grid item xs={12}>
                    <StringInput placeholder="Подтвердите пароль" type="password"/>
                </Grid>
            </Grid>
                
            <ButtonPrimary className={classes.forgotBlockButton}>Сменить пароль</ButtonPrimary>
        </div>
    )
}

export default ChangePasswordBlock
