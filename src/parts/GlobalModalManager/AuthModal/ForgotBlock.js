import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import StringInput from '../../../components/Form/Input/StringInput';

const useStyles = makeStyles((theme) => ({
    forgotBlockContainer: {
        textAlign: 'center'
    },

    forgotBlockButton: {
        marginTop: theme.spacing(2),
    },
    
}))

const ForgotBlock = () => {

    const classes = useStyles();

    return (
        <div className={classes.forgotBlockContainer}>
            <StringInput 
                className={classes.emailInput} 
                placeholder="Почта"

            />
            <ButtonPrimary className={classes.forgotBlockButton}>Восстановить пароль</ButtonPrimary>
        </div>
    )
}

export default ForgotBlock
