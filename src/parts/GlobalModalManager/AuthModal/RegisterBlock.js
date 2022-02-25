import { makeStyles, Grid, InputAdornment, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import ButtonPrimary from '../../../components/Button/ButtonPrimary'
import StringInput from '../../../components/Form/Input/StringInput'

import { useDispatch, useSelector } from 'react-redux';
import { postSignup, selectSignupStatus } from '../../../store/slices/authenticationSlice';
import { launchAlert } from '../../../store/slices/globalAlertSlice';

const useStyles = makeStyles((theme) => ({

    registerBlockContainer: {
        textAlign: 'center'
    },

    registerBlockButton : {
        marginTop: theme.spacing(2)
    }

}))

const RegisterBlock = ({ handleModalClose }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        email: { label: 'Почта', value: '', error: ''},
        username: { label: 'Никнейм', value: '', error: ''},
        password: { label: 'Пароль', value: '', error: ''},
        password2: { label: 'Повторите парроль', value: '', error: ''},
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

    const handleRegistration = () => {
        dispatch(postSignup({
            email: formValues.email.value,
            username: formValues.username.value,
            password: formValues.password.value,
            password2: formValues.password2.value
        }))   
    }

    const signupStatus = useSelector(selectSignupStatus)
    
    useEffect(()=>{

        if(signupStatus.status === 'failed'){
            signupStatus.remarks.forEach((item)=>{
                handleFormError(item.type, item.message)
            })  
        }

        if(signupStatus.status === 'succeeded'){
            handleModalClose()
            dispatch(launchAlert({body: 'Регистрация прошла успешно', type: 'success'}))
        }

    }, [signupStatus])

    return (
        <div className={classes.registerBlockContainer}>

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
                className={classes.registerBlockButton}
                onClick={handleRegistration}
                loading={signupStatus.status === 'loading' ? true : false}
                
            >
                Зарегистрироваться
            </ButtonPrimary>

        </div>
    )
}

export default RegisterBlock

// signupStatus.status === 'loading' ?

// onFocus={event => {handleFormErrorDissable(event)}}
                            // onBlur={event => {handleFormError(event)}}

// const handleFormErrorDissable = (fieldName) => {
//     setFormValues(prevState => (
//         { ...prevState, [fieldName]: {...prevState[fieldName], error: '' } }
//     ))
// }
// InputProps={{
//     endAdornment: 
//     <InputAdornment position="end">
//         { formValues[item].isValid === true && <CheckCircleOutlineRoundedIcon className={classes.correctInputIcon}/> }
//         { formValues[item].isValid === false && <CancelOutlinedIcon className={classes.incorrectInputIcon}/> }
//     </InputAdornment>
// }}

// endAdornment={
//     <InputAdornment position="end">
//       <IconButton
//         aria-label="toggle password visibility"
//         onClick={handleClickShowPassword}
//         onMouseDown={handleMouseDownPassword}
//         edge="end"
//       >
//         {values.showPassword ? <VisibilityOff /> : <Visibility />}
//       </IconButton>
//     </InputAdornment>
//   }


    // const changeRegisterFormValues = (event) => {
    //     const value = event.target.value
    //     const name = event.target.name
    //     setRegisterFormValues(prevState => (
    //         {...prevState, [name]: {value: } }   
    //     ))
    // }

    // const validateValue = (email) => {

    // }

    // console.log(registerFormValues)

    // helperText="Пожалуйста, укажите почту" error