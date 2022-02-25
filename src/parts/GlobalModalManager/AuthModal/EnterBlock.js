import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import StringInput from '../../../components/Form/Input/StringInput';
import LinkRegular from '../../../components/Link/LinkRegular';

import GoogleIcon from '../../../assets/google_icon.svg';
import VkIcon from '../../../assets/vk_icon.svg';
import FcIcon from '../../../assets/fc_icon.svg';
import OkIcon from '../../../assets/ok_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostLogin, postLogin, selectLoginStatus } from '../../../store/slices/authenticationSlice';
import { launchAlert } from '../../../store/slices/globalAlertSlice';
import { forceReloadPage } from '../../../utils/functions/forceReloadPage';

const useStyles = makeStyles((theme) => ({
    enterBlockContainer: {
        textAlign: 'center'
    },

    enterBlockViaSM: {
        
    },

    or: {
        marginTop: theme.spacing(2),
    },

    enterBlockViaEmail: {
        // marginTop: theme.spacing(2)
    },

    SMButton: {
        marginRight: theme.spacing(1),
        height: '2.5rem',
        filter: 'grayscale(100%)',
        cursor: 'pointer',
        "&:hover": {
            filter: 'grayscale(0%)',
        }

    },
    
    enterBlockButton : {
        marginTop: theme.spacing(2),
    },

    enterBlockForgotText: {
        ...theme.typography.caption,
        marginTop: theme.spacing(1),
    }
}))

const EnterBlock = ({ handleModalWindow, handleModalClose}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        email: { label: 'Почта', value: '', error: ''},
        password: { label: 'Пароль', value: '', error: ''}
    })

    const handleFormValue = (fieldName, value) => {
        setFormValues(prevState => (
            { ...prevState, [fieldName]: {...prevState[fieldName], value: value, error: ''} }
        ))
    }

    const handleFormError = (fieldName, errorMessage) => {
        setFormValues(prevState => (
            { ...prevState, [fieldName]: {...prevState[fieldName], error: errorMessage } }
        ))
    }

    const handleLogin = () => {
        dispatch(postLogin({
            email: formValues.email.value,
            password: formValues.password.value
        })) 
    }

    const loginStatus = useSelector(selectLoginStatus)

    useEffect(()=>{

        if(loginStatus.status === 'failed'){
            loginStatus.remarks.forEach((item)=>{
                handleFormError(item.type, item.message)
            })  
        }

        if(loginStatus.status === 'succeeded'){
            handleModalClose()
            dispatch(launchAlert({body: 'Вход выполнен успешно', type: 'success'}))
        }

    }, [loginStatus])

    return (
        <div className={classes.enterBlockContainer}>

            {/* ДЛЯ MVP НЕ РЕАЛИЗОВАНО, РЕАЛИЗОВАТЬ ПРИ СЛЕДУЮЩЕЙ ИТЕРАЦИИ */}
            {/* <div className={classes.enterBlockViaSM}>
                <img className={classes.SMButton} src={GoogleIcon} onClick={()=>{console.log('google')}}/>
                <img className={classes.SMButton} src={VkIcon} onClick={()=>{console.log('google')}}/>
                <img className={classes.SMButton} src={FcIcon} onClick={()=>{console.log('google')}}/>
                <img className={classes.SMButton} src={OkIcon} onClick={()=>{console.log('google')}}/>
            </div>*/}
            {/* <Typography className={classes.or}>или</Typography>  */}

            <div className={classes.enterBlockViaEmail}>

                <Grid container spacing={1}>

                {Object.keys(formValues).map(item => (
                    <Grid xs={12} item key={[item]}>
                        <StringInput 
                            name={item}
                            placeholder={formValues[item].label}

                            value={formValues[item].value}
                            onChange={event => {handleFormValue(event.target.name, event.target.value)}}

                            type={item === 'password' || item === 'password2' ? 'password' : item}

                            error={formValues[item].error ? true : false}
                            helperText={formValues[item].error}
                        />
                    </Grid>
                ))}

                </Grid>

                <ButtonPrimary 
                    className={classes.enterBlockButton}
                    onClick={handleLogin}
                    loading={loginStatus.status === 'loading' ? true : false}
                >Войти</ButtonPrimary>
                
                <Typography className={classes.enterBlockForgotText}>
                    <LinkRegular onClick={() => handleModalWindow(3)}>Напомнить пароль</LinkRegular>
                </Typography>
            </div>
            
        </div>
    )
}

export default EnterBlock
